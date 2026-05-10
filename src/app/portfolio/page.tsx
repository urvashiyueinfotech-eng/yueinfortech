import type { Metadata } from "next";
import Link from "next/link";
import { Search, Globe, PenTool, Megaphone, MapPin, BarChart } from "lucide-react";
import PortfolioClient from "./PortfolioClient";
import { getPageMetadata } from "@/lib/pageSeo.service";
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

export default function PortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.yueinfotech.com/case-studies#page",
        name: "Yue Infotech Case Studies & Portfolio",
        description: "A collection of real client results across SEO, AI visibility, web design, digital marketing, and content strategy delivered by Yue Infotech.",
        url: "https://www.yueinfotech.com/case-studies",
        publisher: {
          "@type": "Organization",
          name: "Yue Infotech",
          "@id": "https://www.yueinfotech.com/#organization",
          url: "https://www.yueinfotech.com",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.yueinfotech.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Case Studies",
            item: "https://www.yueinfotech.com/case-studies",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="portfolio-page-main min-h-screen bg-[#F8F9FF] text-[#1E1B4B] font-sans">
        
        {/* ━━━━━━━━━━ HERO — DARK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="hero">
          <div className="hero-dots"></div>
          <div className="hero-glow"></div>
          <div className="hero-inner">
            <div className="hero-bc">
              <Link href="/">Home</Link> / Our Work
            </div>
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>Portfolio & Case Studies
            </div>
            <h1>Our Work.<br />Real Clients.<br /><em>Real Results.</em></h1>
            <p className="hero-sub">Strategy, design, SEO, AI visibility, content, and performance marketing — documented by the numbers. Every project below shows exactly what we did and what changed.</p>
            <div className="hero-stats">
              <div><div className="hs-num">50+</div><div className="hs-label">Projects Delivered</div></div>
              <div><div className="hs-num">15+</div><div className="hs-label">Industries Served</div></div>
              <div><div className="hs-num">3×</div><div className="hs-label">Avg. Traffic Growth</div></div>
              <div><div className="hs-num">8+</div><div className="hs-label">Years · Est. 2018</div></div>
            </div>
            <div className="hero-ctas">
              <Link href="/contact-us" className="btn-p">Start Your Project →</Link>
              <a href="#case-studies" className="btn-s">View All Work ↓</a>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━ INTERACTIVE CLIENT FILTER & GRID ━━━━━━━━━━━━━━ */}
        <PortfolioClient />

        {/* ━━━━━━━━━━ METRICS STRIP — ★ DARK HIGHLIGHTED ━━━━━━━━━━━━━ */}
        <div className="metrics-strip fade-up visible">
          <div className="metric-cell">
            <div className="metric-num">50+</div>
            <div className="metric-label">Projects Delivered</div>
          </div>
          <div className="metric-cell">
            <div className="metric-num">15+</div>
            <div className="metric-label">Industries Served</div>
          </div>
          <div className="metric-cell">
            <div className="metric-num">3×</div>
            <div className="metric-label">Avg. Traffic Growth</div>
          </div>
          <div className="metric-cell">
            <div className="metric-num">8+</div>
            <div className="metric-label">Years · Est. 2018</div>
          </div>
        </div>

        {/* ━━━━━━━━━━ WHAT WE DELIVER — ★ DARK HIGHLIGHTED ━━━━━━━━━━━ */}
        <section className="deliver-section fade-up visible">
          <div className="sec-label">What We Deliver</div>
          <h2>The Work Behind<br /><em>Every Result</em></h2>
          <p className="sec-sub">Six service areas — each built for measurable outcomes, not deliverables for their own sake.</p>
          <div className="deliver-grid">
            <div className="deliver-item">
              <div className="deliver-icon"><Search className="h-6 w-6 text-[#7B72EE]" /></div>
              <h3>SEO & AI Visibility</h3>
              <p>Technical SEO, content clusters, schema markup, and LLM optimization — built to rank on Google and get cited by ChatGPT, Gemini, and AI Overviews.</p>
            </div>
            <div className="deliver-item">
              <div className="deliver-icon"><Globe className="h-6 w-6 text-[#7B72EE]" /></div>
              <h3>Web Design & Development</h3>
              <p>Custom, high-performance websites engineered for speed, Core Web Vitals, mobile experience, and conversion — not just aesthetics.</p>
            </div>
            <div className="deliver-item">
              <div className="deliver-icon"><PenTool className="h-6 w-6 text-[#7B72EE]" /></div>
              <h3>Content Strategy</h3>
              <p>Authority-driven content built for search intent, reader engagement, and AI citation — from landing pages to pillar blogs to GEO-based local content.</p>
            </div>
            <div className="deliver-item">
              <div className="deliver-icon"><Megaphone className="h-6 w-6 text-[#7B72EE]" /></div>
              <h3>Digital Marketing & Ads</h3>
              <p>Performance campaigns across Meta, LinkedIn, and Google — structured for ROAS, not vanity metrics. Creative, targeting, and landing pages all in-house.</p>
            </div>
            <div className="deliver-item">
              <div className="deliver-icon"><MapPin className="h-6 w-6 text-[#7B72EE]" /></div>
              <h3>Local Business Optimization</h3>
              <p>Google Business Profile, local citations, map pack strategy, and location-specific landing pages — for businesses competing where they operate.</p>
            </div>
            <div className="deliver-item">
              <div className="deliver-icon"><BarChart className="h-6 w-6 text-[#7B72EE]" /></div>
              <h3>Analytics & Reporting</h3>
              <p>GA4, Google Search Console, AI visibility tracking — monthly reporting in plain language with clear next steps, not just dashboards of numbers.</p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━ PROCESS — LIGHT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="process-section fade-up visible">
          <div className="sec-label">How We Work</div>
          <h2>A Process That <span>Builds Results</span></h2>
          <div className="process-track">
            <div className="process-step">
              <div className="ps-num">01</div>
              <h4>Discovery & Audit</h4>
              <p>We audit your current position — SEO, AI visibility, content, and competitors — before recommending anything.</p>
            </div>
            <div className="process-step">
              <div className="ps-num">02</div>
              <h4>Strategy & Roadmap</h4>
              <p>A documented plan: platforms, priorities, keyword targets, content structure, and KPIs — reviewed before execution.</p>
            </div>
            <div className="process-step">
              <div className="ps-num">03</div>
              <h4>Execution</h4>
              <p>We build, publish, and optimise — content, schema, ads, pages, or code — with structured delivery at each milestone.</p>
            </div>
            <div className="process-step">
              <div className="ps-num">04</div>
              <h4>Measure & Optimise</h4>
              <p>Monthly reporting with honest data, clear action items, and continuous improvement — not one-time deliveries.</p>
            </div>
            <div className="process-step">
              <div className="ps-num">05</div>
              <h4>Scale</h4>
              <p>Once the system works, we expand — more keywords, more locations, more platforms — compounding what's already winning.</p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━ INDUSTRIES — ★ DARK HIGHLIGHTED ━━━━━━━━━━━━━━━━ */}
        <section className="ind-section fade-up visible">
          <div className="sec-label">Sectors We've Worked In</div>
          <h2>15+ Industries Served</h2>
          <p>From local businesses to global brands — across every sector that needs digital growth.</p>
          <div className="ind-grid">
            <span className="ind-pill">Real Estate</span>
            <span className="ind-pill">Travel & Tourism</span>
            <span className="ind-pill">Education & EdTech</span>
            <span className="ind-pill">Technology & SaaS</span>
            <span className="ind-pill">E-commerce & Retail</span>
            <span className="ind-pill">Professional Services</span>
            <span className="ind-pill">Healthcare & Wellness</span>
            <span className="ind-pill">Finance & Fintech</span>
            <span className="ind-pill">Creative & Design</span>
            <span className="ind-pill">Hospitality</span>
            <span className="ind-pill">B2B Enterprises</span>
            <span className="ind-pill">Local Businesses</span>
            <span className="ind-pill">Startups</span>
            <span className="ind-pill">3D & Visualisation</span>
            <span className="ind-pill">Networking & IT</span>
          </div>
        </section>

        {/* ━━━━━━━━━━ FINAL CTA — DARK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="cta-section">
          <div className="cta-kicker">Your business is next</div>
          <h2>Let's Build Results<br />Worth <em>Documenting.</em></h2>
          <p>Book a free consultation — we'll audit your current position and show you exactly what your business needs to grow. No templates. No guesswork.</p>
          <div className="cta-buttons">
            <Link href="/contact-us" className="btn-p">Book Free Consultation →</Link>
            <Link href="/contact-us#quote" className="btn-s">Get a Custom Quote</Link>
          </div>
        </section>

      </main>
    </>
  );
}
