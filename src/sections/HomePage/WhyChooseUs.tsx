import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#06080F] py-20 lg:py-28" id="why">
      <div className="container max-w-7xl mx-auto px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Photo */}
          <div className="relative rounded-[24px] overflow-hidden border border-white/10 bg-[#161F35] shadow-[0_24px_80px_rgba(0,0,0,0.6)] group">
            <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85"
                alt="Yue Infotech digital strategy team collaborating on client growth"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-[#06080F]/40 to-transparent opacity-90" />
            </div>

            {/* Floating Stat Card */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-[16px] bg-[#111827]/90 backdrop-blur-md border border-white/10 shadow-xl flex items-center justify-between gap-4">
              <div className="w-10 h-10 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div className="flex-1">
                <div className="text-[1.2rem] font-[800] text-white leading-none mb-1 font-['Syne',sans-serif]">+296%</div>
                <div className="text-[0.7rem] text-[#A8B4CC] leading-tight">Organic clicks · Education client · 3 months</div>
              </div>
              <div className="w-px h-10 bg-white/10 mx-2 hidden sm:block"></div>
              <div className="hidden sm:block text-right">
                <div className="text-[1.2rem] font-[800] text-[#5865F2] leading-none mb-1 font-['Syne',sans-serif]">+118%</div>
                <div className="text-[0.7rem] text-[#A8B4CC] leading-tight">B2B SaaS ·<br />6 months</div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[0.7rem] font-bold tracking-[0.12em] text-[#10B981] uppercase">Why Yue Infotech</span>
            </div>
            
            <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-[800] leading-[1.05] tracking-[-0.03em] text-[#F1F5FF] mb-5 font-['Syne',sans-serif]">
              One Partner for<br />
              <span className="text-[#10B981]">Every Digital Need</span>
            </h2>
            
            <p className="text-[1.05rem] leading-[1.65] text-[#A8B4CC] mb-10 max-w-[500px]">
              Stop managing four separate agencies. Yue Infotech aligns your website, search visibility, paid campaigns, content, and IT infrastructure into a single strategy — where every layer makes the others stronger.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              
              {[
                { n: "01", t: "Data-Driven Strategy", p: "Every decision guided by search intent, performance data, and real competitor analysis." },
                { n: "02", t: "AI + Human Execution", p: "AI tools for speed and research. Human expertise for strategy, quality, and judgement." },
                { n: "03", t: "E-E-A-T Aligned", p: "Post March 2026 core update — we build content for experience and authority, not volume." },
                { n: "04", t: "AI Search Ready", p: "Optimised for Google AI Overviews, Gemini, ChatGPT, and Perplexity from day one." },
                { n: "05", t: "Secure Infrastructure", p: "Cloud hosting, cybersecurity, and VoIP — your digital operations protected end-to-end." },
                { n: "06", t: "Transparent Reporting", p: "Monthly Looker Studio dashboards with clear next-step recommendations — always." },
              ].map((item, i) => (
                <div key={i} className="bg-[#161F35] border border-white/5 p-5 rounded-xl transition-all hover:bg-[#1C2740] hover:border-white/10">
                  <div className="text-[0.65rem] font-bold text-[#5A6480] tracking-wider mb-2 uppercase">{item.n}</div>
                  <h4 className="text-[0.95rem] font-bold text-[#F1F5FF] mb-2">{item.t}</h4>
                  <p className="text-[0.85rem] text-[#A8B4CC] leading-[1.6] mb-0">{item.p}</p>
                </div>
              ))}

            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact-us" className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-white text-[#06080F] text-[0.95rem] font-bold rounded-[14px] transition-all hover:bg-[#E2E8F0] active:scale-95">
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-transparent border border-white/20 text-white text-[0.95rem] font-bold rounded-[14px] transition-all hover:bg-white/5 active:scale-95">
                About Us
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
