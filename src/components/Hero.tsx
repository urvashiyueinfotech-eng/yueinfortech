// "use client";

// import { useState } from "react";
// import { ArrowUpRight, Sparkles } from "lucide-react";
// import Image from "next/image";

// // Image Imports
// import gearIcon from "@/assets/theme-images/seo-setting.png";
// import growArrow from "@/assets/theme-images/grow-arrow-theme.png";
// import heroBg from "@/assets/theme-images/bg-seo-fast1.png";
// import womanImg from "@/assets/theme-images/women-slider-img-web.webp";

// const Hero = () => {
//   const [stars] = useState(() =>
//     [...Array(36)].map(() => ({
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       opacity: 0.25 + Math.random() * 0.45,
//     }))
//   );

//   return (
//     <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0d0806] via-[#120b08] to-[#1c120b] text-foreground">

//       {/* Background grid */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-12"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
//           backgroundSize: "140px 140px",
//         }}
//       />

//       {/* Background glow */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
//         style={{
//           backgroundImage: `url(${heroBg.src})`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//         }}
//       />

//       {/* Accent glows */}
//       <div className="pointer-events-none absolute left-[-8%] top-[12%] h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
//       <div className="pointer-events-none absolute right-[-16%] bottom-[-12%] h-[520px] w-[520px] rounded-full bg-orange-500/18 blur-[120px]" />

//       {/* Stars */}
//       <div className="pointer-events-none absolute inset-0">
//         {stars.map((star, i) => (
//           <span
//             key={i}
//             className="absolute h-1 w-1 rounded-full bg-white/80"
//             style={{
//               left: star.left,
//               top: star.top,
//               opacity: star.opacity,
//             }}
//           />
//         ))}
//       </div>

//       {/* =====================================================
//           ARROW BEHIND WOMAN (large screens only)
//       ===================================================== */}
//       <Image
//         src={growArrow}
//         alt=""
//         className="
//           hidden lg:block
//           pointer-events-none absolute
//           right-[0] top-[30%]
//           w-[180px] xl:w-[240px]
//           rotate-[-8deg] opacity-90
//           z-[2]
//         "
//       />

//       {/* =====================================================
//           MAIN CONTENT
//       ===================================================== */}
//       <div className="container relative z-10 flex min-h-screen items-center">

//         <div
//           className="grid h-full w-full flex-1 gap-8 sm:gap-10 lg:gap-16 
//           grid-cols-1 
//           lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]
//           items-start"
//         >

//           {/* =====================================================
//               LEFT COLUMN — made relative for small-screen arrow
//           ===================================================== */}
//           <div className="relative space-y-6 text-left lg:space-y-8">

//             {/* Badge */}
//             <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
//               <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
//                 <Sparkles className="h-4 w-4" />
//               </span>
//               Take your business
//             </div>

//             {/* Heading */}
//             <h1
//               className="
//               text-[1.95rem] font-bold leading-[1.14] tracking-[0.5px]
//               sm:text-[2.2rem] md:text-[2.45rem] lg:text-[3rem] xl:text-[3.25rem]"
//             >
//               Web Development, SEO & IT Solutions
//               <span className="block">That Help You Grow!</span>
//             </h1>

//             {/* ⭐ SMALL SCREEN ARROW (shown ONLY below lg) */}
//             {/* ⭐ SMALL SCREEN ARROW — behind text, larger, aligned to heading end */}
//               <Image
//                 src={growArrow}
//                 alt="Arrow"
//                 className="
//                   lg:hidden
//                   absolute
//                   right-[-25px]      /* moved slightly outward */
//                   top-[0px]         /* aligned with heading bottom */
//                   w-[185px]          /* bigger on small screens */
//                   sm:w-[205px]
//                   rotate-[-12deg]
//                   opacity-85
//                   pointer-events-none
//                   z-[1]              /* IMPORTANT → behind heading text */
//                 "
//               />

//             {/* Description */}
//             <p className="text-[15px] text-muted-foreground sm:text-base sm:max-w-xl md:max-w-2xl">
//               Yue Infotech builds fast, modern websites, AI-optimized SEO strategies, performance ads, powerful content,
//               and secure IT solutions — everything your business needs to scale.
//             </p>

