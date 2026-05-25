import Link from "next/link";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function Approach() {
  return (
    <section className="bg-slate-50 py-16 md:py-24 border-y border-slate-200" id="approach">
      <div className="container max-w-7xl mx-auto px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Steps */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 mb-4">
              <Sparkles className="w-4 h-4 text-[#06B6D4]" />
              <span className="text-[0.7rem] font-bold tracking-[0.12em] text-[#06B6D4] uppercase">Our Approach</span>
            </div>
            
            <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-[800] leading-[1.05] tracking-[-0.03em] text-slate-900 mb-5 font-['Syne',sans-serif]">
              How We Build <span className="text-[#06B6D4]">AI-Ready</span><br />Search Visibility
            </h2>
            
            <p className="text-[1.05rem] leading-[1.65] text-slate-600 mb-10 max-w-[500px]">
              Standard SEO no longer produces AI Overview citations automatically. These require deliberate, layered optimisation — here's our proven 4-stage process.
            </p>
            
            <div className="flex flex-col gap-8 relative before:content-[''] before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
              
              {/* Step 1 */}
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[0.85rem] font-bold text-[#F59E0B] z-10 shadow-sm">01</div>
                <div className="absolute top-2 right-0 px-2 py-1 rounded bg-[#F59E0B]/10 text-[#F59E0B] text-[0.7rem] font-bold uppercase tracking-wider hidden sm:block">Research</div>
                <h4 className="text-[1.1rem] font-bold text-slate-900 mb-2 tracking-tight">Keyword Cluster Research</h4>
                <p className="text-[0.95rem] text-slate-600 leading-[1.6] mb-0">AI clusters keywords by semantic intent, not just volume. We target topic clusters using Ahrefs + GSC data to build topical authority progressively.</p>
              </div>

              {/* Step 2 */}
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[0.85rem] font-bold text-[#06B6D4] z-10 shadow-sm">02</div>
                <div className="absolute top-2 right-0 px-2 py-1 rounded bg-[#06B6D4]/10 text-[#06B6D4] text-[0.7rem] font-bold uppercase tracking-wider hidden sm:block">Content</div>
                <h4 className="text-[1.1rem] font-bold text-slate-900 mb-2 tracking-tight">AEO + GEO Content Optimisation</h4>
                <p className="text-[0.95rem] text-slate-600 leading-[1.6] mb-0">40–60 word direct-answer blocks, entity-rich paragraphs, fact-first writing — structured for featured snippets and AI citation at the same time.</p>
              </div>

              {/* Step 3 */}
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[0.85rem] font-bold text-[#F59E0B] z-10 shadow-sm">03</div>
                <div className="absolute top-2 right-0 px-2 py-1 rounded bg-[#F59E0B]/10 text-[#F59E0B] text-[0.7rem] font-bold uppercase tracking-wider hidden sm:block">Technical</div>
                <h4 className="text-[1.1rem] font-bold text-slate-900 mb-2 tracking-tight">Technical SEO Foundation</h4>
                <p className="text-[0.95rem] text-slate-600 leading-[1.6] mb-0">Schema markup, Core Web Vitals, crawlability, indexation — audited with Screaming Frog, resolved by our technical team, monitored monthly.</p>
              </div>

              {/* Step 4 */}
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[0.85rem] font-bold text-[#10B981] z-10 shadow-sm">04</div>
                <div className="absolute top-2 right-0 px-2 py-1 rounded bg-[#10B981]/10 text-[#10B981] text-[0.7rem] font-bold uppercase tracking-wider hidden sm:block">Scale</div>
                <h4 className="text-[1.1rem] font-bold text-slate-900 mb-2 tracking-tight">Authority Building & Monitoring</h4>
                <p className="text-[0.95rem] text-slate-600 leading-[1.6] mb-0">Editorial backlinks, digital PR, brand citations — reported monthly via Ahrefs. GSC + Looker Studio tracking with quarterly recalibration.</p>
              </div>

            </div>
            
            <div className="mt-12">
              <Link href="/services/seo-services#process" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-900 text-[0.9rem] font-bold transition-all hover:scale-105 active:scale-95 shadow-sm">
                See Full SEO Process →
              </Link>
            </div>
          </div>
          
          {/* Photo */}
          <div className="relative lg:sticky lg:top-32 rounded-[24px] border border-slate-200 bg-white p-2 shadow-xl overflow-hidden group hidden md:block">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none" />
            
            <div className="relative rounded-[20px] overflow-hidden aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=85"
                alt="SEO analytics and keyword performance monitoring dashboard"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-[16px] bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg">
              <div className="text-[0.7rem] font-bold text-[#06B6D4] uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
                AI Workflow · Active
              </div>
              <div className="space-y-2 text-[0.85rem]">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-slate-600">Keyword Research</span>
                  <span className="text-[#10B981] flex items-center gap-1 font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Done</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-slate-600">AEO Content</span>
                  <span className="text-[#10B981] flex items-center gap-1 font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Done</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-slate-600">Technical SEO</span>
                  <span className="text-[#10B981] flex items-center gap-1 font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Clean</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-600">AI Overviews</span>
                  <span className="text-slate-800 font-bold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">14 cited</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
