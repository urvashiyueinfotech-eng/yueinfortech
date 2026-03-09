"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import CtaButton from "@/components/CtaButton";

type HeroProps = {
  heroEyebrow?: string;
  heroHeading?: string;
};

const Hero = ({
  heroEyebrow = "Take your business",
  heroHeading = "Web Development, Enterprise SEO & Digital Growth Systems for Global Brands",
}: HeroProps) => {
  return (
    <section className="relative min-h-[95vh] lg:min-h-screen overflow-hidden flex items-center pt-20 lg:pt-0">
      
      {/* FULL BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Gemini_Generated_Image_z6rtt9z6rtt9z6rt.png"
          alt="Yue Infotech Digital Solutions"
          fill
          priority
          className="object-cover object-center lg:object-[center_right] scale-105 animate-slow-zoom"
          quality={100}
        />
        {/* READABILITY OVERLAY: Subtle dark gradient from left to right */}
        <div className="absolute inset-0 bg-slate-950/40 lg:bg-gradient-to-r lg:from-slate-950/70 lg:via-slate-950/20 lg:to-transparent" />
      </div>

      <div className="container relative z-10">
        {/* Left-aligned content for better readability against the background */}
        <div className="max-w-4xl space-y-8 text-left">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-900/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(168,85,247,0.4)]">
              <Sparkles className="h-4 w-4 text-purple-300 animate-pulse" />
              <span className="text-sm font-semibold tracking-wide text-purple-100 uppercase">{heroEyebrow}</span>
          </div>
          
          {/* Main Heading & Subtitle */}
          <SectionHeader
            as="h1"
            title={heroHeading}
            titleClassName="text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem] leading-[1.1] font-extrabold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            subtitle="Yue Infotech builds high-performance websites, advanced search visibility strategies, AI-optimized content systems, performance marketing campaigns, and secure IT infrastructure — designed to increase visibility, strengthen authority, and generate measurable revenue."
            subtitleClassName="text-lg sm:text-xl text-slate-100/95 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            align="left"
            className="relative isolate"
          />

          {/* CTA Section */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
              <CtaButton
              href="/contact-us"
              bgClassName="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] border border-white/10"
              textClassName="text-white font-bold tracking-wide"
              className="w-full sm:w-auto gap-3 py-5 px-10 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <span>Book Free Consultation</span>
                <ArrowUpRight className="h-5 w-5" />
              </CtaButton>

              <CtaButton
              href="/contact-us"
              bgClassName="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20"
              textClassName="text-white font-bold tracking-wide"
              className="w-full sm:w-auto gap-3 py-5 px-10 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <span>Get a Custom Quote</span>
                  <svg className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </CtaButton>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default Hero;
