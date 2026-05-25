import type { Metadata } from "next";
import { Suspense } from "react";
import HeaderWrapper from "@/components/HeaderWrapper";
import WhatWeDo from "@/sections/HomePage/WhatWeDo";
import WhyChooseUs from "@/sections/HomePage/WhyChooseUs";
import Approach from "@/sections/HomePage/Approach";
import PortfolioHighlights from "@/sections/HomePage/PortfolioHighlights";
import Industries from "@/sections/HomePage/Industries";
import BlogHighlights from "@/sections/HomePage/BlogHighlights";
import PageFaqSection from "@/sections/HomePage/PageFaqSection";
import HomePageCTA from "@/sections/HomePage/HomePageCTA";
import { getHomePageData } from "@/lib/homePage";
import { getPageMetadata } from "@/lib/pageSeo.service";

export const revalidate = 2592000;
const HOME_FAQ_REVALIDATE = 2592000;
const HOME_SEO_REVALIDATE = 2592000;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home", undefined, {
    revalidate: HOME_SEO_REVALIDATE,
  });
}

export default async function Home() {
  const { posts } = await getHomePageData();

  return (
    <main className="bg-[#06080F] text-[#F1F5FF] overflow-x-hidden">
      <HeaderWrapper />
      <WhatWeDo />
      <WhyChooseUs />
      <Approach />
      <PortfolioHighlights />
      <Industries />
      <BlogHighlights posts={posts} />
      <Suspense fallback={null}>
        <PageFaqSection pageId="home" revalidate={HOME_FAQ_REVALIDATE} />
      </Suspense>
      <HomePageCTA />
    </main>
  );
}
