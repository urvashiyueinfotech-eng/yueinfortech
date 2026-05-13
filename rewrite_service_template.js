const fs = require('fs');

const content = fs.readFileSync('src/app/services/[...slug]/page.tsx', 'utf8');

const newTemplate = `
function MainServiceTemplate({ data, slugPath }: { data: ServiceDoc; slugPath: string }) {
  return (
    <main className="service-detail-main">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-dots"></div>
        <div className="hero-glow"></div>
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            {data.hero.badge || data.hero.subheading}
          </div>
          <h1>{renderHeroTitle(data.hero.heading)}</h1>
          
          {data.hero.description && (
            <div className="hero-snippet">
              {data.hero.description}
            </div>
          )}

          {Array.isArray(data.hero.stats) && data.hero.stats.length > 0 && (
            <div className="hero-stats">
              {data.hero.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="hstat-num">{stat.value}</div>
                  <div className="hstat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="hero-ctas">
            {data.hero.actions.map((action, idx) => {
              const baseClass = idx === 0 ? "btn-primary" : "btn-secondary";
              return (
                <HeroAction
                  key={idx}
                  action={{ ...action, className: baseClass }}
                  context={{
                    page: "service",
                    route: \`/services/\${slugPath}\`,
                    section: "hero",
                    trigger: action.popupId ?? action.type,
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY US (Overview) ── */}
      {data.intro_section && (
        <section className="section alt">
          <div className="sec-label">Overview</div>
          <div className="why-layout fade-up visible">
            <div className="why-left">
              <h2 className="sec-heading" dangerouslySetInnerHTML={{ __html: data.intro_section.heading.replace('Other Agencies', '<span>Other Agencies</span>') }} />
              <p className="sec-sub">{data.intro_section.description}</p>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {data.intro_section.cta && (
                  <HeroAction
                    action={{ ...data.intro_section.cta, className: 'btn-purple' }}
                    context={{ page: "service", route: \`/services/\${slugPath}\`, section: "overview", trigger: data.intro_section.cta.popupId ?? data.intro_section.cta.type }}
                  />
                )}
                {data.intro_section.secondaryCta && (
                  <HeroAction
                    action={{ ...data.intro_section.secondaryCta, className: 'btn-outline' }}
                    context={{ page: "service", route: \`/services/\${slugPath}\`, section: "overview", trigger: data.intro_section.secondaryCta.popupId ?? data.intro_section.secondaryCta.type }}
                  />
                )}
              </div>
            </div>
            
            {data.intro_section.features && data.intro_section.features.length > 0 && (
              <div className="why-features-grid">
                {data.intro_section.features.map((feature, idx) => (
                  <div key={idx} className="why-feature">
                    <div className="why-feature-dot"></div>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── SERVICES GRID ── */}
      {data.sub_services_section?.cards?.length ? (
        <section className="section light" id="services">
          <div className="sec-label">What We Do</div>
          <h2 className="sec-heading" dangerouslySetInnerHTML={{ __html: data.sub_services_section.heading.replace('Services', '<span>Services</span>') }} />
          <p className="sec-sub">{data.sub_services_section.description}</p>
          
          <div className="svc-grid fade-up visible">
            {data.sub_services_section.cards.map((card, idx) => {
              const isFeatured = idx < 2; // Mimic the HTML where first two are featured
              return (
                <div key={card.id || idx} className={\`svc-card \${isFeatured ? 'featured' : ''}\`} style={idx === 0 ? { gridColumn: 'span 2' } : {}}>
                  <div className="svc-num">{String(idx + 1).padStart(2, '0')} — {card.category || card.subtitle || "Service"}</div>
                  <h3>{card.title}</h3>
                  {card.subtitle && <div className="svc-sub">{card.subtitle}</div>}
                  {(card.snippet || card.description) && (
                    <div className="svc-snippet">{card.snippet || card.description}</div>
                  )}
                  
                  {card.features && card.features.length > 0 && (
                    <ul className="svc-bullets">
                      {card.features.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {card.cta && (
                    <Link href={card.cta.href} className="svc-link">
                      {card.cta.text} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* ── PROCESS FUNNEL ── */}
      {data.process_section && (
        <section className="section alt" id="approach">
          <div className="sec-label">Why Choose Us</div>
          <div className="funnel-layout fade-up visible">
            <div className="funnel-left">
              <h2 className="sec-heading" dangerouslySetInnerHTML={{ __html: data.process_section.heading.replace('Full-Funnel Marketing', '<span>Full-Funnel Marketing</span>') }} />
              <p className="sec-sub">{data.process_section.description}</p>
              {data.process_section.cta && (
                <HeroAction
                  action={{ ...data.process_section.cta, className: 'btn-purple' }}
                  context={{ page: "service", route: \`/services/\${slugPath}\`, section: "process", trigger: data.process_section.cta.popupId ?? data.process_section.cta.type }}
                />
              )}
            </div>
            
            <div className="funnel-steps">
              {data.process_section.steps.map((step, idx) => (
                <div key={idx} className="funnel-step">
                  <div className="funnel-step-left">
                    <div className="funnel-circle">{String(idx + 1).padStart(2, '0')}.</div>
                    <div className="funnel-line"></div>
                  </div>
                  <div className="funnel-step-content">
                    <div className="funnel-step-label">{step.step_label || \`Stage \${idx + 1}\`}</div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RESULTS ── */}
      {data.results_section && data.results_section.cards.length > 0 && (
        <section className="section light" id="results">
          <div className="sec-label">Documented Results</div>
          <h2 className="sec-heading" dangerouslySetInnerHTML={{ __html: data.results_section.heading.replace('Delivers in Practice', '<span>Delivers in Practice</span>') }} />
          <p className="sec-sub">{data.results_section.description}</p>
          
          <div className="results-grid fade-up visible">
            {data.results_section.cards.map((card, idx) => (
              <div key={card.id || idx} className="result-card">
                <div className="result-tag">{card.tag}</div>
                <div className="result-metrics">
                  {card.metrics.map((metric, midx) => (
                    <div key={midx} className="rm">
                      <span className="rm-label">{metric.label}</span>
                      <span className={\`rm-val \${metric.tone === 'positive' ? 'green' : ''}\`}>{metric.value}</span>
                    </div>
                  ))}
                </div>
                {card.description && <div className="result-desc">{card.description}</div>}
              </div>
            ))}
          </div>
          
          {data.results_section.cta && (
            <div style={{ textAlign: 'center' }}>
              <Link href={data.results_section.cta.href} className="btn-purple">
                {data.results_section.cta.text} →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ── TIERS ── */}
      {data.engagement_tiers_section && data.engagement_tiers_section.tiers.length > 0 && (
        <section className="section alt">
          <div className="sec-label">Engagement Options</div>
          <h2 className="sec-heading" dangerouslySetInnerHTML={{ __html: data.engagement_tiers_section.heading.replace('Yue Infotech', '<span>Yue Infotech</span>') }} />
          <p className="sec-sub">{data.engagement_tiers_section.description}</p>
          
          <div className="tiers-grid fade-up visible">
            {data.engagement_tiers_section.tiers.map((tier, idx) => (
              <div key={tier.id || idx} className={\`tier \${tier.featured ? 'featured' : ''}\`}>
                {tier.badge && <div className="tier-badge">{tier.badge}</div>}
                <div className="tier-name">{tier.name}</div>
                <div className="tier-for">{tier.for}</div>
                
                <ul className="tier-features">
                  {tier.features.map((feature, fidx) => (
                    <li key={fidx}>{feature}</li>
                  ))}
                </ul>
                
                {tier.cta && (
                  <div className="tier-cta-wrap">
                    <Link href={tier.cta.href} className="tier-cta">
                      {tier.cta.text} →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── INDUSTRIES ── */}
      {data.industries_section?.items?.length ? (
        <section className="section light" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="sec-label">Industries We Serve</div>
          <h2 className="sec-heading" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginBottom: '0' }}>{data.industries_section.heading}</h2>
          <div className="ind-grid">
            {data.industries_section.items.map((industry, idx) => (
              <span key={idx} className="ind-pill">{industry}</span>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── FAQ ── */}
      {data.faq_section?.questions?.length ? (
        <section className="section alt">
          <div className="sec-label">Common Questions</div>
          <h2 className="sec-heading" dangerouslySetInnerHTML={{ __html: data.faq_section.heading.replace('Questions', '<span>Questions</span>') }} />
          <ServiceDetailFaqClient questions={data.faq_section.questions} />
        </section>
      ) : null}

      {/* ── FINAL CTA ── */}
      {data.final_cta_section && (
        <section className="cta-sec">
          <div className="cta-glow"></div>
          <div className="cta-label">Start Today</div>
          <h2 dangerouslySetInnerHTML={{ __html: data.final_cta_section.heading.replace('Converts?', '<em>Converts?</em>') }} />
          {data.final_cta_section.subheading && <p>{data.final_cta_section.subheading}</p>}
          
          <div className="cta-btns">
            {data.final_cta_section.actions.map((action, idx) => {
              const baseClass = idx === 0 ? "btn-primary" : idx === 1 ? "btn-secondary" : "btn-wa";
              
              if (baseClass === "btn-wa") {
                return (
                  <a key={idx} href="https://wa.me/918859366292" className="btn-wa" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {action.text}
                  </a>
                );
              }

              return (
                <ServiceFinalCtaAction
                  key={idx}
                  action={{ ...action, className: baseClass }}
                  context={{
                    page: "service",
                    route: \`/services/\${slugPath}\`,
                    section: "final-cta",
                    trigger: action.popupId ?? action.type,
                  }}
                />
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
`;

const updatedContent = content.replace(
  /function MainServiceTemplate\(\{ data, slugPath \}: \{ data: ServiceDoc; slugPath: string \}\) \{[\s\S]*?\}\n\nexport async function generateStaticParams/m,
  newTemplate + '\nexport async function generateStaticParams'
);

fs.writeFileSync('src/app/services/[...slug]/page.tsx', updatedContent);

// Add the import for ServiceDetailFaqClient at the top if it's missing, and service-detail.css
let finalContent = fs.readFileSync('src/app/services/[...slug]/page.tsx', 'utf8');

if (!finalContent.includes('import ServiceDetailFaqClient')) {
  finalContent = finalContent.replace(
    'import ServiceFaqList from "@/sections/ServicesPage/ServiceFaqList";',
    'import ServiceDetailFaqClient from "./ServiceDetailFaqClient";\nimport "./service-detail.css";'
  );
}
fs.writeFileSync('src/app/services/[...slug]/page.tsx', finalContent);

console.log("Successfully rewrote page.tsx!");
