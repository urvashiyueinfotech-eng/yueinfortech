"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import "./portfolio.css";

export default function PortfolioClient() {
  const [filter, setFilter] = useState("all");

  const show = (cat: string) => filter === "all" || cat.includes(filter);

  return (
    <>
      {/* ━━━━━━━━━━ FILTER BAR — LIGHT / STICKY ━━━━━━━━━━━━━━━━━━━━ */}
      <div className="filter-bar" id="case-studies">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All Work</button>
        <button className={`filter-btn ${filter === "seo" ? "active" : ""}`} onClick={() => setFilter("seo")}>SEO & AI Visibility</button>
        <button className={`filter-btn ${filter === "web" ? "active" : ""}`} onClick={() => setFilter("web")}>Web Design & Dev</button>
        <button className={`filter-btn ${filter === "content" ? "active" : ""}`} onClick={() => setFilter("content")}>Content Strategy</button>
        <button className={`filter-btn ${filter === "marketing" ? "active" : ""}`} onClick={() => setFilter("marketing")}>Digital Marketing</button>
      </div>

      {/* ━━━━━━━━━━ CASE STUDIES GRID — LIGHT ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="cs-section fade-up visible">
        <div className="cs-grid" id="cs-grid">

          {/* CARD 01: Featured — Real Estate */}
          <div className="cs-card featured" style={{ display: show("seo") ? "flex" : "none" }}>
            <div className="cs-card-top">
              <span className="cs-tag">SEO + AI Visibility</span>
              <span className="cs-num">01</span>
            </div>
            <div className="cs-industry">Real Estate Investment · USA</div>
            <h3>From Local Presence to National AI Authority</h3>
            <p>A vertically integrated US real estate investment firm needed to expand beyond its local Texas market. We built a full SEO and AI visibility system — keyword architecture, schema, location pages, and LLM-optimized content — generating citations across ChatGPT, Google AI Mode, and Gemini.</p>
            <div className="cs-services">
              <span className="cs-svc">Technical SEO Audit</span>
              <span className="cs-svc">Keyword Strategy</span>
              <span className="cs-svc">Location Pages</span>
              <span className="cs-svc">Schema Markup</span>
              <span className="cs-svc">AI Content Optimization</span>
              <span className="cs-svc">GEO-Based Blogs</span>
            </div>
            <div className="cs-results">
              <div><div className="cs-result-num">12</div><div className="cs-result-label">AI Visibility Score</div></div>
              <div><div className="cs-result-num green">10</div><div className="cs-result-label">AI Platform Mentions</div></div>
              <div><div className="cs-result-num">+22%</div><div className="cs-result-label">Organic Keyword Growth</div></div>
              <div><div className="cs-result-num green">40+</div><div className="cs-result-label">Referring Domains</div></div>
            </div>
            <span className="cs-arrow"><ArrowUpRight className="h-4 w-4" strokeWidth={3} /></span>
          </div>

          {/* CARD 02: Travel & Tourism */}
          <div className="cs-card fade-up visible" style={{ display: show("seo") ? "flex" : "none" }}>
            <div className="cs-card-top">
              <span className="cs-tag">SEO & Content</span>
              <span className="cs-num">02</span>
            </div>
            <div className="cs-industry">Travel & Tourism</div>
            <h3>2× Organic Clicks in 6 Months</h3>
            <p>A travel brand with strong destination content but poor keyword structure and internal linking. We rebuilt the content architecture, added intent-matched clusters, and optimised for featured snippets — doubling organic click volume.</p>
            <div className="cs-services">
              <span className="cs-svc">Content Optimization</span>
              <span className="cs-svc">Keyword Strategy</span>
              <span className="cs-svc">Internal Linking</span>
              <span className="cs-svc">Featured Snippet Targeting</span>
            </div>
            <div className="cs-results">
              <div><div className="cs-result-num">9.22K</div><div className="cs-result-label">Clicks (from 4.23K)</div></div>
              <div><div className="cs-result-num green">555K</div><div className="cs-result-label">Impressions (from 225K)</div></div>
              <div><div className="cs-result-num">+118%</div><div className="cs-result-label">Click Growth</div></div>
            </div>
            <span className="cs-arrow"><ArrowUpRight className="h-4 w-4" strokeWidth={3} /></span>
          </div>

          {/* CARD 03: Education */}
          <div className="cs-card fade-up visible" style={{ display: show("seo content") ? "flex" : "none" }}>
            <div className="cs-card-top">
              <span className="cs-tag">Compounding SEO</span>
              <span className="cs-num">03</span>
            </div>
            <div className="cs-industry">Education & EdTech</div>
            <h3>Avg Position 18.4 → 8.1</h3>
            <p>An education platform struggling on page two. We built a compounding authority strategy — topic clusters, backlink seeding, and schema-dense landing pages — that moved average position from 18.4 to 8.1 and scaled impressions nearly 4× in 3 months.</p>
            <div className="cs-services">
              <span className="cs-svc">Authority Building</span>
              <span className="cs-svc">Topic Clusters</span>
              <span className="cs-svc">Backlink Strategy</span>
              <span className="cs-svc">Schema Markup</span>
            </div>
            <div className="cs-results">
              <div><div className="cs-result-num">3.56K</div><div className="cs-result-label">Clicks (from 900)</div></div>
              <div><div className="cs-result-num green">601K</div><div className="cs-result-label">Impressions (from 168K)</div></div>
              <div><div className="cs-result-num">8.1</div><div className="cs-result-label">Avg Position (from 18.4)</div></div>
            </div>
            <span className="cs-arrow"><ArrowUpRight className="h-4 w-4" strokeWidth={3} /></span>
          </div>

          {/* CARD 04: Technology AI Citations */}
          <div className="cs-card fade-up visible" style={{ display: show("seo") ? "flex" : "none" }}>
            <div className="cs-card-top">
              <span className="cs-tag alt">AI Citations</span>
              <span className="cs-num">04</span>
            </div>
            <div className="cs-industry">Technology & Networking</div>
            <h3>ChatGPT Citations on 18 Pages</h3>
            <p>A tech brand with 19 years of domain age but zero AI search presence. We deployed location pages, GEO-based blogs, and AI-optimised content — resulting in ChatGPT citing 18 pages, 24 Google AI Overview mentions, 26 Perplexity references, and 16 Gemini citations.</p>
            <div className="cs-services">
              <span className="cs-svc">GEO-Based Blogs</span>
              <span className="cs-svc">Location Pages</span>
              <span className="cs-svc">AI Content Optimization</span>
              <span className="cs-svc">Schema Integration</span>
            </div>
            <div className="cs-results">
              <div><div className="cs-result-num">116</div><div className="cs-result-label">ChatGPT Citations</div></div>
              <div><div className="cs-result-num green">24</div><div className="cs-result-label">AI Overview Mentions</div></div>
              <div><div className="cs-result-num">2.7K</div><div className="cs-result-label">Organic Keywords</div></div>
            </div>
            <span className="cs-arrow"><ArrowUpRight className="h-4 w-4" strokeWidth={3} /></span>
          </div>

          {/* CARD 05: Professional Services */}
          <div className="cs-card fade-up visible" style={{ display: show("seo content") ? "flex" : "none" }}>
            <div className="cs-card-top">
              <span className="cs-tag">SEO + Schema</span>
              <span className="cs-num">05</span>
            </div>
            <div className="cs-industry">Professional Services · Canada</div>
            <h3>6.9K Organic Keywords with AI Visibility</h3>
            <p>A Canadian professional services firm with strong product pages but no AI footprint. We optimised existing pages, added AI-based FAQs, and targeted low-hanging keyword opportunities — taking organic keyword count to 6.9K with AI citations across all four major platforms.</p>
            <div className="cs-services">
              <span className="cs-svc">Product Page Optimization</span>
              <span className="cs-svc">AI-Based FAQs</span>
              <span className="cs-svc">Low-Hanging Page Strategy</span>
              <span className="cs-svc">Schema Markup</span>
            </div>
            <div className="cs-results">
              <div><div className="cs-result-num">6.9K</div><div className="cs-result-label">Organic Keywords</div></div>
              <div><div className="cs-result-num green">15</div><div className="cs-result-label">AI Overview Pages</div></div>
              <div><div className="cs-result-num">14</div><div className="cs-result-label">Gemini Citations</div></div>
            </div>
            <span className="cs-arrow"><ArrowUpRight className="h-4 w-4" strokeWidth={3} /></span>
          </div>

          {/* CARD 06: Creative & 3D */}
          <div className="cs-card fade-up visible" style={{ display: show("seo content") ? "flex" : "none" }}>
            <div className="cs-card-top">
              <span className="cs-tag alt">AI + Blog SEO</span>
              <span className="cs-num">06</span>
            </div>
            <div className="cs-industry">Creative & 3D Visualisation</div>
            <h3>881 Keywords & AI Citations</h3>
            <p>A 3D modelling studio with a tight 1.1K word-count site. We pushed persona-based blogs, industry-targeted content, and integrated schema — generating 15 AI Overview mentions, 8 ChatGPT citations, and 8 Gemini citations from a lean content base.</p>
            <div className="cs-services">
              <span className="cs-svc">Persona-Based Blogs</span>
              <span className="cs-svc">Industry Blog Optimization</span>
              <span className="cs-svc">Schema Integration</span>
              <span className="cs-svc">Content Architecture</span>
            </div>
            <div className="cs-results">
              <div><div className="cs-result-num">881</div><div className="cs-result-label">Organic Keywords</div></div>
              <div><div className="cs-result-num green">15</div><div className="cs-result-label">AI Overview Mentions</div></div>
              <div><div className="cs-result-num">753</div><div className="cs-result-label">Organic Traffic</div></div>
            </div>
            <span className="cs-arrow"><ArrowUpRight className="h-4 w-4" strokeWidth={3} /></span>
          </div>

          {/* CARD 07: B2B SaaS Web Design */}
          <div className="cs-card fade-up visible" style={{ display: show("web") ? "flex" : "none" }}>
            <div className="cs-card-top">
              <span className="cs-tag">Web Design & Dev</span>
              <span className="cs-num">07</span>
            </div>
            <div className="cs-industry">B2B SaaS</div>
            <h3>Lead-Gen Website, 40% More Conversions</h3>
            <p>A SaaS company running paid traffic to a generic template site. We redesigned with UX-first layouts, benefit-led copy, trust signals, and CRO-tested CTAs — increasing qualified lead conversion rate by 40% within 60 days of launch.</p>
            <div className="cs-services">
              <span className="cs-svc">Custom Web Design</span>
              <span className="cs-svc">UX/UI</span>
              <span className="cs-svc">Conversion Optimization</span>
              <span className="cs-svc">SEO-Ready Dev</span>
            </div>
            <div className="cs-results">
              <div><div className="cs-result-num">+40%</div><div className="cs-result-label">Lead Conversion Rate</div></div>
              <div><div className="cs-result-num green">1.2s</div><div className="cs-result-label">Page Load Speed</div></div>
              <div><div className="cs-result-num">98</div><div className="cs-result-label">PageSpeed Score</div></div>
            </div>
            <span className="cs-arrow"><ArrowUpRight className="h-4 w-4" strokeWidth={3} /></span>
          </div>

          {/* CARD 08: Ecommerce */}
          <div className="cs-card fade-up visible" style={{ display: show("web marketing") ? "flex" : "none" }}>
            <div className="cs-card-top">
              <span className="cs-tag alt">Ecommerce + Ads</span>
              <span className="cs-num">08</span>
            </div>
            <div className="cs-industry">E-commerce & Retail</div>
            <h3>3.1× ROAS on Meta Campaign</h3>
            <p>An e-commerce brand scaling ad spend without a clear creative or targeting system. We restructured the Meta campaign architecture, rebuilt creatives around product benefits, and layered retargeting — achieving 3.1× ROAS and reducing CPA by 38% within 90 days.</p>
            <div className="cs-services">
              <span className="cs-svc">Meta Advertising</span>
              <span className="cs-svc">Creative Strategy</span>
              <span className="cs-svc">Audience Targeting</span>
              <span className="cs-svc">CRO Landing Pages</span>
            </div>
            <div className="cs-results">
              <div><div className="cs-result-num">3.1×</div><div className="cs-result-label">ROAS Achieved</div></div>
              <div><div className="cs-result-num green">−38%</div><div className="cs-result-label">Cost Per Acquisition</div></div>
              <div><div className="cs-result-num">90</div><div className="cs-result-label">Days to Results</div></div>
            </div>
            <span className="cs-arrow"><ArrowUpRight className="h-4 w-4" strokeWidth={3} /></span>
          </div>

        </div>
      </section>
    </>
  );
}
