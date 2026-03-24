export const CACHE_TTL = {
  seo: 60 * 60 * 6,
  faqs: 60 * 60 * 6,
  servicesList: 60 * 60 * 6,
  serviceDetail: 60 * 60 * 24,
  blogs: 60 * 60,
} as const;

export const CACHE_TAGS = {
  servicesList: "services:list",
  blogsList: "blogs:list",
} as const;

export const getSeoTag = (pageId: string) => `seo:${pageId}`;
export const getFaqTag = (pageId: string) => `faqs:${pageId}`;
export const getServiceDetailTag = (slug: string) => `services:detail:${slug}`;
export const getBlogDetailTag = (slug: string) => `blogs:detail:${slug}`;
