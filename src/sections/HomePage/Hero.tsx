import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import CustomSolutionPopup from "@/components/CustomSolutionPopup";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] lg:min-h-screen flex flex-col justify-center pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden bg-[#06080F]">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_80%_at_70%_30%,rgba(88,101,242,0.14)_0%,transparent_50%),radial-gradient(ellipse_60%_60%_at_10%_80%,rgba(6,182,212,0.07)_0%,transparent_55%),radial-gradient(ellipse_45%_45%_at_90%_75%,rgba(139,92,246,0.09)_0%,transparent_55%),radial-gradient(ellipse_30%_30%_at_50%_50%,rgba(88,101,242,0.04)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none" style={{ maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black, transparent 85%)', WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black, transparent 85%)' }} />

      <div className="container relative z-10 max-w-7xl mx-auto px-[5%]">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-20">
          
          {/* Left Content */}
          <div className="flex-1 w-full lg:max-w-xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111827]/80 backdrop-blur-md border border-white/10 text-[0.7rem] font-medium text-[#A8B4CC] mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Full-Service Digital Agency · Est. 2018
            </div>
            
            <h1 className="text-[clamp(2.6rem,5vw,4.2rem)] font-[800] leading-[1.05] tracking-[-0.04em] text-[#F1F5FF] mb-6 font-['Syne',sans-serif]">
              One Agency.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5865F2] to-[#06B6D4]">Every Digital Service</span><br />
              You Need.
            </h1>
            
            <p className="text-[1.05rem] leading-[1.7] text-[#A8B4CC] max-w-[480px] mb-10">
              Yue Infotech delivers <strong className="text-[#F1F5FF] font-semibold">web design, SEO, digital marketing, content writing, cloud hosting, cybersecurity, and VoIP</strong> — all under one roof, all working together to grow your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] bg-[#5865F2] hover:bg-[#4652D4] text-white text-[0.95rem] font-bold transition-all shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:shadow-[0_0_30px_rgba(88,101,242,0.6)] hover:scale-105 active:scale-95"
              >
                Book Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <CustomSolutionPopup
                source="hero-secondary-cta"
                context={{ page: "home", route: "/", section: "hero", trigger: "secondary-cta" }}
                trigger={
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] bg-[#111827] border border-white/20 hover:border-[#A8B4CC] hover:bg-[#161F35] text-white text-[0.95rem] font-bold transition-all"
                  >
                    Get Free Audit
                  </button>
                }
              />
            </div>
            
            {/* Trust Metrics */}
            <div className="flex flex-wrap gap-8 items-start">
              <div>
                <div className="text-[1.4rem] font-[800] font-['Syne',sans-serif] text-[#F1F5FF] leading-none mb-1">8<span className="text-[#5865F2]">+</span></div>
                <div className="text-[0.7rem] text-[#5A6480] uppercase tracking-wider font-semibold">Years in<br />business</div>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block"></div>
              <div>
                <div className="text-[1.4rem] font-[800] font-['Syne',sans-serif] text-[#F1F5FF] leading-none mb-1">50<span className="text-[#5865F2]">+</span></div>
                <div className="text-[0.7rem] text-[#5A6480] uppercase tracking-wider font-semibold">Clients<br />served globally</div>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block"></div>
              <div>
                <div className="text-[1.4rem] font-[800] font-['Syne',sans-serif] text-[#F1F5FF] leading-none mb-1">3.1<span className="text-[#5865F2]">×</span></div>
                <div className="text-[0.7rem] text-[#5A6480] uppercase tracking-wider font-semibold">Avg. ROAS<br />delivered</div>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block"></div>
              <div>
                <div className="text-[1.4rem] font-[800] font-['Syne',sans-serif] text-[#F1F5FF] leading-none mb-1">10<span className="text-[#5865F2]">+</span></div>
                <div className="text-[0.7rem] text-[#5A6480] uppercase tracking-wider font-semibold">Services across<br />all digital needs</div>
              </div>
            </div>
          </div>

          {/* Right Dashboard Visual */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none perspective-1000 hidden md:block">
            <div className="relative transform rotate-y-[-12deg] rotate-x-[5deg] shadow-[0_24px_80px_rgba(0,0,0,0.6)] rounded-[14px]" style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px) rotateY(-8deg) rotateX(2deg)' }}>
              
              {/* Floating Badge 1 */}
              <div className="absolute -top-4 -left-8 z-20 px-4 py-2 bg-[#161F35] border border-white/10 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-md animate-bounce" style={{ animationDuration: '3s' }}>
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[0.75rem] font-semibold text-[#A8B4CC]">AI Overview — 14 Keywords Cited</span>
              </div>
              
              {/* Dashboard Container */}
              <div className="rounded-[14px] bg-[#090C17] border border-white/10 overflow-hidden relative backdrop-blur-xl">
                {/* Header */}
                <div className="bg-[#0D1120] border-b border-white/5 py-3 px-4 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#F43F5E]" />
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="flex items-center gap-1 bg-[#161F35] px-3 py-1 rounded text-[0.7rem] text-[#5A6480] font-medium border border-white/5">
                    <Lock className="w-3 h-3" />
                    dashboard.yueinfotech.com — Client Overview
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.65rem] font-bold text-[#F43F5E] tracking-wider uppercase bg-[#F43F5E]/10 px-2 py-0.5 rounded border border-[#F43F5E]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] animate-pulse" />
                    LIVE
                  </div>
                </div>
                
                {/* Dashboard Body */}
                <div className="p-6">
                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#161F35] p-4 rounded-xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-50" />
                      <div className="text-[1.8rem] font-[800] text-[#06B6D4] font-['Syne',sans-serif] leading-none mb-1">+118%</div>
                      <div className="text-[0.7rem] font-semibold text-[#F1F5FF] uppercase tracking-wider mb-2">Organic Clicks</div>
                      <div className="text-[0.7rem] text-[#10B981] font-medium flex items-center gap-1">↑ 4.2K → 9.2K</div>
                    </div>
                    <div className="bg-[#161F35] p-4 rounded-xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#5865F2] to-transparent opacity-50" />
                      <div className="text-[1.8rem] font-[800] text-[#5865F2] font-['Syne',sans-serif] leading-none mb-1">11.3</div>
                      <div className="text-[0.7rem] font-semibold text-[#F1F5FF] uppercase tracking-wider mb-2">Avg. Position</div>
                      <div className="text-[0.7rem] text-[#10B981] font-medium flex items-center gap-1">↑ from 24.7</div>
                    </div>
                    <div className="bg-[#161F35] p-4 rounded-xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#10B981] to-transparent opacity-50" />
                      <div className="text-[1.8rem] font-[800] text-[#10B981] font-['Syne',sans-serif] leading-none mb-1">3.1×</div>
                      <div className="text-[0.7rem] font-semibold text-[#F1F5FF] uppercase tracking-wider mb-2">ROAS Paid</div>
                      <div className="text-[0.7rem] text-[#06B6D4] font-medium flex items-center gap-1">↓ CPA −38%</div>
                    </div>
                  </div>
                  
                  {/* Two Columns (Chart + AI Overviews) */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Chart Panel */}
                    <div className="bg-[#111827] rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                      <div className="text-[0.7rem] font-bold text-[#A8B4CC] uppercase tracking-wider mb-4">Organic Traffic · 8 months</div>
                      <div className="flex items-end justify-between gap-2 h-[80px]">
                        {[22, 30, 40, 52, 64, 76, 89, 100].map((height, i) => (
                          <div 
                            key={i} 
                            className={`w-full rounded-t-sm ${i > 5 ? 'bg-[#5865F2]' : i > 2 ? 'bg-[#06B6D4]' : 'bg-[#161F35]'}`}
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* AI Overviews Panel */}
                    <div className="bg-[#111827] rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                      <div className="text-[0.7rem] font-bold text-[#A8B4CC] uppercase tracking-wider mb-3">AI Overviews</div>
                      <div className="space-y-2">
                        {['seo services india', 'technical seo audit', 'cloud hosting india'].map((kw, i) => (
                          <div key={i} className="flex justify-between items-center text-[0.75rem]">
                            <span className="text-[#A8B4CC] font-medium truncate pr-2">{kw}</span>
                            <span className="text-[#06B6D4] font-bold px-1.5 py-0.5 bg-[#06B6D4]/10 rounded">Cited</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Rankings */}
                  <div className="space-y-2">
                    {[
                      { kw: 'digital marketing agency', rank: '#3', change: '↑5' },
                      { kw: 'technical seo services', rank: '#5', change: '↑8' },
                      { kw: 'web design india', rank: '#6', change: '↑11' },
                      { kw: 'cybersecurity solutions', rank: '#9', change: '↑6' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-[#111827] text-[0.8rem]">
                        <span className="text-[#A8B4CC] font-medium">{row.kw}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[#F1F5FF] font-bold">{row.rank}</span>
                          <span className="text-[#10B981] font-bold text-[0.7rem] bg-[#10B981]/10 px-1.5 py-0.5 rounded">{row.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Badge 2 */}
              <div className="absolute -bottom-4 -right-8 z-20 px-4 py-2 bg-[#161F35] border border-white/10 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-md animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
                <span className="text-[0.75rem] font-semibold text-[#A8B4CC]">+296% organic clicks · Education client · 90 days</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
