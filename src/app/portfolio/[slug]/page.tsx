import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, CircleCheck, Database, Layers3, LockKeyhole, MessageCircle, MousePointer2, Settings2, Sparkles } from "lucide-react";
import { StructuredDataScripts } from "@/components/PageStructuredData";
import ProjectModules from "./ProjectModules";
import { getPortfolioProjectBySlug } from "@/lib/portfolioProjects.service";
import type { PortfolioProject, PortfolioProjectAction } from "@/types/portfolio";
import "./project.css";

type PageProps = { params: Promise<{ slug: string }> };
export const revalidate = 3600;

export type ProjectPageContext = { label: string; href: string; routePrefix: string };

const portfolioContext: ProjectPageContext = { label: "Portfolio", href: "/portfolio", routePrefix: "/portfolio" };

function pageUrl(slug: string, context: ProjectPageContext) {
  return `https://yueinfotech.com${context.routePrefix}/${slug}`;
}

export function getProjectMetadata(project: PortfolioProject | null, context: ProjectPageContext): Metadata {
  if (!project) return { title: "Product Not Found" };
  const title = project.seo?.title || `${project.hero.title} | Yue Infotech`;
  const description = project.seo?.description || project.hero.description;
  const canonical = context.routePrefix === "/products" ? pageUrl(project.slug, context) : project.seo?.canonicalUrl || pageUrl(project.slug, context);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { type: "website", title, description, url: canonical, siteName: "Yue Infotech", images: [{ url: project.hero.image, alt: project.hero.imageAlt }] },
    twitter: { card: "summary_large_image", title, description, images: [project.hero.image] },
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return getProjectMetadata(await getPortfolioProjectBySlug(slug), portfolioContext);
}

function ProjectAction({ action }: { action: PortfolioProjectAction }) {
  const primary = action.variant !== "secondary";
  return (
    <Link href={action.href} className={primary ? "project-button project-button-primary" : "project-button project-button-secondary"}>
      {action.label}<ArrowRight aria-hidden="true" />
    </Link>
  );
}

function ProjectTitle({ title, highlight }: { title: string; highlight?: string }) {
  return <h2>{title}{highlight && <> <span>{highlight}</span></>}</h2>;
}

function DetailIcon({ value }: { value?: string }) {
  const icons: Record<string, React.ReactNode> = {
    settings: <Settings2 />, database: <Database />, layers: <Layers3 />, lock: <LockKeyhole />, message: <MessageCircle />, sparkles: <Sparkles />,
  };
  return <span className="project-detail-icon">{icons[value ?? ""] ?? <CircleCheck />}</span>;
}

function ProjectStructuredData({ project, context }: { project: PortfolioProject; context: ProjectPageContext }) {
  const page = pageUrl(project.slug, context);
  const graphs = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${page}#application`,
      name: project.hero.title,
      description: project.seo?.description || project.hero.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      image: project.hero.image,
      provider: { "@type": "Organization", name: "Yue Infotech", url: "https://yueinfotech.com" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://yueinfotech.com" },
        { "@type": "ListItem", position: 2, name: context.label, item: `https://yueinfotech.com${context.href}` },
        { "@type": "ListItem", position: 3, name: project.hero.title, item: page },
      ],
    },
    project.faqs.items.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: project.faqs.items.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    } : null,
  ].filter(Boolean) as Record<string, unknown>[];

  return <StructuredDataScripts items={graphs} />;
}

