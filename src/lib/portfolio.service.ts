import { unstable_cache } from "next/cache";
import { doc, getDoc } from "firebase/firestore";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/cacheTags";
import { db } from "@/lib/firebase";
import { portfolioPageFallback } from "@/data/portfolio-page.data";
import type { PortfolioPageContent } from "@/types/portfolio";

const PAGE_CONTENT_COLLECTION = "pageContent";
const PORTFOLIO_DOC_ID = "portfolio";

async function fetchPortfolioPageContent(): Promise<PortfolioPageContent> {
  const snapshot = await getDoc(doc(db, PAGE_CONTENT_COLLECTION, PORTFOLIO_DOC_ID));

  if (!snapshot.exists()) {
    return portfolioPageFallback;
  }

  return {
    ...portfolioPageFallback,
    ...(snapshot.data() as Partial<PortfolioPageContent>),
  };
}

export async function getPortfolioPageContent() {
  return unstable_cache(fetchPortfolioPageContent, ["pageContent:portfolio"], {
    revalidate: CACHE_TTL.pageContent,
    tags: [CACHE_TAGS.portfolioPage],
  })();
}
