import { CACHE_TAGS, CACHE_TTL, getBlogDetailTag, getFaqTag } from "@/lib/cacheTags";

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

export async function fetchFaqsForPage(
  pageId: string,
  { publishedOnly = true, revalidate = CACHE_TTL.faqs } = {}
): Promise<PublicFaq[]> {
  if (!projectId || !pageId) return [];

  const orderedBody = {
    parent: `projects/${projectId}/databases/(default)/documents`,
    structuredQuery: {
      from: [{ collectionId: "faqs" }],
      where: publishedOnly
        ? {
            compositeFilter: {
              op: "AND",
              filters: [
                {
                  fieldFilter: {
                    field: { fieldPath: "pageId" },
                    op: "EQUAL",
                    value: { stringValue: pageId },
                  },
                },
                {
                  fieldFilter: {
                    field: { fieldPath: "published" },
                    op: "EQUAL",
                    value: { booleanValue: true },
                  },
                },
              ],
            },
          }
        : {
            fieldFilter: {
              field: { fieldPath: "pageId" },
              op: "EQUAL",
              value: { stringValue: pageId },
            },
        },
      orderBy: [{ field: { fieldPath: "order" }, direction: "ASCENDING" }],
    },
  };

  const fallbackBody = {
    parent: `projects/${projectId}/databases/(default)/documents`,
    structuredQuery: {
      from: [{ collectionId: "faqs" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "pageId" },
          op: "EQUAL",
          value: { stringValue: pageId },
        },
      },
    },
  };

  const runQuery = async (body: object) =>
    fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        next: { revalidate, tags: [getFaqTag(pageId)] },
      }
    );

  const parseRows = (rows: any[]) =>
    rows
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
      .filter((faq: (PublicFaq & { published: boolean }) | null): faq is PublicFaq & { published: boolean } => Boolean(faq));

  let response = await runQuery(orderedBody);
  if (response.ok) {
    const rows = await response.json();
    return rows
      .map((row: any) => {
        if (!row?.document) return null;
        const data = decodeDocument(row);
        if (!data) return null;
        return {
          id: row.document.name?.split("/").pop() ?? "",
          question: String(data.question ?? ""),
          answer: String(data.answer ?? ""),
          order: Number(data.order ?? 0),
        } as PublicFaq;
      })
      .filter((faq: PublicFaq | null): faq is PublicFaq => Boolean(faq));
  }

  const errorText = await response.text();
  if (errorText.includes("create_composite") || errorText.includes("index")) {
    console.warn(`Missing FAQ index for page "${pageId}", retrying with page-only query.`, errorText);

    response = await runQuery(fallbackBody);
    if (response.ok) {
      const rows = await response.json();
      return parseRows(rows)
        .filter((faq) => (publishedOnly ? faq.published : true))
        .sort((a, b) => a.order - b.order)
        .map(({ published: _published, ...faq }) => faq);
    }
  }

  console.error("Failed to fetch FAQs for page", pageId, errorText);
  return [];
}

// Blogs collection (published only, ordered by createdAt desc when possible)
export async function fetchBlogs({ limit = 4, revalidate = CACHE_TTL.blogs } = {}): Promise<PublicBlog[]> {
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
        next: { revalidate, tags: [CACHE_TAGS.blogsList] },
      }
    );

  let res = await run(true);
  if (!res.ok) {
    const text = await res.text();
    if (text.includes("create_composite") || text.includes("index")) {
      console.warn("Missing index for blogs createdAt ordering, retrying without order. Details:", text);
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
        excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
        content: typeof data.content === "string" ? data.content : "",
        thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : "",
        author: typeof data.author === "string" ? data.author : "Admin",
        date: data.createdAt ?? data.updatedAt ?? "",
      } as PublicBlog;
    })
    .filter((b: PublicBlog | null): b is PublicBlog => Boolean(b && b.title));
}

export async function fetchBlogBySlug(
  slug: string,
  { revalidate = CACHE_TTL.blogs } = {}
): Promise<PublicBlog | null> {
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
      next: { revalidate, tags: [getBlogDetailTag(slug)] },
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

  const date =
    typeof data.createdAt === "string"
      ? data.createdAt
      : typeof data.updatedAt === "string"
        ? data.updatedAt
        : "";
  return {
    id: entry.document.name?.split("/").pop() ?? "",
    title: String(data.title ?? ""),
    slug: `/blog/${slug}`,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    content: typeof data.content === "string" ? data.content : "",
    thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : "",
    author: typeof data.author === "string" ? data.author : "Admin",
    date,
  };
}
