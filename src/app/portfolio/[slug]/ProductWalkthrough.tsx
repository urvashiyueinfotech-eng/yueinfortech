"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { useMemo, useState } from "react";
import type { PortfolioProjectModule } from "@/types/portfolio";

type ProductWalkthroughProps = {
  productName: string;
  industry: string;
  items: PortfolioProjectModule[];
};

export default function ProductWalkthrough({ productName, industry, items }: ProductWalkthroughProps) {
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const filteredItems = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.id === filter)),
    [filter, items]
  );
  const activeItem = filteredItems[activeIndex] ?? filteredItems[0];

  if (!activeItem) return null;

  const selectFilter = (nextFilter: string) => {
    setFilter(nextFilter);
    setActiveIndex(0);
  };
  const selectItem = (index: number) => setActiveIndex((index + filteredItems.length) % filteredItems.length);

  return (
    <section className="project-walkthrough" id="product-walkthrough">
      <div className="project-shell">
        <header className="project-walkthrough-heading">
          <p><Images aria-hidden="true" />Product Walkthrough</p>
          <h2>Every Screen Built<br />for <span>{industry.split(" · ")[0]}</span></h2>
          <div>Explore {productName} across its core modules — purpose-designed around the workflows that keep your business moving.</div>
        </header>

        <div className="project-walkthrough-tabs" role="tablist" aria-label={`${productName} screens`}>
          <button type="button" role="tab" aria-selected={filter === "all"} className={filter === "all" ? "is-active" : ""} onClick={() => selectFilter("all")}>All Screens</button>
          {items.map((item) => <button key={item.id} type="button" role="tab" aria-selected={filter === item.id} className={filter === item.id ? "is-active" : ""} onClick={() => selectFilter(item.id)}>{item.label}</button>)}
        </div>

        <div className="project-walkthrough-stage" aria-live="polite">
          {filteredItems.map((item, index) => {
            let offset = index - activeIndex;
            if (offset > filteredItems.length / 2) offset -= filteredItems.length;
            if (offset < -filteredItems.length / 2) offset += filteredItems.length;
            const position = offset < -2 ? -2 : offset > 2 ? 2 : offset;
            return (
              <button key={item.id} type="button" className="project-walkthrough-card" data-position={position} data-hidden={Math.abs(offset) > 2 || undefined} aria-label={`View ${item.label} screen`} aria-current={index === activeIndex ? "true" : undefined} onClick={() => selectItem(index)}>
                <Image src={item.image} alt={item.imageAlt} width={1536} height={720} sizes="(max-width: 700px) 82vw, 720px" />
                <span><strong>{item.label}</strong><small>{index + 1} / {filteredItems.length}</small></span>
              </button>
            );
          })}
        </div>

        <div className="project-walkthrough-controls">
          <button type="button" aria-label="Previous screen" onClick={() => selectItem(activeIndex - 1)}><ChevronLeft aria-hidden="true" /></button>
          <div role="tablist" aria-label="Walkthrough screen selector">{filteredItems.map((item, index) => <button key={item.id} type="button" role="tab" aria-label={`Go to ${item.label}`} aria-selected={index === activeIndex} className={index === activeIndex ? "is-active" : ""} onClick={() => selectItem(index)} />)}</div>
          <button type="button" aria-label="Next screen" onClick={() => selectItem(activeIndex + 1)}><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
