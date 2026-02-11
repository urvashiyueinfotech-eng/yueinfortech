"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles, Code2, Share2, Cpu } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import CtaButton from "@/components/CtaButton";

// Image Imports
import growArrow from "@/assets/theme-images/grow-arrow-theme.png";
import growArrowSmall from "@/assets/theme-images/grow-arrow2.png";
import womanImg from "@/assets/theme-images/women-slider-img-web.webp";

type HeroProps = {
  heroEyebrow?: string;
  heroHeading?: string;
};

type Star = {
  left: string;
  top: string;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  scale: number;
};

const Hero = ({
  heroEyebrow = "Take your business",
  heroHeading = "Web Development, SEO & IT Solutions That Help You Grow!",
}: HeroProps) => {
  const [stars, setStars] = useState<Star[]>([]);

  // Generate star positions
  useEffect(() => {
    const generatedStars = [...Array(40)].map(
      () =>
        ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.2 + Math.random() * 0.5,
          duration: 10 + Math.random() * 20,
          delay: Math.random() * 10,
          drift: (Math.random() - 0.5) * 30,
          scale: 0.5 + Math.random() * 0.8,
        } satisfies Star)
    );
    setStars(generatedStars);
  }, []);

  return (
    <section className="relative min-h-[90vh] lg:h-screen overflow-hidden bg-[#0a051e] text-white selection:bg-purple-500/30">
      
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-700/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0">
        {stars.map((star, i) => (
          <span
            key={i}
            className="star-floating absolute h-1 w-1 rounded-full bg-blue-200"
            style={
              {
                left: star.left,
                top: star.top,
                opacity: star.opacity,
                boxShadow: `0 0 ${star.scale * 4}px rgba(139, 92, 246, 0.8)`,
                animationDuration: `${star.duration}s`,
                animationDelay: `-${star.delay}s`,
                "--drift": `${star.drift}px`,
                "--scale": star.scale,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="absolute top-[15%] right-[5%] opacity-40 animate-pulse-slow hidden lg:block">
         <Share2 className="text-purple-400 w-24 h-24 stroke-[0.5]" />
      </div>
      <div className="absolute bottom-[10%] left-[5%] opacity-30 hidden lg:block">
        <Cpu className="text-indigo-400 w-32 h-32 stroke-[0.5] rotate-12" />
      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="container relative z-10 flex h-full items-end pt-20 lg:pt-0">
        
        {/* UPDATE: Removed 'pb-12' from here. Now uses 'pb-0' so content hits the floor */}
        <div className="grid h-full w-full flex-1 gap-8 lg:gap-8 grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-end pb-0 pt-6">

          {/* LEFT COLUMN: TEXT */}
          {/* Added 'pb-12' ONLY to the text column if you want text to have breathing room, 
              but kept it 0 for now to ensure alignment control. 
              Added 'mb-auto lg:mb-32' to push text up on mobile if flex stretches. */}
          <div className="relative space-y-8 text-left z-20 self-center lg:self-center lg:mb-32">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(168,85,247,0.4)]">
                <Sparkles className="h-4 w-4 text-purple-300 animate-pulse" />
                <span className="text-sm font-semibold tracking-wide text-purple-100 uppercase">{heroEyebrow}</span>
            </div>
            <SectionHeader
              as="h1"
              title={heroHeading}
              titleClassName="text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] leading-[1.1] font-bold tracking-tight text-white drop-shadow-[0_0_25px_rgba(139,92,246,0.2)]"
              subtitle="Yue Infotech builds fast, modern websites, AI-optimized SEO strategies, performance ads, powerful content, and secure IT solutions — everything your business needs to scale."
              subtitleClassName="text-lg text-slate-300/90 leading-relaxed max-w-xl"
              align="left"
              className="relative isolate"
            />
            <div className="pt-2">
	                <CtaButton
	                href="/contact-us"
	                bgClassName="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] border border-white/10"
	                textClassName="text-white font-medium tracking-wide"
	                className="w-full sm:w-auto gap-3 py-4 px-8 rounded-xl transition-all hover:scale-105"
	                >
                <span>Get a Custom Quote</span>
                <ArrowUpRight className="h-5 w-5" />
                </CtaButton>
            </div>
          </div>

          {/* RIGHT COLUMN: WOMAN & TECH GRAPHICS */}
          {/* Used 'items-end' to force bottom alignment */}
          <div className="relative h-full w-full flex items-end justify-center lg:justify-end -mb-1"> 
            {/* Added -mb-1 to fix potential 1px pixel gap on some screens */}
            
            {/* 1. The Tech Circle Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] lg:w-[600px] lg:h-[600px] border border-white/5 rounded-full animate-spin-slow pointer-events-none">
                 <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,1)]"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] lg:w-[450px] lg:h-[450px] border border-dashed border-indigo-500/20 rounded-full pointer-events-none"></div>

            {/* 2. Floating "Glass" Code Cards */}
            <div className="absolute top-[20%] left-[-5%] lg:left-[5%] z-0 animate-float-slow hidden sm:block">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl w-48 transform -rotate-6">
                    <div className="flex gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                        <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                        <div className="h-2 w-full bg-white/5 rounded"></div>
                    </div>
                </div>
            </div>

            {/* ARROWS BEHIND */}
            <div className="absolute -right-4 top-[10%] lg:right-[0%] lg:top-[15%] z-0 animate-pulse-slow">
                <Image
                    src={growArrow}
                    alt=""
                    className="w-[180px] sm:w-[220px] lg:w-[260px] opacity-90 rotate-[-15deg] filter hue-rotate-[160deg] brightness-125 saturate-150 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                />
            </div>
            <div className="absolute right-[20%] top-[40%] z-0">
                <Image
                    src={growArrowSmall}
                    alt=""
                    className="w-[25px] opacity-80 filter hue-rotate-[160deg] brightness-125 saturate-150 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]"
                />
            </div>
             <div className="absolute right-[5%] bottom-[50%] z-0">
                <Image
                    src={growArrowSmall}
                    alt=""
                    className="w-[30px] opacity-80 rotate-12 filter hue-rotate-[160deg] brightness-125 saturate-150 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]"
                />
            </div>

            {/* 3. The Woman Image */}
            {/* Added 'self-end' and removed padding/margin blockers */}
            {/* 3. The Woman Image */}
            <div className="relative z-10 self-end group">
              
              {/* OPTIONAL: Glow behind her (This can stay rectangular as it's a soft blur) */}
              <div className="absolute inset-0 bg-purple-600/20 blur-3xl -z-10 rounded-full scale-90 translate-y-10"></div>

              {/* The Main Image */}
              <Image
                src={womanImg}
                alt="Digital Growth Expert"
                className="w-[300px] sm:w-[380px] lg:w-[480px] xl:w-[550px] 
                           drop-shadow-2xl 
                           brightness-[0.9] contrast-[1.1] saturate-[0.8]"
                priority
              />

              {/* LAYER 1: Purple Tint (Now Masked!) 
                  Added 'maskImage' style to cut the purple box into the shape of the woman */}
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay bg-gradient-to-tr from-indigo-900/80 via-purple-900/50 to-transparent z-20"
                style={{
                    maskImage: `url(${womanImg.src})`,
                    WebkitMaskImage: `url(${womanImg.src})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center'
                }}
              />

              {/* LAYER 2: Rim Light (Also Masked) */}
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-40 bg-gradient-to-l from-blue-500/40 to-transparent z-20"
                style={{
                    maskImage: `url(${womanImg.src})`,
                    WebkitMaskImage: `url(${womanImg.src})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center'
                }}
              />

              {/* LAYER 3: Bottom Fade 
                  This stays rectangular to blend the bottom cut-off into the floor smoothly */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a051e] via-[#0a051e]/80 to-transparent z-30" />
            </div>

            {/* 4. Code card in front */}
            <div className="absolute bottom-[25%] right-[-5%] z-20 animate-float-delayed hidden sm:block">
                <div className="bg-indigo-900/60 backdrop-blur-xl border border-indigo-500/20 p-4 rounded-xl shadow-2xl w-40 transform rotate-3">
                     <Code2 className="w-8 h-8 text-indigo-400 mb-2" />
                     <div className="h-2 w-2/3 bg-indigo-400/20 rounded"></div>
                </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes starFloat {
          0% { transform: translate3d(0, 0, 0) scale(var(--scale, 1)); opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { transform: translate3d(calc(var(--drift, 8px) * 2), 26px, 0) scale(var(--scale, 1)); opacity: 0.3; }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(-6deg); }
            50% { transform: translateY(-20px) rotate(-3deg); }
        }
        @keyframes floatDelayed {
            0%, 100% { transform: translateY(0) rotate(3deg); }
            50% { transform: translateY(-15px) rotate(6deg); }
        }

        .star-floating {
          animation-name: starFloat;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-float-slow {
            animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
            animation: floatDelayed 7s ease-in-out infinite;
        }
        .animate-spin-slow {
            animation: spin 20s linear infinite;
        }
        @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
