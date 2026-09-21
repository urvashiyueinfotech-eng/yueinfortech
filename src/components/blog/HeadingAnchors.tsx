"use client";

import { useEffect } from "react";

/** Adds a hover "#" link to each in-content heading that already has an id,
 *  so readers can grab a link straight to any section. */
export default function HeadingAnchors() {
  useEffect(() => {
    const container = document.querySelector(".blog-prose");
    if (!container) return;

    const headings = container.querySelectorAll<HTMLElement>("h2[id], h3[id]");
    headings.forEach((heading) => {
      if (heading.querySelector(".heading-anchor")) return;
      const anchor = document.createElement("a");
      anchor.href = `#${heading.id}`;
      anchor.className = "heading-anchor";
      anchor.setAttribute("aria-label", "Link to this section");
      anchor.textContent = "#";
      heading.appendChild(anchor);
    });
  }, []);

  return null;
}