//             {/* CTA Button */}
//             <button className="group inline-flex w-full items-center justify-center gap-2 rounded-full 
//               bg-gradient-to-r from-primary to-orange-400 px-8 py-3 text-base font-semibold text-primary-foreground 
//               shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:shadow-primary/40 
//               sm:w-auto sm:text-sm">
//               Get a Custom Quote
//               <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* =====================================================
//           WOMAN IMAGE — visible only on lg+
//       ===================================================== */}
//       <div
//         className="
//           pointer-events-none absolute bottom-0 right-0
//           hidden lg:flex items-end justify-end
//           w-[45%] xl:w-[42%]
//         "
//       >
//         {/* Rings */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="absolute rounded-full border border-orange-400/20"
//               style={{
//                 width: "90%",
//                 height: "90%",
//                 transform: `scale(${1 - i * 0.1})`,
//               }}
//             />
//           ))}
//         </div>

//         {/* Woman */}
//         <Image
//           src={womanImg}
//           alt="Customer holding laptop"
//           className="relative z-10 w-[360px] sm:w-[420px] lg:w-[500px] xl:w-[560px] object-contain"
//           priority
//           placeholder="blur"
//         />
//       </div>
//     </section>
//   );
// };

// export default Hero;

"use client";

import { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";

// Image Imports
import growArrow from "@/assets/theme-images/grow-arrow-theme.png";
import growArrowSmall from "@/assets/theme-images/grow-arrow2.png"; // ⭐ NEW
import heroBg from "@/assets/theme-images/bg-seo-fast1.png";
import womanImg from "@/assets/theme-images/women-slider-img-web.webp";

const Hero = () => {
  const [stars] = useState(() =>
    [...Array(36)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: 0.25 + Math.random() * 0.45,
    }))
  );

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
            className="absolute h-1 w-1 rounded-full bg-white/80"
            style={{ left: star.left, top: star.top, opacity: star.opacity }}
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
        className="
          hidden lg:block
          pointer-events-none absolute
          left-[84%] top-[26%]
          w-[220px] xl:w-[280px]
          rotate-[-10deg]
          opacity-90
          z-[8]         /* behind woman (z-10), above background */
        "
      />

      {/* Left-side small arrow */}
      <Image
        src={growArrowSmall}
        alt=""
        className="
          hidden lg:block
          pointer-events-none absolute
          left-[96%] top-[20%]
          w-[20px] xl:w-[20px]
          rotate-[-10deg]
          opacity-90
          z-[1]
        "
      />

      {/* Right-side small arrow */}
      <Image
        src={growArrowSmall}
        alt=""
        className="
          hidden lg:block
          pointer-events-none absolute
          left-[96%] top-[43%]
          w-[20px] xl:w-[20px]
          rotate-[8deg]
          opacity-90
          z-[1]
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="container relative z-10 flex min-h-screen items-center">

        <div className="grid h-full w-full flex-1 gap-8 sm:gap-10 lg:gap-16 
          grid-cols-1 
          lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]
          items-start">

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
            <h1 className="relative isolate z-0
              text-[1.95rem] font-bold leading-[1.14] tracking-[0.5px]
              sm:text-[2.2rem] md:text-[2.45rem] lg:text-[3rem] xl:text-[3.25rem]">
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
                className="
                  lg:hidden
                  absolute
                  right-[6px]
                  top-[-70px]
                  w-[240px] sm:w-[300px] md:w-[340px]
                  rotate-[-12deg]
                  opacity-80
                  pointer-events-none
                  z-[10]     /* behind heading text, above other layers */
                "
              />

              {/* SMALL SCREEN — TWO MINI ARROWS */}
              <Image
                src={growArrowSmall}
                alt=""
                className="
                  lg:hidden
                  absolute
                  right-[200px]
                  top-[-50px]
                  w-[22px]
                  rotate-[-10deg]
                  opacity-70
                  z-[1]
                "
              />

              <Image
                src={growArrowSmall}
                alt=""
                className="
                  lg:hidden
                  absolute
                  right-[24px]
                  top-[90px]
                  w-[22px]
                  rotate-[6deg]
                  opacity-70
                  z-[1]
                "
              />
            </h1>

            {/* Description */}
            <p className="text-[15px] text-muted-foreground sm:text-base sm:max-w-xl md:max-w-2xl">
              Yue Infotech builds fast, modern websites, AI-optimized SEO strategies, performance ads, powerful content,
              and secure IT solutions — everything your business needs to scale.
            </p>

            {/* CTA */}
            <button className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-orange-400 px-8 py-3 
              text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:shadow-primary/40 
              sm:w-auto sm:text-sm">
              Get a Custom Quote
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          WOMAN IMAGE (large screens)
      ===================================================== */}
      <div
        className="
          pointer-events-none absolute bottom-0 right-0
          hidden lg:flex items-end justify-end
          w-[45%] xl:w-[42%]
        "
      >
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
          placeholder="blur"
        />
      </div>
    </section>
  );
};

export default Hero;