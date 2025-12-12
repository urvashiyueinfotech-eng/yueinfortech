import { ShieldCheck, BrainCircuit, UsersRound, Target } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

const steps = [
  {
    id: "01.",
    title: "Data-Driven Strategies",
    desc: "We rely on analytics, market signals, and real user behavior to guide every decision—removing guesswork and improving ROI.",
    icon: ShieldCheck,
  },
  {
    id: "02.",
    title: "AI + Human Expertise",
    desc: "A powerful blend of artificial intelligence and expert insight ensures accuracy, innovation, and long-term performance.",
    icon: BrainCircuit,
  },
  {
    id: "03.",
    title: "E-E-A-T Focused Execution",
    desc: "Our approach aligns with Google’s Experience, Expertise, Authoritativeness & Trustworthiness guidelines for better rankings.",
    icon: UsersRound,
  },
  {
    id: "04.",
    title: "Secure IT Infrastructure",
    desc: "Your digital presence is built on strong, reliable, and scalable infrastructure—optimized for speed and protected 24/7.",
    icon: ShieldCheck,
  },
  {
    id: "05.",
    title: "High-Conversion Web Experiences",
    desc: "We create seamless, intuitive customer journeys that boost engagement, trust, and conversions across devices.",
    icon: Target,
  },
  {
    id: "06.",
    title: "Transparent, Ethical, Google-Compliant Work",
    desc: "No shortcuts, no risks. You get honest reporting, ethical methods, and long-term sustainable growth.",
    icon: ShieldCheck,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-24">
      <div
        className="
          container mx-auto 
          flex flex-col gap-10
          lg:flex-row lg:gap-16
        "
      >
        {/* LEFT SIDE (Sticky Section) */}
        <div className="w-full lg:w-[42%] lg:min-h-[calc(100%+240px)]">
          <div className="lg:sticky lg:top-28 space-y-6 pb-40">
            <SectionHeader
              eyebrow="Why Choose Us"
              title="Your Growth Partner for Performance, Security & Scalability"
              subtitle="We combine strategy, technology, and creativity to drive long-term results. Every solution is data-powered, secure, and aligned with your business goals."
              align="left"
              className="max-w-xl"
            />

            <Link
              href="#contact"
              className="
                mt-8 inline-flex w-fit items-center justify-center 
                rounded-full bg-primary px-7 py-3 text-[15px] font-semibold 
                text-white shadow-lg transition hover:bg-orange-500
              "
            >
              Get a Strategy Recommendation →
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE (TIMELINE) */}
        <div className="relative w-full lg:w-[58%] pl-4">

          {/* Vertical Line (auto-adjusted position) */}
          <div
            className="
              absolute left-[22px] top-0 h-full w-[2px] bg-orange-300/40
              md:left-[34%]
            "
          ></div>

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <div key={i} className="relative flex">

                  {/* Number Circle */}
                  <div
                    className="
                      absolute left-0 flex h-12 w-12 items-center justify-center 
                      rounded-full bg-white shadow-md ring-2 ring-orange-300/40 
                      text-orange-600 font-semibold text-sm 
                      md:left-[34%] md:-translate-x-1/2
                    "
                  >
                    {step.id}
                  </div>

                  {/* Card */}
                  <div
                    className="
                      ml-16 w-full rounded-2xl bg-white p-7 shadow-sm
                      md:ml-[calc(34%+48px)] md:w-[74%]
                    "
                  >
                    <Icon className="mb-3 h-8 w-8 text-orange-500" />

                    <h3 className="text-xl font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}