"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";

// Image Imports
import growArrow from "@/assets/theme-images/grow-arrow-theme.png";
import growArrowSmall from "@/assets/theme-images/grow-arrow2.png";
import heroBg from "@/assets/theme-images/bg-seo-fast1.png";
import womanImg from "@/assets/theme-images/women-slider-img-web.webp";

type Star = {
  left: string;
  top: string;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  scale: number;
};

const Hero = () => {
  const [stars, setStars] = useState<Star[]>([]);

  // Generate star positions on the client only to avoid SSR hydration drift
  useEffect(() => {
    const generatedStars = [...Array(36)].map(
      () =>
        ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.18 + Math.random() * 0.35,
          duration: 16 + Math.random() * 14, // slower, subtle drift
          delay: Math.random() * 12, // start at different times
          drift: (Math.random() - 0.5) * 18, // gentle side-to-side sway
          scale: 0.8 + Math.random() * 0.4, // subtle size variance
        } satisfies Star)
    );
    setStars(generatedStars);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0d0806] via-[#120b08] to-[#1c120b] text-foreground">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-12"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
        }}
      />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
        style={{
          backgroundImage: `url(${heroBg.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((star, i) => (
          <span
            key={i}
            className="star-floating absolute h-1 w-1 rounded-full bg-white/80"
            style={
              {
                left: star.left,
                top: star.top,
                opacity: star.opacity,
                animationDuration: `${star.duration}s`,
                animationDelay: `-${star.delay}s`,
                "--drift": `${star.drift}px`,
                "--scale": star.scale,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* =====================================================
          LARGE SCREEN — ARROWS NEAR WOMAN
      ===================================================== */}
      {/* Big arrow behind woman, between the two small arrows */}
      <Image
        src={growArrow}
        alt=""
        className="hidden lg:block pointer-events-none absolute left-[84%] top-[26%] w-[220px] xl:w-[280px] rotate-[-10deg] opacity-90 z-[8]"
      />

      {/* Left-side small arrow */}
      <Image
        src={growArrowSmall}
        alt=""
        className="hidden lg:block pointer-events-none absolute left-[96%] top-[20%] w-[20px] xl:w-[20px] rotate-[-10deg] opacity-90 z-[1]"
      />

      {/* Right-side small arrow */}
      <Image
        src={growArrowSmall}
        alt=""
        className="hidden lg:block pointer-events-none absolute left-[96%] top-[43%] w-[20px] xl:w-[20px] rotate-[8deg] opacity-90 z-[1]"
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="container relative z-10 flex min-h-screen items-center">

        <div className="grid h-full w-full flex-1 gap-8 sm:gap-10 lg:gap-16 grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start">

          {/* LEFT COLUMN */}
          <div className="relative space-y-6 text-left lg:space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Sparkles className="h-4 w-4" />
              </span>
              Take your business
            </div>

            {/* Heading */}
            <h1 className="relative isolate z-0 text-[1.95rem] font-bold leading-[1.14] tracking-[0.5px] sm:text-[2.2rem] md:text-[2.45rem] lg:text-[3rem] xl:text-[3.25rem]">
              <span className="relative z-[20] inline-block">
                Web Development, SEO & IT Solutions
                <span className="block">That Help You Grow!</span>
              </span>

              {/* =====================================================
                  SMALL SCREEN — BIG ARROW BEHIND HEADING
              ===================================================== */}
              <Image
                src={growArrow}
                alt=""
                className="lg:hidden absolute right-[6px] top-[-70px] w-[240px] sm:w-[300px] md:w-[340px] rotate-[-12deg] opacity-80 pointer-events-none z-[10]"
              />

              {/* SMALL SCREEN — TWO MINI ARROWS */}
              <Image
                src={growArrowSmall}
                alt=""
                className="lg:hidden absolute right-[200px] top-[-50px] w-[22px] rotate-[-10deg] opacity-70 z-[1]"
              />

              <Image
                src={growArrowSmall}
                alt=""
                className="lg:hidden absolute right-[24px] top-[90px] w-[22px] rotate-[6deg] opacity-70 z-[1]"
              />
            </h1>

            {/* Description */}
            <p className="text-[15px] text-muted-foreground sm:text-base sm:max-w-xl md:max-w-2xl">
              Yue Infotech builds fast, modern websites, AI-optimized SEO strategies, performance ads, powerful content,
              and secure IT solutions — everything your business needs to scale.
            </p>

            {/* CTA */}
            <button className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-orange-400 px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:shadow-primary/40 sm:w-auto sm:text-sm">
              Get a Custom Quote
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          WOMAN IMAGE (large screens)
      ===================================================== */}
      <div className="pointer-events-none absolute bottom-0 right-0 hidden lg:flex items-end justify-end w-[45%] xl:w-[42%]">
        {/* Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border border-orange-400/20"
              style={{
                width: "90%",
                height: "90%",
                transform: `scale(${1 - i * 0.1})`,
              }}
            />
          ))}
        </div>

        <Image
          src={womanImg}
          alt="Customer holding laptop"
          className="relative z-10 w-[340px] sm:w-[400px] lg:w-[460px] xl:w-[520px] object-contain"
          priority
        />
      </div>

      <style jsx global>{`
        @keyframes starFloat {
          0% {
            transform: translate3d(0, 0, 0) scale(var(--scale, 1));
            opacity: 0.3;
          }
          35% {
            transform: translate3d(calc(var(--drift, 8px) * 0.6), 10px, 0) scale(var(--scale, 1));
            opacity: 0.55;
          }
          65% {
            transform: translate3d(calc(var(--drift, 8px) * 1), 18px, 0) scale(calc(var(--scale, 1) * 1.05));
            opacity: 0.7;
          }
          100% {
            transform: translate3d(calc(var(--drift, 8px) * 0.2), 26px, 0) scale(var(--scale, 1));
            opacity: 0.35;
          }
        }

        .star-floating {
          animation-name: starFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
};

export default Hero;