import SectionHeader from "@/components/SectionHeader";

export default function AboutHero() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionHeader
          eyebrow="Since 2018"
          title="Your Digital Growth Partner"
          subtitle="Yue Infotech is a full-service digital agency specializing in web development, SEO, digital marketing, content strategy, branding, and IT infrastructure services. Since 2018, we’ve helped businesses build powerful online experiences that attract, convert, and scale."
          align="center"
        />
      </div>
    </section>
  );
}