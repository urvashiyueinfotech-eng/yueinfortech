export default function Industries() {
  const industries = [
    "Healthcare & Clinics",
    "SaaS & Technology",
    "E-Commerce & Retail",
    "Real Estate",
    "Education & EdTech",
    "Finance & Fintech",
    "Local Service Businesses",
    "B2B & Enterprise",
    "Hospitality & Travel",
    "Startups",
    "Professional Services"
  ];

  return (
    <section className="bg-slate-50 py-14 border-y border-slate-200" id="industries">
      <div className="container max-w-7xl mx-auto px-[5%] animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/20 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5865F2] animate-pulse" />
          <span className="text-[0.7rem] font-bold tracking-[0.12em] text-[#5865F2] uppercase">Who We Serve</span>
        </div>
        
        <h2 className="text-[clamp(1.7rem,2.6vw,2.3rem)] font-[800] leading-[1.1] tracking-[-0.03em] text-slate-900 mb-7 font-['Syne',sans-serif]">
          Industries We <span className="text-[#5865F2]">Work With</span>
        </h2>
        
        <div className="flex flex-wrap gap-2.5">
          {industries.map((industry, index) => (
            <span
              key={index}
              className="bg-white border border-slate-200 text-slate-600 text-[0.83rem] font-[600] px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm cursor-default"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
