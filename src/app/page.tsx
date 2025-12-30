import HeaderWrapper from "@/components/HeaderWrapper";
import { type CardProps } from "@/components/ui/Card";
import BlogHighlights from "@/sections/HomePage/BlogHighlights";
import FaqSection from "@/sections/HomePage/FAQHighlights";
import FeaturedServices from "@/sections/HomePage/FeaturedServices";
import PortfolioHighlights from "@/sections/HomePage/PortfolioHighlights";
import ProjectTypes from "@/sections/HomePage/ProjectTypes";
import WhatWeDo from "@/sections/HomePage/WhatWeDo";
import WhyChooseUs from "@/sections/HomePage/WhyChooseUs";
import { fetchFaqsForCategoryName, fetchBlogs } from "@/lib/firestoreServer";

export const revalidate = 60;

async function getHomePageData() {
  try {
    const res = await fetch("http://yueinfortech.local/wp-json/wp/v2/pages?slug=home", {
      next: { revalidate },
    });
    if (!res.ok) {
      throw new Error(`WP API responded with ${res.status}`);
    }
    return res.json();
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export default async function Home() {
  const wpHomeData = await getHomePageData();
  const blogData = await fetchBlogs({ limit: 4, revalidate: 300 });
  const normalizedPosts: CardProps[] | undefined =
    Array.isArray(blogData) && blogData.length
      ? blogData
          .map((post) => {
            const date = post.date
              ? new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "";
            return {
              title: post.title,
              image: post.thumbnail ?? "",
              slug: post.slug,
              author: post.author ?? "Admin",
              date,
              description: post.excerpt ?? "",
            } satisfies CardProps;
          })
          .filter((p) => p.title && p.image)
      : undefined;
  const heroEyebrow =
    Array.isArray(wpHomeData) && wpHomeData[0]?.acf?.hero_eyeborw_content
      ? String(wpHomeData[0]?.acf?.hero_eyeborw_content)
      : undefined;
  const heroHeading =
    Array.isArray(wpHomeData) && wpHomeData[0]?.acf?.hero_heading_content
      ? String(wpHomeData[0]?.acf?.hero_heading_content)
      : undefined;

  return (
    <main>
      <HeaderWrapper heroEyebrow={heroEyebrow} heroHeading={heroHeading} />
      <WhatWeDo />
      <WhyChooseUs />
      <section className="bg-white">
        <FeaturedServices />
        <ProjectTypes />
      </section>
      <PortfolioHighlights />
      <BlogHighlights posts={normalizedPosts} />
      <FaqSection faqs={await fetchFaqsForCategoryName("Home", { publishedOnly: true, revalidate })} />
    </main>
  );
}
