const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { timestampValue: string }
  | { nullValue: null }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

const decodeValue = (val: FirestoreValue): any => {
  if ("stringValue" in val) return val.stringValue;
  if ("integerValue" in val) return parseInt(val.integerValue, 10);
  if ("doubleValue" in val) return val.doubleValue;
  if ("booleanValue" in val) return val.booleanValue;
  if ("timestampValue" in val) return val.timestampValue;
  if ("nullValue" in val) return null;
  if ("arrayValue" in val) return (val.arrayValue.values ?? []).map(decodeValue);
  if ("mapValue" in val) {
    const out: Record<string, unknown> = {};
    Object.entries(val.mapValue.fields ?? {}).forEach(([k, v]) => {
      out[k] = decodeValue(v as FirestoreValue);
    });
    return out;
  }
  return null;
};

const decodeDocument = (entry: any) => {
  const doc = entry?.document ?? entry;
  const fields = doc?.fields;
  if (!fields) return null;
  const out: Record<string, unknown> = {};
  Object.entries(fields).forEach(([k, v]) => {
    out[k] = decodeValue(v as FirestoreValue);
  });
  return out;
};

export type PublicFaq = {
  id: string;
  question: string;
  answer: string;
  order: number;
};

export type PublicBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  thumbnail?: string;
  author?: string;
  date?: string;
};

export async function fetchCategoryIdByName(name: string, { revalidate = 60 } = {}) {
  if (!projectId) return null;

  const baseBody = (withFilter: boolean) => ({
    parent: `projects/${projectId}/databases/(default)/documents`,
    structuredQuery: {
      from: [{ collectionId: "categories" }],
      where: withFilter
        ? {
            compositeFilter: {
              op: "AND",
              filters: [
                {
                  fieldFilter: {
                    field: { fieldPath: "name" },
                    op: "EQUAL",
                    value: { stringValue: name },
                  },
                },
                {
                  fieldFilter: {
                    field: { fieldPath: "visible" },
                    op: "EQUAL",
                    value: { booleanValue: true },
                  },
                },
              ],
            },
          }
        : undefined,
      limit: 50,
    },
  });

  const queryOnce = async (withFilter: boolean) => {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(baseBody(withFilter)),
        next: { revalidate },
      }
    );
    return res;
  };

  // Try filtered query first for efficiency.
  let res = await queryOnce(true);
  if (!res.ok) {
    console.error("Failed to fetch category id (filtered)", await res.text());
    return null;
  }

  let rows = await res.json();
  let match = rows
    .map((row: any) => {
      if (!row?.document) return null;
      const data = decodeDocument(row);
      if (!data) return null;
      return {
        id: row.document.name?.split("/").pop() ?? "",
        name: String(data.name ?? ""),
        visible: data.visible !== false,
      };
    })
    .filter(Boolean)
    .find(
      (c: any) =>
        c.name.toLowerCase().trim() === name.toLowerCase().trim() &&
        c.visible === true
    );

  // Fallback: fetch all and filter client-side.
  if (!match) {
    res = await queryOnce(false);
    if (!res.ok) {
      console.error("Failed to fetch category id (unfiltered)", await res.text());
      return null;
    }
    rows = await res.json();
    match = rows
      .map((row: any) => {
        if (!row?.document) return null;
        const data = decodeDocument(row);
        if (!data) return null;
        return {
          id: row.document.name?.split("/").pop() ?? "",
          name: String(data.name ?? ""),
          visible: data.visible !== false,
        };
      })
      .filter(Boolean)
      .find(
        (c: any) =>
          c.name.toLowerCase().trim() === name.toLowerCase().trim() &&
          c.visible === true
      );
  }

  // Final fallback: list documents and scan (helps if queries are blocked by indexes)
  if (!match) {
    const listRes = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/categories?pageSize=100`,
      {
        headers: { "Content-Type": "application/json" },
        next: { revalidate },
      }
    );
    if (listRes.ok) {
      const listData = await listRes.json();
      const docs = listData?.documents ?? [];
      match = docs
        .map((doc: any) => {
          const data = decodeDocument(doc);
          if (!data) return null;
          return {
            id: doc.name?.split("/").pop() ?? "",
            name: String(data.name ?? ""),
            visible: data.visible !== false,
          };
        })
        .filter(Boolean)
        .find(
          (c: any) =>
            c.name.toLowerCase().trim() === name.toLowerCase().trim() &&
            c.visible === true
        );
    }
  }

  return match?.id ?? null;
}

export async function fetchFaqsByCategory(categoryId: string, { publishedOnly = true, revalidate = 60 } = {}) {
  if (!projectId) return [];

  const runQuery = async (withOrder: boolean) => {
    const body = {
      parent: `projects/${projectId}/databases/(default)/documents/categories/${categoryId}`,
      structuredQuery: {
        from: [{ collectionId: "faqs" }],
        where: publishedOnly
          ? {
              fieldFilter: {
                field: { fieldPath: "published" },
                op: "EQUAL",
                value: { booleanValue: true },
              },
          }
          : undefined,
        orderBy: withOrder
          ? [{ field: { fieldPath: "order" }, direction: "ASCENDING" }]
          : undefined,
      },
    };

    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        next: { revalidate },
      }
    );

    return res;
  };

  // First try with order (requires composite index). If Firestore asks for an index, fall back to a no-order query and sort client-side.
  let res = await runQuery(true);
  if (!res.ok) {
    const text = await res.text();
    if (text.includes("create_composite") || text.includes("index")) {
      console.warn("Missing index for ordered FAQ query, retrying without order. Create composite index: collection group 'faqs', fields 'published' asc, 'order' asc.");
      res = await runQuery(false);
    } else {
      console.error("Failed to fetch FAQs", text);
      return [];
    }
  }

  const rows = await res.json();
  let faqs = rows
    .map((row: any) => {
      if (!row?.document) return null;
      const data = decodeDocument(row);
      if (!data) return null;
      return {
        id: row.document.name?.split("/").pop() ?? "",
        question: String(data.question ?? ""),
        answer: String(data.answer ?? ""),
        order: Number(data.order ?? 0),
        published: data.published !== false,
      } as PublicFaq & { published: boolean };
    })
    .filter((f): f is PublicFaq & { published: boolean } => Boolean(f));

  // If the query returned nothing, list documents directly and filter client-side.
  if (faqs.length === 0) {
    const listRes = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/categories/${categoryId}/faqs?pageSize=200`,
      {
        headers: { "Content-Type": "application/json" },
        next: { revalidate },
      }
    );
    if (listRes.ok) {
      const listData = await listRes.json();
      const docs = listData?.documents ?? [];
      faqs = docs
        .map((doc: any) => {
          const data = decodeDocument(doc);
          if (!data) return null;
          return {
            id: doc.name?.split("/").pop() ?? "",
            question: String(data.question ?? ""),
            answer: String(data.answer ?? ""),
            order: Number(data.order ?? 0),
            published: data.published !== false,
          } as PublicFaq & { published: boolean };
        })
        .filter((f): f is PublicFaq & { published: boolean } => Boolean(f));
    }
  }

  const filtered = publishedOnly ? faqs.filter((f) => f.published) : faqs;
  return filtered.sort((a, b) => a.order - b.order);
}

