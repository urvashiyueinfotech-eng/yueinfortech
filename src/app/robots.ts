import type { MetadataRoute } from "next";

const DISABLE_INDEXING = process.env.DISABLE_INDEXING === "true";

export default function robots(): MetadataRoute.Robots {
  if (DISABLE_INDEXING) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
