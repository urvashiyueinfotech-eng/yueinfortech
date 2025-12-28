import Image from "next/image";
import { ArrowRight, FileText, Rocket, Search } from "lucide-react";
import { MainService } from "@/data/main-services.data";
import CtaButton from "../CtaButton";

type Props = {
  service: MainService;
  index: number;
};

export default function MainServiceCard({ service, index }: Props) {
  // console.log("service>>>>>>",service);
  // Logic: Index 1 (middle) is Image Top. Index 0 and 2 are Image Bottom.
  // This creates the zig-zag effect shown in image 2.
  const isImageTop = index % 2 !== 0;

  // Helper to match icons to the image style based on index
  const getIcon = () => {
    switch (index) {
      case 0: return <FileText className="h-10 w-10 text-indigo-600 stroke-[1.5]" />;
      case 1: return <Rocket className="h-10 w-10 text-indigo-600 stroke-[1.5]" />;
      case 2: return <Search className="h-10 w-10 text-indigo-600 stroke-[1.5]" />;
      default: return <FileText className="h-10 w-10 text-indigo-600 stroke-[1.5]" />;
    }
  };

  return (
    // UPDATED CONTAINER CLASSES:
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[30px] bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-1 hover:ring-indigo-400">
      
      {/* ---------------- IMAGE SECTION (If Top) ---------------- */}
      {isImageTop && (
        <div className="relative h-[240px] w-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        </div>
      )}

      {/* ---------------- CONTENT SECTION ---------------- */}
      <div className="relative flex flex-1 flex-col p-8">
        
        {/* Background Number (01, 02, 03) */}
        <span className="absolute right-6 top-4 text-6xl font-bold text-slate-100 opacity-80 select-none transition-colors duration-300 group-hover:text-slate-200">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>

        {/* Icon */}
        <div className="mb-6 relative z-10">
          {getIcon()}
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-slate-900 relative z-10">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mb-8 text-sm leading-relaxed text-slate-600 relative z-10">
          {service.description}
        </p>

        {/* CTA Button - Pill Shape Outline */}
        <div className="mt-auto relative z-10">
          <CtaButton
            href={service.primaryHref ?? `/services/${service.slug}`}
            bgClassName="border border-indigo-600 bg-white hover:bg-indigo-600 px-6 py-2.5"
            textClassName="text-xs font-bold text-indigo-600 hover:text-white"
            className="gap-2 shadow-none hover:shadow-md group"
          >
            <span>{service.primaryCta ?? "Read More"}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </div>
      </div>

      {/* ---------------- IMAGE SECTION (If Bottom) ---------------- */}
      {!isImageTop && (
        <div className="relative h-[240px] w-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        </div>
      )}
    </div>
  );
}