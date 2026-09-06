import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { BarChart3, Globe2, MapPin, Megaphone, PenLine, Search } from "lucide-react";
import PortfolioClient from "./PortfolioClient";
import { getPageMetadata } from "@/lib/pageSeo.service";
import { getPortfolioPageContent } from "@/lib/portfolio.service";
import type { LinkAction } from "@/types";
import type { PortfolioDeliveryItem } from "@/types/portfolio";
import PageStructuredData from "@/components/PageStructuredData";
import "./portfolio.css";

const PORTFOLIO_FALLBACK_METADATA: Metadata = {
  title: "Our Work & Case Studies | Yue Infotech Portfolio",
  description: "Real results from real clients — explore Yue Infotech's case studies across SEO, AI visibility, web design, content strategy, and digital marketing. 50+ projects. 15+ industries.",
  openGraph: {
    title: "Our Work & Case Studies | Yue Infotech Portfolio",
    description: "Real results from real clients — explore Yue Infotech's case studies across SEO, AI visibility, web design, content strategy, and digital marketing.",
    type: "website",
    url: "https://www.yueinfotech.com/case-studies",
    siteName: "Yue Infotech",
    images: [
      {
        url: "https://www.yueinfotech.com/assets/og-portfolio.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work & Case Studies | Yue Infotech Portfolio",
    description: "50+ projects. 15+ industries. Real SEO, AI visibility, and digital growth results from Yue Infotech.",
    images: ["https://www.yueinfotech.com/assets/og-portfolio.jpg"],
  },
  alternates: {
    canonical: "https://www.yueinfotech.com/case-studies",
  },
};

const PORTFOLIO_SEO_REVALIDATE = 2592000;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("portfolio", PORTFOLIO_FALLBACK_METADATA, {
    revalidate: PORTFOLIO_SEO_REVALIDATE,
  });
}

function PortfolioAction({ action, variant }: { action: LinkAction; variant: "primary" | "secondary" }) {
  const className = variant === "primary" ? "btn-p" : "btn-s";
  return (
    <Link href={action.href} className={className}>
      {action.text}
    </Link>
  );
}

function DeliveryIcon({ icon, title }: Pick<PortfolioDeliveryItem, "icon" | "title">) {
  const className = "h-6 w-6 text-[#7B72EE]";
  const iconMap: Record<string, ReactNode> = {
    search: <Search className={className} strokeWidth={2.4} />,
    globe: <Globe2 className={className} strokeWidth={2.4} />,
    pen: <PenLine className={className} strokeWidth={2.4} />,
    megaphone: <Megaphone className={className} strokeWidth={2.4} />,
    "map-pin": <MapPin className={className} strokeWidth={2.4} />,
    "bar-chart": <BarChart3 className={className} strokeWidth={2.4} />,
  };

  return (
    <div className="deliver-icon" aria-hidden="true" title={title}>
      {iconMap[icon] ?? <Search className={className} strokeWidth={2.4} />}
    </div>
  );
}

export default async function PortfolioPage() {
  const content = await getPortfolioPageContent();

  return (
    <>
      <PageStructuredData pageId="portfolio" />
      <main className="portfolio-page-main min-h-screen bg-[#F8F9FF] text-[#1E1B4B] font-sans">
        <section className="hero">
          <div className="hero-dots"></div>
          <div className="hero-glow"></div>
          <div className="hero-inner">
            <div className="hero-bc">
              <Link href="/">Home</Link> / {content.hero.breadcrumb}
            </div>
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>{content.hero.badge}
            </div>
            <h1>
              {content.hero.headingLines.map((line) => (
                <span key={line}>{line}<br /></span>
              ))}
              <em>{content.hero.highlightedLine}</em>
            </h1>
            <p className="hero-sub">{content.hero.description}</p>
            <div className="hero-stats">
              {content.hero.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`}>
                  <div className="hs-num">{stat.value}</div>
                  <div className="hs-label">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="hero-ctas">
              {content.hero.actions.map((action, index) => (
                <PortfolioAction key={`${action.href}-${action.text}`} action={action} variant={index === 0 ? "primary" : "secondary"} />
              ))}
            </div>
          </div>
        </section>

        <PortfolioClient filters={content.filters} caseStudies={content.caseStudies} />

        <div className="metrics-strip fade-up visible">
          {content.metrics.map((metric) => (
            <div key={`${metric.value}-${metric.label}`} className="metric-cell">
              <div className="metric-num">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </div>

        <section className="deliver-section fade-up visible">
          <div className="sec-label">{content.deliver.eyebrow}</div>
          <h2>{content.deliver.heading}<br /><em>{content.deliver.highlightedText}</em></h2>
          <p className="sec-sub">{content.deliver.description}</p>
          <div className="deliver-grid">
            {content.deliver.items.map((item) => (
              <div key={item.id} className="deliver-item">
                <DeliveryIcon icon={item.icon} title={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="process-section fade-up visible">
          <div className="sec-label">{content.process.eyebrow}</div>
          <h2>{content.process.heading} <span>{content.process.highlightedText}</span></h2>
          <div className="process-track">
            {content.process.steps.map((step) => (
              <div key={step.number} className="process-step">
                <div className="ps-num">{step.number}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ind-section fade-up visible">
          <div className="sec-label">{content.industries.eyebrow}</div>
          <h2>{content.industries.heading}</h2>
          <p>{content.industries.description}</p>
          <div className="ind-grid">
            {content.industries.items.map((industry) => (
              <span key={industry} className="ind-pill">{industry}</span>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-kicker">{content.finalCta.kicker}</div>
          <h2>{content.finalCta.heading}<br /><em>{content.finalCta.highlightedText}</em></h2>
          <p>{content.finalCta.description}</p>
          <div className="cta-buttons">
            {content.finalCta.actions.map((action, index) => (
              <PortfolioAction key={`${action.href}-${action.text}`} action={action} variant={index === 0 ? "primary" : "secondary"} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
