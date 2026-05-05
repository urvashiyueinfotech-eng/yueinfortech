import Link from "next/link";
import { type MainService } from "@/data/main-services.data";
import { ReactNode } from "react";

type Props = {
  service: MainService;
  index: number;
};

function getCardIcon(index: number) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#5B4FE9]">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#5B4FE9]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" fill="none" />
        <path d="M21 21l-4.35-4.35" fill="none" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#5B4FE9]">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#5B4FE9]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="none" />
        <polyline points="14 2 14 8 20 8" fill="none" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#5B4FE9]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" fill="none" />
      <rect x="2" y="14" width="20" height="8" rx="2" fill="none" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

export default function ServicesPageCard({ service, index }: Props) {
  console.log(service);
  return (
    <div
      className={`bg-white rounded-[20px] py-[32px] px-[28px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] border flex flex-col transition-all duration-250 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(91,79,233,0.16)] ${index === 0 ? "border-[#5B4FE9] border-2" : "border-[rgba(91,79,233,0.06)]"
        }`}
    >
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-[#5B4FE9] transition-transform duration-300 origin-left ${index === 0 ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />

      <div className="w-[52px] h-[52px] bg-[#EEF0FF] rounded-[14px] flex items-center justify-center mb-5">
        {getCardIcon(index)}
      </div>
      <div className="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#5B4FE9] mb-[6px]">
        0{index + 1} — {service.title}
      </div>
      <h3 className="text-[1.2rem] font-bold text-[#1E1B4B] mb-2 tracking-[-0.01em]">
        {service.eyebrow}
      </h3>
      <div className="text-[0.84rem] text-[#4B5563] leading-[1.65] mb-4 py-[10px] px-[14px] bg-[#EEF0FF] rounded-lg border-l-[3px] border-[#5B4FE9]">
        {service.description}
      </div>
      <div className="text-[0.78rem] font-bold text-[#1E1B4B] tracking-[0.04em] uppercase mb-[10px] mt-1">
        Our Capabilities
      </div>
      <ul className="list-none mb-[22px] flex-1">
        {service.services.map((item, i) => (
          <li key={i} className="text-[0.84rem] text-[#4B5563] py-1.5 pl-[18px] relative border-b border-[rgba(91,79,233,0.06)] last:border-b-0">
            <span className="absolute left-0 top-[14px] w-[7px] h-[7px] bg-[#5B4FE9] rounded-full" />
            {item}
          </li>
        ))}
      </ul>
      <Link
        href={service.primaryHref ?? `/services/${service.slug}`}
        className="text-[0.84rem] font-bold text-[#5B4FE9] no-underline inline-flex items-center gap-[5px] mt-auto transition-all duration-200 hover:gap-[9px]"
      >
        Explore →
      </Link>
    </div>
  );
}
