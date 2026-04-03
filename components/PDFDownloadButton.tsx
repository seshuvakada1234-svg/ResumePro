'use client';

import { useState } from "react";
import { toast } from "sonner";

function sanitizeCSS(css: string): string {
  return css
    .replace(/oklch\([^)]*\)/g, "#6366f1")
    .replace(/oklab\([^)]*\)/g, "#6366f1")
    .replace(/color-mix\([^)]*\)/g, "#6366f1");
}

const A4_W = 794;
const A4_H = 1123;

export default function PDFDownloadButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById("resume-preview");

    if (!element) {
      toast.error("Preview not found ❌");
      return;
    }

    try {
      setLoading(true);
      element.classList.add("pdf-safe");
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Import libraries
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      // Inline all external stylesheets into the document before capture
      const styleFixPromises = Array.from(
        document.querySelectorAll('link[rel="stylesheet"]') as NodeListOf<HTMLLinkElement>
      ).map(async (link) => {
        try {
          const cssText = sanitizeCSS(await (await fetch(link.href)).text());
          const styleTag = document.createElement("style");
          styleTag.textContent = cssText;
          styleTag.setAttribute("data-pdf-injected", "true");
          document.head.appendChild(styleTag);
        } catch { /* ignore */ }
      });
      await Promise.all(styleFixPromises);

      // Capture with html2canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: A4_W,
        height: A4_H,         // ← Force exact A4 height capture
        windowWidth: A4_W,
        windowHeight: A4_H,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: "#ffffff",

        onclone: async (clonedDoc: Document) => {
          // Fix CSS
          clonedDoc.querySelectorAll("style").forEach((tag) => {
            if (tag.textContent) tag.textContent = sanitizeCSS(tag.textContent);
          });

          // Fix inline oklch
          clonedDoc.querySelectorAll("[style]").forEach((el) => {
            const s = el.getAttribute("style") || "";
            if (s.includes("oklch") || s.includes("oklab")) {
              el.setAttribute("style",
                s.replace(/oklch\([^)]*\)/g, "#6366f1").replace(/oklab\([^)]*\)/g, "#6366f1")
              );
            }
          });

          // Lock resume-preview to exact A4
          const cloned = clonedDoc.getElementById("resume-preview");
          if (cloned) {
            cloned.style.cssText = `
              width: ${A4_W}px !important;
              height: ${A4_H}px !important;
              min-height: ${A4_H}px !important;
              max-height: ${A4_H}px !important;
              overflow: hidden !important;
              transform: none !important;
              position: relative !important;
              display: block !important;
              background: white !important;
            `;
          }

          // Lock template root
          const templateRoot = cloned?.firstElementChild as HTMLElement | null;
          if (templateRoot) {
            templateRoot.style.cssText = `
              width: ${A4_W}px !important;
              height: ${A4_H}px !important;
              min-height: ${A4_H}px !important;
              max-height: ${A4_H}px !important;
              display: flex !important;
              flex-direction: row !important;
              overflow: hidden !important;
            `;
          }

          // Force sidebar to full height
          clonedDoc.querySelectorAll("aside").forEach((aside) => {
            const el = aside as HTMLElement;
            el.style.height = `${A4_H}px`;
            el.style.minHeight = `${A4_H}px`;
            el.style.maxHeight = `${A4_H}px`;
            el.style.alignSelf = "stretch";
            el.style.flexShrink = "0";
            el.style.overflow = "hidden";
          });

          // Force main to fill remaining space
          clonedDoc.querySelectorAll("main").forEach((main) => {
            const el = main as HTMLElement;
            el.style.height = `${A4_H}px`;
            el.style.minHeight = `${A4_H}px`;
            el.style.maxHeight = `${A4_H}px`;
            el.style.flex = "1";
            el.style.overflow = "hidden";
            el.style.backgroundColor = "#ffffff";
          });
        },
      });

      // ── KEY FIX: draw canvas onto a NEW canvas that is exactly A4 size ──
      // This ensures the PDF is always full A4, even if content is short.
      const a4Canvas = document.createElement("canvas");
      a4Canvas.width = A4_W * 2;   // scale: 2
      a4Canvas.height = A4_H * 2;  // scale: 2

      const ctx = a4Canvas.getContext("2d")!;
      // Fill white background first
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, a4Canvas.width, a4Canvas.height);
      // Draw the captured canvas on top (it may be shorter — white fills the rest)
      ctx.drawImage(canvas, 0, 0);

      // Create PDF from the guaranteed A4 canvas
      const imgData = a4Canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [A4_W, A4_H],
        hotfixes: ["px_scaling"],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, A4_W, A4_H);
      pdf.save("resume.pdf");

      toast.success("Resume downloaded! ✅");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Download failed ❌");
    } finally {
      // Clean up injected styles
      document.querySelectorAll("style[data-pdf-injected]").forEach((el) => el.remove());
      document.getElementById("resume-preview")?.classList.remove("pdf-safe");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition font-bold disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Generating PDF..." : "Download PDF"}
    </button>
  );
}