import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePageCTA() {
  return (
    <section className="relative overflow-hidden py-32 px-[5%] text-center bg-[#06080F]">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_60%,rgba(88,101,242,0.14),transparent_65%),radial-gradient(ellipse_50%_60%_at_15%_20%,rgba(6,182,212,0.05),transparent_60%),radial-gradient(ellipse_40%_40%_at_85%_80%,rgba(139,92,246,0.07),transparent_60%)] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-50 mask-image:linear-gradient(to_bottom,black,transparent)" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }} />
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111827]/80 backdrop-blur-md border border-white/10 text-[0.7rem] sm:text-[0.8rem] font-medium text-[#A8B4CC] mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          Free consultation · No commitment · Est. 2018
        </div>
        
        {/* Heading */}
        <h2 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-[800] text-[#F1F5FF] tracking-[-0.04em] leading-[1.03] mb-5 font-['Syne',sans-serif]">
          One Agency for<br />Everything You <span className="text-[#06B6D4]">Need.</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-[#A8B4CC] max-w-lg mx-auto text-[0.97rem] leading-[1.78] mb-10">
          Stop coordinating between multiple agencies. Book a free strategy call — we'll review your digital position across all channels and outline a unified plan before any work begins.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact-us"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-[#5865F2] hover:bg-[#4652D4] text-white text-[0.95rem] font-bold rounded-[14px] transition-all hover:scale-105 active:scale-95 shadow-[0_4px_24px_rgba(88,101,242,0.3)]"
          >
            Book Free Strategy Call
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            href="/contact-us#audit"
            className="flex items-center justify-center w-full sm:w-auto px-7 py-3.5 bg-transparent border border-white/20 hover:bg-white/5 text-white text-[0.95rem] font-bold rounded-[14px] transition-all hover:border-white/40"
          >
            Get a Free Audit
          </Link>

          <a
            href="https://wa.me/918859366292"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-[0.95rem] font-bold rounded-[14px] transition-all hover:scale-105 active:scale-95"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