export async function fetchFaqsForCategoryName(categoryName: string, opts?: { publishedOnly?: boolean; revalidate?: number }) {
  const categoryId = await fetchCategoryIdByName(categoryName, { revalidate: opts?.revalidate ?? 60 });
  if (!categoryId) return [];
  return fetchFaqsByCategory(categoryId, opts);
}

// Blogs collection (published only, ordered by createdAt desc when possible)
export async function fetchBlogs({ limit = 4, revalidate = 300 } = {}): Promise<PublicBlog[]> {
  if (!projectId) return [];

  const baseQuery = (withOrder: boolean) => ({
    parent: `projects/${projectId}/databases/(default)/documents`,
    structuredQuery: {
      from: [{ collectionId: "blogs" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "status" },
          op: "EQUAL",
          value: { stringValue: "Published" },
        },
      },
      orderBy: withOrder
        ? [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }]
        : undefined,
      limit,
    },
  });

  const run = async (withOrder: boolean) =>
    fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(baseQuery(withOrder)),
        next: { revalidate },
      }
    );

  let res = await run(true);
  if (!res.ok) {
    const text = await res.text();
    if (text.includes("create_composite") || text.includes("index")) {
      console.warn("Missing index for blogs createdAt ordering, retrying without order.");
      res = await run(false);
    } else {
      console.error("Failed to fetch blogs", text);
      return [];
    }
  }

  const rows = await res.json();
  return rows
    .map((row: any) => {
      if (!row?.document) return null;
      const data = decodeDocument(row);
      if (!data) return null;
      return {
        id: row.document.name?.split("/").pop() ?? "",
        title: String(data.title ?? ""),
        slug: data.slug ? `/blog/${data.slug}` : `/blog/${row.document.name?.split("/").pop() ?? ""}`,
        excerpt: data.excerpt ?? "",
        content: data.content ?? "",
        thumbnail: data.thumbnail ?? "",
        author: data.author ?? "Admin",
        date: data.createdAt ?? data.updatedAt ?? "",
      } as PublicBlog;
    })
    .filter((b): b is PublicBlog => Boolean(b && b.title));
}

export async function fetchBlogBySlug(slug: string, { revalidate = 300 } = {}): Promise<PublicBlog | null> {
  if (!projectId || !slug) return null;

  const body = {
    parent: `projects/${projectId}/databases/(default)/documents`,
    structuredQuery: {
      from: [{ collectionId: "blogs" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "slug" },
          op: "EQUAL",
          value: { stringValue: slug },
        },
      },
      limit: 1,
    },
  };

  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      next: { revalidate },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch blog by slug", await res.text());
    return null;
  }

  const rows = await res.json();
  const entry = rows.find((row: any) => row?.document);
  if (!entry?.document) return null;
  const data = decodeDocument(entry);
  if (!data) return null;

  const date = data.createdAt ?? data.updatedAt ?? "";
  return {
    id: entry.document.name?.split("/").pop() ?? "",
    title: String(data.title ?? ""),
    slug: `/blog/${slug}`,
    excerpt: data.excerpt ?? "",
    content: data.content ?? "",
    thumbnail: data.thumbnail ?? "",
    author: data.author ?? "Admin",
    date,
  };
}