export function ProjectDetail({ project, context }: { project: PortfolioProject; context: ProjectPageContext }) {
  return (
    <>
      <ProjectStructuredData project={project} context={context} />
      <main className="project-detail">
        <section className="project-hero">
          <div className="project-orbit project-orbit-one" /><div className="project-orbit project-orbit-two" />
          <div className="project-shell project-hero-grid">
            <div className="project-hero-copy">
              <nav aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight aria-hidden="true" /><Link href={context.href}>{context.label}</Link><ChevronRight aria-hidden="true" /><span>{project.hero.title}</span></nav>
              <p className="project-kicker"><i />{project.hero.eyebrow}</p>
              <h1>{project.hero.title}{project.hero.highlightedTitle && <><br /><span>{project.hero.highlightedTitle}</span></>}</h1>
              <p className="project-hero-description">{project.hero.description}</p>
              <div className="project-actions">{project.hero.actions.map((action) => <ProjectAction key={`${action.label}-${action.href}`} action={action} />)}</div>
              {project.hero.proofItems?.length ? <ul className="project-proof">{project.hero.proofItems.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul> : null}
            </div>
            <div className="project-hero-visual">
              <div className="project-browser"><div className="project-browser-bar"><i></i><i></i><i></i><span>{project.hero.browserLabel || project.hero.title}</span></div><Image src={project.hero.image} alt={project.hero.imageAlt} width={1536} height={720} priority sizes="(max-width: 1024px) 100vw, 50vw" /></div>
              {project.hero.stats.slice(0, 2).map((stat, index) => <div key={stat.label} className={`project-float-stat project-float-stat-${index + 1}`}><small>{stat.label}</small><strong>{stat.value}</strong></div>)}
            </div>
          </div>
        </section>

        <section className="project-metrics"><div className="project-shell">{project.hero.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></section>

        <section className="project-section project-overview"><div className="project-shell">
          <header className="project-section-heading"><p>{project.overview.eyebrow}</p><ProjectTitle title={project.overview.title} highlight={project.overview.highlightedTitle} /><div>{project.overview.description}</div></header>
          <div className="project-benefit-grid">{project.overview.benefits.map((benefit) => <article key={benefit.title}><DetailIcon value={benefit.icon} /><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}</div>
        </div></section>

        <section className="project-section project-modules"><div className="project-shell"><header className="project-section-heading centered"><p>{project.modules.eyebrow}</p><ProjectTitle title={project.modules.title} highlight={project.modules.highlightedTitle} /><div>{project.modules.description}</div></header><ProjectModules items={project.modules.items} browserLabel={project.hero.browserLabel || project.hero.title} /></div></section>

        <section className="project-section project-workflow"><div className="project-shell"><header className="project-section-heading centered"><p>{project.workflow.eyebrow}</p><ProjectTitle title={project.workflow.title} /><div>{project.workflow.description}</div></header><ol>{project.workflow.steps.map((step, index) => <li key={step.title}><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></div></section>

        {project.details && <section className="project-section project-details"><div className="project-shell"><header className="project-section-heading"><p>{project.details.eyebrow}</p><ProjectTitle title={project.details.title} highlight={project.details.highlightedTitle} />{project.details.description && <div>{project.details.description}</div>}</header><div className="project-detail-grid">{project.details.items.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p>{item.bullets?.length ? <ul>{item.bullets.map((bullet) => <li key={bullet}><Check aria-hidden="true" />{bullet}</li>)}</ul> : null}</article>)}</div></div></section>}

        <section className="project-section project-tech"><div className="project-shell"><header className="project-section-heading centered"><p>{project.technology.eyebrow}</p><ProjectTitle title={project.technology.title} highlight={project.technology.highlightedTitle} /><div>{project.technology.description}</div></header><div className="project-tech-grid">{project.technology.items.map((item) => <article key={item.title}><DetailIcon value={item.icon} /><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>{project.technology.callout && <aside><MousePointer2 aria-hidden="true" /><p>{project.technology.callout.description}</p><ProjectAction action={project.technology.callout.action} /></aside>}</div></section>

        <section className="project-section project-options"><div className="project-shell"><header className="project-section-heading centered"><p>{project.options.eyebrow}</p><ProjectTitle title={project.options.title} /><div>{project.options.description}</div></header><div className="project-option-grid">{project.options.items.map((option) => <article key={option.title} className={option.featured ? "is-featured" : ""}>{option.badge && <b>{option.badge}</b>}<DetailIcon value={option.icon} /><h3>{option.title}</h3><p>{option.description}</p><ul>{option.features.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul><ProjectAction action={option.action} /></article>)}</div>{project.options.footnote && <p className="project-options-note">{project.options.footnote}</p>}</div></section>

        <section className="project-section project-faqs"><div className="project-shell"><header className="project-section-heading centered"><p>{project.faqs.eyebrow}</p><ProjectTitle title={project.faqs.title} /><div>{project.faqs.description}</div></header><div className="project-faq-list">{project.faqs.items.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

        <section className="project-final-cta" id="project-contact"><div className="project-shell"><p>{project.finalCta.eyebrow}</p><h2>{project.finalCta.title}</h2><div>{project.finalCta.description}</div><div className="project-actions">{project.finalCta.actions.map((action) => <ProjectAction key={`${action.label}-${action.href}`} action={action} />)}</div></div></section>
      </main>
    </>
  );
}

export default async function PortfolioProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} context={portfolioContext} />;
}
