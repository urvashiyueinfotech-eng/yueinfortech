import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

export default function WhoWeAreSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          
          {/* LEFT CONTENT */}
          <div>
            <SectionHeader
              eyebrow="Who We Are"
              title="A Team Built for Long-Term Growth"
              subtitle="Yue Infotech is a team of strategists, designers, developers, marketers, and IT specialists working together to deliver high-performing digital solutions."
              align="left"
            />

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              We bring clarity, creativity, and technical expertise to brands that want
              long-term, measurable growth — not short-term wins.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            {/* Image container */}
            <div className="relative h-[420px] w-full overflow-hidden rounded-3xl ring-1 ring-black/5 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1700241956197-0b13f96fd69e?q=80&w=2322&auto=format&fit=crop"
                alt="Yue Infotech team collaboration"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Decorative square — bottom left */}
            <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-2xl bg-primary/10 lg:block" />

            {/* Decorative square — top right */}
            <div className="absolute -top-6 -right-6 hidden h-20 w-20 rounded-2xl bg-primary/10 lg:block" />
          </div>

        </div>
      </div>
    </section>
  );
}