import HeaderWrapper from "@/components/HeaderWrapper";
import FeaturedServices from "@/sections/HomePage/FeaturedServices";
import WhatWeDo from "@/sections/HomePage/WhatWeDo";
import WhyChooseUs from "@/sections/HomePage/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeaderWrapper />
      <WhatWeDo />
      <WhyChooseUs />
      <FeaturedServices />
    </main>
  );
}
