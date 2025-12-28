import Link from "next/link";
import { Mail, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(121,133,255,0.08),transparent_45%)]" />

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

            <p className="text-sm leading-relaxed text-slate-400">
              Full-service digital agency helping businesses grow with strategy,
              design, technology, and performance marketing.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "About Us", href: "/about-us" },
                { label: "Services", href: "/services" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact-us" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES (LINKED) */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
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
                    className="transition hover:text-white"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h4>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-indigo-400" />
                <span>+91 85936 62992</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-indigo-400" />
                <span>hello@yueinfotech.com</span>
              </div>

              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
              >
                Talk to Experts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px bg-white/10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Yue Infotech. All rights reserved.
          </p>

          <div className="flex gap-4 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}