"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioCaseStudy, PortfolioFilter } from "@/types/portfolio";
import "./portfolio.css";

type PortfolioClientProps = {
  filters: PortfolioFilter[];
  caseStudies: PortfolioCaseStudy[];
};

export default function PortfolioClient({ filters, caseStudies }: PortfolioClientProps) {
  const [filter, setFilter] = useState(filters[0]?.value ?? "all");

  const show = (category: string) => filter === "all" || category.split(/\s+/).includes(filter);

  return (
    <>
      <div className="filter-bar" id="case-studies">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`filter-btn ${filter === item.value ? "active" : ""}`}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="cs-section fade-up visible" aria-label="Case studies">
        <div className="cs-grid" id="cs-grid">
          {caseStudies.map((item) => (
            <article
              key={item.id}
              className={`cs-card fade-up visible ${item.featured ? "featured" : ""}`}
              style={{ display: show(item.category) ? "flex" : "none" }}
            >
              <div className="cs-card-top">
                <span className={`cs-tag ${item.tagTone === "green" ? "alt" : ""}`}>{item.tag}</span>
                <span className="cs-num">{item.number}</span>
              </div>
              <div className="cs-industry">{item.industry}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="cs-services">
                {item.services.map((service) => (
                  <span key={service} className="cs-svc">{service}</span>
                ))}
              </div>
              <div className="cs-results">
                {item.results.map((result) => (
                  <div key={`${result.value}-${result.label}`}>
                    <div className={`cs-result-num ${result.tone === "green" ? "green" : ""}`}>{result.value}</div>
                    <div className="cs-result-label">{result.label}</div>
                  </div>
                ))}
              </div>
              <span className="cs-arrow" aria-hidden="true">
                <ArrowUpRight className="h-4 w-4" strokeWidth={3} />
              </span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
