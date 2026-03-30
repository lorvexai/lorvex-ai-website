"use client";

import { useEffect } from "react";
import mermaid from "mermaid";

export default function MermaidRenderer() {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose"
    });

    const codeBlocks = document.querySelectorAll("pre > code.language-mermaid");

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (!pre) return;

      if (pre.dataset.mermaidProcessed === "true") return;
      pre.dataset.mermaidProcessed = "true";

      const chartSource = codeBlock.textContent ?? "";
      const container = document.createElement("div");
      container.className = "mermaid";
      container.textContent = chartSource;

      pre.replaceWith(container);
    });

    mermaid.run({ querySelector: ".mermaid" }).catch(() => {
      // Keep the page usable even if one diagram fails to parse.
    });
  }, []);

  return null;
}
