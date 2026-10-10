import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getProductCards } from "@/lib/portfolioProjects.service";
import "./products.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Products | Business Software by Yue Infotech",
  description: "Explore customisable business software products by Yue Infotech, built for service businesses across APAC and MEA.",
  alternates: { canonical: "https://yueinfotech.com/products" },
};

export default async function ProductsPage() {
  const products = await getProductCards();

  return (
    <main className="products-page">
      <section className="products-hero">
        <div className="products-hero-grid" aria-hidden="true" />
        <div className="products-shell products-hero-content">
          <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Products</span></nav>
          <p className="products-kicker"><i />Yue Infotech Products</p>
          <h1>Business software that<br /><span>grows with you.</span></h1>
          <p>Explore customisable platforms built around the workflows, teams, and growth plans of modern service businesses.</p>
        </div>
      </section>

      <section className="products-listing">
        <div className="products-shell">
          <header className="products-heading"><p>Our Products</p><h2>Built for the way your<br /><span>business actually works.</span></h2></header>
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
    </main>
  );
}
