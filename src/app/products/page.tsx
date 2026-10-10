import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2, CheckCircle2, Dumbbell, HeartPulse, Mail, MessageCircle, Phone, Rocket, Sparkles, UtensilsCrossed, Wrench, Zap } from "lucide-react";
import CustomSolutionPopup from "@/components/CustomSolutionPopup";
import FaqSection from "@/components/FaqSection";
import type { FaqItemType } from "@/components/faq.types";
import { getProductCards } from "@/lib/portfolioProjects.service";
import "./products.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Products | Business Software by Yue Infotech",
  description: "Explore customisable business software products by Yue Infotech, built for service businesses across APAC and MEA.",
  alternates: { canonical: "https://yueinfotech.com/products" },
};

const productFaqs: FaqItemType[] = [
  { id: "right-path", question: "Which path is right for my business?", answer: "If your needs closely match one of our existing products, using it as standard is the fastest and most cost-effective route. If you need specific workflows or modules, customization gives you a tailored fit without starting from zero. If your requirements are genuinely unique, a custom build is the right answer. We help you identify the right path during the first call." },
  { id: "go-live", question: "How long does it take to go live?", answer: "Standard product deployments can be live within a few days of scoping and configuration. Customization projects vary by scope — from a few weeks to a couple of months. Custom builds are scoped individually, and the timeline is agreed during the proposal phase so you have clear expectations before committing." },
  { id: "demo", question: "Can I see a live demo before committing?", answer: "Yes. We run private demos for qualified businesses. You see the actual product — not a slide deck — and can ask questions specific to your operations. Book a free demo through this page and we'll arrange a session at a time that suits you." },
  { id: "confidential", question: "Is my business information kept confidential?", answer: "All consultations are private by default. If you need a formal NDA before sharing operational details, we provide one on request — before any detailed discussion takes place." },
  { id: "delivery", question: "What happens after the system is delivered?", answer: "Every delivery includes a structured handover, user documentation, and a training session for your team. Ongoing support arrangements — maintenance, enhancements, hosting — are scoped based on what your business needs after go-live." },
  { id: "multi-location", question: "Do you support multi-location businesses?", answer: "Yes. Our gym and restaurant products are built with multi-location support as a core feature, with centralized reporting and location-level management. For cleaning and custom builds, multi-location architecture is scoped based on your operational structure." },
  { id: "other-industries", question: "What if my industry isn't listed?", answer: "Our custom build capability covers any operations-driven industry. If no existing product fits, we scope a custom system built precisely around your business. Many of our best engagements start with \"we haven't seen software that actually handles what we do.\"" },
];

