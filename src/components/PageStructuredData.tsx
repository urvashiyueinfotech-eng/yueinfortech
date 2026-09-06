import { getPageJsonLd, type JsonLdItem } from "@/lib/pageSeo.service";

export function StructuredDataScripts({ items }: { items: JsonLdItem[] }) {
  if (!items.length) return null;

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export default async function PageStructuredData({
  pageId,
  fallbackPageIds,
}: {
  pageId: string;
  fallbackPageIds?: string[];
}) {
  const items = await getPageJsonLd(pageId, { fallbackPageIds });
  return <StructuredDataScripts items={items} />;
}
