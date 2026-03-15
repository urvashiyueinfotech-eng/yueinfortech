import { ShieldCheck, BrainCircuit, UsersRound, Target } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CtaButton from "@/components/CtaButton";

const steps = [
  {
    id: "01.",
    title: "Data-Driven Strategies",
    desc: "Every strategy is guided by analytics, search intent, and user behavior.",
    icon: ShieldCheck,
  },
  {
    id: "02.",
    title: "AI + Human Strategy",
    desc: "We combine advanced AI tools with expert execution for scalable growth.",
    icon: BrainCircuit,
  },
  {
    id: "03.",
    title: "Authority & Trust-Focused Execution",
    desc: "We align with search quality standards and long-term credibility.",
    icon: UsersRound,
  },
  {
    id: "04.",
    title: "Secure & Scalable Infrastructure",
    desc: "Reliable systems built for speed, uptime, and business continuity.",
    icon: ShieldCheck,
  },
  {
    id: "05.",
    title: "Conversion-Focused Experiences",
    desc: "Every user journey is engineered to increase engagement and action.",
    icon: Target,
  },
  {
    id: "06.",
    title: "Transparent & Ethical Work",
    desc: "Clear reporting, sustainable methods, and long-term performance.",
    icon: ShieldCheck,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full pt-10 pb-10 bg-slate-50">
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
              subtitle="We align technology, marketing, AI optimization, and business strategy to build long-term, sustainable digital growth systems."
              align="left"
              className="max-w-xl"
            />

            <CtaButton
              href="#contact"
              bgClassName="bg-indigo-600 hover:bg-indigo-700 px-7 py-3"
              textClassName="text-white text-[15px]"
              className="w-fit"
            >
              Get a Strategy Recommendation →
            </CtaButton>
          </div>
        </div>

        {/* RIGHT SIDE (TIMELINE) */}
        <div className="relative w-full lg:w-[58%] pl-4">

          {/* Vertical Line (auto-adjusted position) */}
          <div
            className="
              absolute left-[22px] top-0 h-full w-[2px] bg-indigo-200
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
                      rounded-full bg-white shadow-md ring-2 ring-indigo-200
                      text-indigo-600 font-semibold text-sm 
                      md:left-[34%] md:-translate-x-1/2
                    "
                  >
                    {step.id}
                  </div>

                  {/* Card */}
                  <div
                    className="
                      ml-16 w-full rounded-2xl bg-white p-7 shadow-sm border border-slate-100
                      md:ml-[calc(34%+48px)] md:w-[74%]
                    "
                  >
                    <Icon className="mb-3 h-8 w-8 text-indigo-600" />

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