import Link from "next/link";
import { Mail, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";

const COPYRIGHT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative bg-[#06080F] text-[#A8B4CC] border-t border-white/5">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(88,101,242,0.08),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-5">
        {/* TOP GRID */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="space-y-5">
            <Image
              src="/Yueinfotech.com-logo-white.png"
              alt="Yue Infotech"
              width={320}
              height={64}
              priority
              className="h-12 w-auto max-w-none sm:h-14 md:h-16"
            />

            <p className="text-[0.9rem] leading-[1.65] text-[#5A6480]">
              Full-service digital agency helping businesses grow with strategy,
              design, technology, and performance marketing.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="mb-5 text-[0.8rem] font-bold uppercase tracking-wider text-white font-['Syne',sans-serif]">
              Quick Links
            </h4>
            <ul className="space-y-3 text-[0.9rem]">
              {[
                { label: "About Us", href: "/about-us" },
                { label: "Services", href: "/services" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact-us" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES (LINKED) */}
          <div>
            <h4 className="mb-5 text-[0.8rem] font-bold uppercase tracking-wider text-white font-['Syne',sans-serif]">
              Our Services
            </h4>
            <ul className="space-y-3 text-[0.9rem]">
              {[
                {
                  label: "Web Design & Development",
                  href: "/services/web-design-and-development-services",
                },
                {
                  label: "SEO Services",
                  href: "/services/seo-services",
                },
                {
                  label: "Digital Marketing",
                  href: "/services/digital-marketing-services",
                },
                {
                  label: "Content Writing",
                  href: "/services/content-writing-services",
                },
                {
                  label: "Local Business Solutions",
                  href: "/services/local-business-services",
                },
              ].map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="transition-colors hover:text-white"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="mb-5 text-[0.8rem] font-bold uppercase tracking-wider text-white font-['Syne',sans-serif]">
              Contact Us
            </h4>

            <div className="space-y-4 text-[0.9rem]">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#5865F2]" />
                <span>+91 85936 62992</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#5865F2]" />
                <a
                  href="mailto:sales@yueinfotech.com"
                  className="transition-colors hover:text-white"
                >
                  sales@yueinfotech.com
                </a>
              </div>

              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-[#5865F2] px-5 py-2.5 text-[0.8rem] font-bold text-white transition-colors hover:bg-[#4752C4]"
              >
                Talk to Experts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px bg-white/5" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-4 text-[0.8rem] sm:flex-row">
          <p className="text-[#5A6480]">
            © {COPYRIGHT_YEAR} Yue Infotech. All rights reserved.
          </p>

          <div className="flex gap-4 text-[#5A6480]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
