"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import type { PortfolioProjectModule } from "@/types/portfolio";

export default function ProjectModules({ items, browserLabel }: { items: PortfolioProjectModule[]; browserLabel: string }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) return null;

  return (
    <div className="project-modules-shell">
      <div className="project-module-tabs" role="tablist" aria-label="Project modules">
        {items.map((item, index) => {
          const selected = item.id === active.id;
          return (
            <button
              key={item.id}
              id={`module-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`module-panel-${item.id}`}
              className={selected ? "is-active" : ""}
              onClick={() => setActiveId(item.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div id={`module-panel-${active.id}`} role="tabpanel" aria-labelledby={`module-tab-${active.id}`} className="project-module-panel">
        <div className="project-module-copy">
          <p className="project-module-count">{active.label}</p>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <ul>
            {active.features.map((feature) => (
              <li key={feature}><Check aria-hidden="true" />{feature}</li>
            ))}
          </ul>
          <a href="#project-contact" className="project-text-link">Request a demo <ChevronRight aria-hidden="true" /></a>
        </div>
        <figure className="project-module-visual">
          <div className="project-browser-bar"><i></i><i></i><i></i><span>{browserLabel}</span></div>
          <Image src={active.image} alt={active.imageAlt} width={1536} height={720} sizes="(max-width: 1024px) 100vw, 58vw" />
          {active.caption && <figcaption>{active.caption}</figcaption>}
        </figure>
      </div>
    </div>
  );
}
