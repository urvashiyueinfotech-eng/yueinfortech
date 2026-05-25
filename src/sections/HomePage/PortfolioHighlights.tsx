import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PortfolioHighlights() {
  return (
    <section className="bg-[#06080F] py-20 lg:py-28" id="results">
      <div className="container max-w-7xl mx-auto px-[5%]">
        
        <div className="mb-14 text-center max-w-2xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="text-[0.7rem] font-bold tracking-[0.12em] text-[#A8B4CC] uppercase">Documented Results</span>
          </div>
          
          <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-[800] leading-[1.05] tracking-[-0.03em] text-[#F1F5FF] mb-5 font-['Syne',sans-serif]">
            Real Performance from <span className="text-[#06B6D4]">Real Engagements</span>
          </h2>
          
          <p className="text-[1.05rem] leading-[1.65] text-[#A8B4CC]">
            Numbers from actual client reporting periods — not projections. Every metric is from a completed engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1 */}
          <div className="group relative bg-[#161F35] border border-white/5 rounded-[20px] p-6 lg:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#5865F2]/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5865F2] to-[#06B6D4] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            
            <div className="inline-block bg-[#0D1120] border border-white/10 text-[#5A6480] text-[0.65rem] font-bold tracking-[0.05em] uppercase px-3 py-1 rounded-full mb-5">
              B2B SaaS · SEO · 6 Months
            </div>
            
            <div className="flex flex-col gap-2.5 mb-4">
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">Organic Clicks</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#5865F2]">4.2K → 9.2K</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">Click Growth</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#10B981]">+118%</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">Avg. Position</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#10B981]">24.7 → 11.3</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">AI Overview KWs</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#5865F2]">14 tracked</span>
              </div>
            </div>
            
            <div className="pt-3 border-t border-white/5 text-[0.72rem] text-[#5A6480] leading-[1.6]">
              Topic clusters, AEO FAQ integration, schema markup, 22 long-tail content pieces.
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-[#161F35] border border-white/5 rounded-[20px] p-6 lg:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#5865F2]/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5865F2] to-[#06B6D4] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            
            <div className="inline-block bg-[#0D1120] border border-white/10 text-[#5A6480] text-[0.65rem] font-bold tracking-[0.05em] uppercase px-3 py-1 rounded-full mb-5">
              Education Platform · SEO · 3 Months
            </div>
            
            <div className="flex flex-col gap-2.5 mb-4">
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">Organic Clicks</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#5865F2]">900 → 3.56K</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">Click Growth</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#10B981]">+296%</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">Impressions</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#10B981]">168K → 601K</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">Avg. Position</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#10B981]">18.4 → 8.1</span>
              </div>
            </div>
            
            <div className="pt-3 border-t border-white/5 text-[0.72rem] text-[#5A6480] leading-[1.6]">
              Technical debt clearance, topic clusters, 18 editorial backlinks. Organic #1 channel by month 3.
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-[#161F35] border border-white/5 rounded-[20px] p-6 lg:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#5865F2]/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)] lg:col-span-1 md:col-span-2">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5865F2] to-[#06B6D4] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            
            <div className="inline-block bg-[#0D1120] border border-white/10 text-[#5A6480] text-[0.65rem] font-bold tracking-[0.05em] uppercase px-3 py-1 rounded-full mb-5">
              E-Commerce · Meta Ads · 90 Days
            </div>
            
            <div className="flex flex-col gap-2.5 mb-4">
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">ROAS Achieved</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#5865F2]">3.1×</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">CPA Reduction</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#10B981]">−38%</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">Revenue from Ads</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#10B981]">+140%</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-[0.76rem] text-[#A8B4CC]">Returning Visitors</span>
                <span className="font-['Syne',sans-serif] text-[0.95rem] font-[800] text-[#5865F2]">+89%</span>
              </div>
            </div>
            
            <div className="pt-3 border-t border-white/5 text-[0.72rem] text-[#5A6480] leading-[1.6]">
              Rebuilt Meta campaign architecture — separated cold, warm, and retargeting audiences.
            </div>
          </div>

        </div>

        <div className="mt-16 text-center">
          <Link href="/case-studies" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#06080F] text-[0.95rem] font-bold rounded-[14px] transition-all hover:bg-[#E2E8F0] active:scale-95 shadow-[0_4px_24px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)]">
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}