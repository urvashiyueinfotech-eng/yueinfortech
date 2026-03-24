import type { Metadata } from "next";
import { Suspense } from "react";
import HeaderWrapper from "@/components/HeaderWrapper";
import BlogHighlights from "@/sections/HomePage/BlogHighlights";
import PageFaqSection from "@/sections/HomePage/PageFaqSection";
import FeaturedServices from "@/sections/HomePage/FeaturedServices";
import PortfolioHighlights from "@/sections/HomePage/PortfolioHighlights";
import ProjectTypes from "@/sections/HomePage/ProjectTypes";
import WhatWeDo from "@/sections/HomePage/WhatWeDo";
import WhyChooseUs from "@/sections/HomePage/WhyChooseUs";
import { getHomePageData } from "@/lib/homePage";
import { getPageMetadata } from "@/lib/pageSeo.service";

export const revalidate = 3600;
const HOME_FAQ_REVALIDATE = 21600;
const HOME_SEO_REVALIDATE = 21600;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home", undefined, {
    revalidate: HOME_SEO_REVALIDATE,
  });
}

export default async function Home() {
  const { posts } = await getHomePageData();

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
      <Suspense fallback={null}>
        <PageFaqSection pageId="home" revalidate={HOME_FAQ_REVALIDATE} />
      </Suspense>
    </main>
  );
}
