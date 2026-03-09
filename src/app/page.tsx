import HeaderWrapper from "@/components/HeaderWrapper";
import BlogHighlights from "@/sections/HomePage/BlogHighlights";
import FaqSection from "@/sections/HomePage/FAQHighlights";
import FeaturedServices from "@/sections/HomePage/FeaturedServices";
import PortfolioHighlights from "@/sections/HomePage/PortfolioHighlights";
import ProjectTypes from "@/sections/HomePage/ProjectTypes";
import WhatWeDo from "@/sections/HomePage/WhatWeDo";
import WhyChooseUs from "@/sections/HomePage/WhyChooseUs";
import { getHomePageData } from "@/lib/homePage";

export const revalidate = 60;

export default async function Home() {
  const { posts, faqs } = await getHomePageData();

  return (
    <main>
      <HeaderWrapper />
      <WhatWeDo />
      <WhyChooseUs />
      <section className="bg-white">
        <FeaturedServices />
        <ProjectTypes />
      </section>
      <PortfolioHighlights />
      <BlogHighlights posts={posts} />
      <FaqSection faqs={faqs} />
    </main>
  );
}