export default async function ProductsPage() {
  const products = await getProductCards();

  return (
    <main className="products-page">
      <section className="products-hero">
        <div className="products-hero-grid" aria-hidden="true" />
        <div className="products-shell products-hero-content">
          <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Products</span></nav>
          <div className="products-hero-main">
            <p className="products-kicker"><Rocket aria-hidden="true" />Software That Works Like Your Business</p>
            <h1>Business Software That&apos;s<br /><span>Ready When You Are</span></h1>
            <p>Deploy a proven product today. Customize it to your workflow. Or build exactly what your business needs from the ground up. Three paths. One team.</p>
          </div>
          <div className="hero-paths" aria-label="Three ways to work with Yue Infotech">
            <div><span><Zap aria-hidden="true" /></span><small>Path 01</small><strong>Use a Product</strong><p>Deploy a ready-made system built for your industry. Live in days, not months.</p></div>
            <div><span><Wrench aria-hidden="true" /></span><small>Path 02</small><strong>Customize It</strong><p>Take an existing product and mould it around how your team actually works.</p></div>
            <div><span><Building2 aria-hidden="true" /></span><small>Path 03</small><strong>Build Custom</strong><p>We scope, design, and build your system from scratch — precisely how you need it.</p></div>
          </div>
          <div className="products-hero-actions">
            <a href="#products">Explore All Products <ArrowUpRight aria-hidden="true" /></a>
            <Link href="/contact-us">Talk to an Expert</Link>
          </div>
        </div>
      </section>

      <div className="products-trust" aria-label="Product capabilities">
        <div className="products-trust-track">
          {[
            "Cleaning Business Software", "Gym Management Systems", "Restaurant CRM", "Custom Enterprise Builds", "APAC & MEA Markets", "Cloud-Ready Infrastructure", "Secure & Scalable Systems",
          ].map((item) => <span key={item}><Sparkles aria-hidden="true" />{item}</span>)}
        </div>
      </div>

      <section className="products-stats">
        <div className="products-shell">
          <div className="products-stats-grid">
            <div><strong>15+</strong><span>Ready-to-Deploy Products &amp; Modules</span></div>
            <div><strong>APAC</strong><span>Primary Market Focus</span></div>
            <div><strong>100%</strong><span>Custom Build Capability</span></div>
            <div><strong>NDA</strong><span>Confidentiality on Request</span></div>
          </div>
          <div className="products-stats-cta"><p>Still managing operations through spreadsheets? See what the right software looks like for your industry.</p><CustomSolutionPopup source="products-page-demo-cta" context={{ page: "products", route: "/products", section: "stats", trigger: "book-a-demo" }} trigger={<button type="button">Book a Demo <ArrowUpRight aria-hidden="true" /></button>} /></div>
        </div>
      </section>

      <section className="products-listing" id="products">
        <div className="products-shell">
          <header className="products-heading"><p>Our Products</p><h2>Purpose-Built Software for<br /><span>Operations-Heavy Businesses</span></h2><span>Each product is production-ready and already running for businesses in your industry. Use it as-is, or tell us what needs to change.</span></header>
          {products.length ? <div className="products-grid">
            {products.map((product) => <article key={product.id} className="product-card">
              <div className="product-card-top"><span>{product.tag}</span><small>{product.number}</small></div>
              <p className="product-industry">{product.industry}</p>
              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-services">{product.services.map((service) => <span key={service}>{service}</span>)}</div>
              <div className="product-results">{product.results.map((result) => <div key={`${result.value}-${result.label}`}><strong>{result.value}</strong><span>{result.label}</span></div>)}</div>
              <Link href={`/products/${product.slug}`} className="product-link">Explore product <ArrowUpRight aria-hidden="true" /></Link>
            </article>)}
          </div> : <div className="products-empty"><CheckCircle2 aria-hidden="true" /><p>Products will appear here soon.</p></div>}
        </div>
      </section>

      <section className="products-pathways" id="paths">
        <div className="products-shell">
          <header className="products-heading"><p>How We Work Together</p><h2>Three Ways to Get the<br /><span>Right System for Your Business</span></h2><span>Not every business fits the same mould. Choose the path that matches where you are — and what you need next.</span></header>
          <div className="pathways-grid">
            <article><small>01</small><b><Zap aria-hidden="true" /></b><h3>Use as Standard</h3><p>Get a fully built, industry-tested product and go live without a long setup process. Ideal if you need a solid system running now.</p><ul><li>Deployed in days, not months</li><li>Battle-tested for your industry</li><li>Structured onboarding included</li><li>Ongoing support available</li></ul><Link href="/contact-us">Get Started <ArrowUpRight aria-hidden="true" /></Link></article>
            <article className="pathway-featured"><small>02</small><b><Wrench aria-hidden="true" /></b><h3>Customize to Your Workflow</h3><p>Start with a proven product and reshape it around the way your team works. New modules, adjusted flows, or deeper integrations — we scope it together.</p><ul><li>Workflow-matched configuration</li><li>Additional modules built to spec</li><li>Private consultation to scope changes</li><li>NDA available on request</li></ul><Link href="/contact-us">Discuss Customization <ArrowUpRight aria-hidden="true" /></Link></article>
            <article><small>03</small><b><Building2 aria-hidden="true" /></b><h3>Build From Scratch</h3><p>Your business has specific requirements no off-the-shelf system can handle. We design, architect, and build the entire system — precisely as you need it.</p><ul><li>Full requirements scoping session</li><li>Architecture designed around your ops</li><li>Scalable infrastructure from day one</li><li>Full handover and documentation</li></ul><Link href="/contact-us">Start a Conversation <ArrowUpRight aria-hidden="true" /></Link></article>
          </div>
        </div>
      </section>

      <section className="products-process" id="process">
        <div className="products-shell">
          <header className="products-heading"><p>Our Process</p><h2>From First Call to<br /><span>Live System in Four Steps</span></h2><span>A clear, structured process so you always know what&apos;s happening and what comes next.</span></header>
          <div className="process-grid">
            <article><small>01</small><h3>Discovery Call</h3><p>We learn your operations, bottlenecks, and goals. No sales pitch — a real conversation about what you actually need.</p></article>
            <article><small>02</small><h3>Scoped Proposal</h3><p>You receive a clear breakdown: recommended path, timeline, deliverables, and what success looks like.</p></article>
            <article><small>03</small><h3>Build &amp; Configure</h3><p>We set up, configure, or build your system with regular check-ins so you can review progress as it happens.</p></article>
            <article><small>04</small><h3>Go Live + Support</h3><p>A structured handover with training, documentation, and ongoing support so your team is confident from day one.</p></article>
          </div>
        </div>
      </section>

      <section className="products-industries">
        <div className="products-shell">
          <header className="products-heading"><p>Industries We Serve</p><h2>Built for Businesses That<br /><span>Run on Operations</span></h2><span>Our products are designed for businesses where every missed booking, lost member, or absent staff creates a direct operational cost.</span></header>
          <div className="industries-grid">
            <article><b><Sparkles aria-hidden="true" /></b><h3>Cleaning Services</h3><p>Residential and commercial cleaning businesses operating across multiple staff, zones, and clients — where scheduling and customer management are daily challenges.</p><Link href="/products/yue-cleaning-crm">See Cleaning CRM <ArrowUpRight aria-hidden="true" /></Link></article>
            <article><b><Dumbbell aria-hidden="true" /></b><h3>Gyms &amp; Fitness Centres</h3><p>Single-location and multi-branch fitness businesses that need member management, attendance tracking, and plan renewals handled automatically.</p><Link href="/products/yue-gym-crm">See Gym Software <ArrowUpRight aria-hidden="true" /></Link></article>
            <article><b><UtensilsCrossed aria-hidden="true" /></b><h3>Restaurants &amp; Food Service</h3><p>Restaurant groups and QSR chains that want to convert first-time diners into repeat visitors through CRM, loyalty, and targeted campaigns.</p><Link href="/products/yue-restaurant-crm">See Restaurant CRM <ArrowUpRight aria-hidden="true" /></Link></article>
            <article><b><Building2 aria-hidden="true" /></b><h3>Facilities Management</h3><p>Facilities and property management businesses that need task assignment, vendor management, and asset tracking in one system.</p><Link href="/contact-us">Discuss Your Requirements <ArrowUpRight aria-hidden="true" /></Link></article>
            <article><b><Sparkles aria-hidden="true" /></b><h3>Retail &amp; E-Commerce</h3><p>Retail operations that want a centralized customer intelligence layer — purchase history, segment targeting, and loyalty rewards.</p><Link href="/contact-us">Discuss Your Requirements <ArrowUpRight aria-hidden="true" /></Link></article>
            <article><b><HeartPulse aria-hidden="true" /></b><h3>Healthcare &amp; Wellness</h3><p>Clinics, wellness centres, and allied health businesses that need appointment management, patient records, and billing in one platform.</p><Link href="/contact-us">Discuss Your Requirements <ArrowUpRight aria-hidden="true" /></Link></article>
          </div>
        </div>
      </section>

      <div className="products-faq" id="faq"><FaqSection faqs={productFaqs} eyebrow="Common Questions" title={<>Everything You Need to Know<br />Before You Decide</>} subtitle="Straight answers to the questions we hear most often." sectionClassName="!py-28" containerClassName="products-faq-shell" titleClassName="products-faq-title" subtitleClassName="products-faq-subtitle" /></div>

      <section className="products-cta" id="contact">
        <div className="products-shell products-cta-inner">
          <p className="products-kicker"><MessageCircle aria-hidden="true" />Start the Conversation</p>
          <h2>Ready to Replace Your<br /><span>Spreadsheets and Manual Processes?</span></h2>
          <p>Book a free 30-minute call. We&apos;ll discuss your operations, show you the relevant product, and tell you exactly which path makes sense — with no obligation and no sales pressure.</p>
          <div><a href="https://wa.me/918859366292" target="_blank" rel="noopener"><MessageCircle aria-hidden="true" />Chat on WhatsApp</a><a href="mailto:sales@yueinfotech.com"><Mail aria-hidden="true" />Email Us Directly</a></div>
          <ul><li><Phone aria-hidden="true" /> <span>+91 88593 66292</span></li><li><Mail aria-hidden="true" /> <span>sales@yueinfotech.com</span></li><li><CheckCircle2 aria-hidden="true" /> <span>NDA available on request</span></li></ul>
        </div>
      </section>
    </main>
  );
}
