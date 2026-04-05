'use client';

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AdBanner } from "./AdBanner";
import { X, Loader2 } from "lucide-react";

const A4_W = 794;
const A4_H = 1123;
const SCALE = 3; // 216 DPI — crisp on all screens/printers

const spinnerStyle: React.CSSProperties = {
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  border: "2px solid rgba(255,255,255,0.35)",
  borderTopColor: "#ffffff",
  animation: "pdf-spin 0.7s linear infinite",
  flexShrink: 0,
};

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M12 3v13M7 11l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export default function PDFDownloadButton() {
  const [loading, setLoading] = useState(false);
  const [showAdOverlay, setShowAdOverlay] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const startDownload = async () => {
    const element = document.getElementById("resume-preview");

    if (!element) {
      toast.error("Preview not found ❌");
      setLoading(false);
      setShowAdOverlay(false);
      return;
    }

    let clonedElement: HTMLElement | null = null;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      // ── Clone & position off-screen at exact A4 size ──
      clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.position = "fixed";
      clonedElement.style.top = "-99999px";
      clonedElement.style.left = "0";
      clonedElement.style.width = `${A4_W}px`;
      clonedElement.style.height = `${A4_H}px`;
      clonedElement.style.minHeight = `${A4_H}px`;
      clonedElement.style.maxHeight = `${A4_H}px`;
      clonedElement.style.background = "#ffffff";
      clonedElement.style.overflow = "hidden";
      clonedElement.style.transform = "none";
      clonedElement.style.zoom = "1";
      // ── Font quality ──
      (clonedElement.style as any).webkitFontSmoothing = "antialiased";
      (clonedElement.style as any).mozOsxFontSmoothing = "grayscale";
      clonedElement.style.textRendering = "optimizeLegibility";
      document.body.appendChild(clonedElement);

      // ── Wait for layout + fonts ──
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (document.fonts?.ready) await document.fonts.ready;

      // ── Wait for all images ──
      const clonedImages = Array.from(clonedElement.querySelectorAll("img"));
      await Promise.all(
        clonedImages.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) return resolve();
              img.onload = () => resolve();
              img.onerror = () => resolve();
            })
        )
      );

      if (clonedElement.offsetWidth === 0 || clonedElement.offsetHeight === 0) {
        throw new Error("Cloned preview has invalid dimensions");
      }

      // ── Capture at 3x scale ──
      const canvas = await html2canvas(clonedElement, {
        scale: SCALE,           // KEY: 3x = 216 DPI
        useCORS: true,
        allowTaint: false,
        imageTimeout: 15000,
        logging: false,
        width: A4_W,
        height: A4_H,
        windowWidth: A4_W,
        windowHeight: A4_H,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: "#ffffff",
        onclone: (doc) => {
          const root = doc.documentElement;
          const body = doc.body;

          // Fix modern CSS color functions unsupported by html2canvas
          root.style.setProperty("--tw-ring-color", "rgba(59,130,246,0.5)");
          root.style.setProperty("--tw-ring-offset-color", "#ffffff");
          root.style.setProperty("--tw-border-opacity", "1");
          root.style.setProperty("--tw-text-opacity", "1");
          root.style.setProperty("--tw-bg-opacity", "1");

          const unsafeColorFns = /(oklch|oklab|lab|lch|color-mix)\(/i;
          const all = Array.from(body.querySelectorAll<HTMLElement>("*"));

          for (const node of all) {
            // Apply font smoothing to every node in clone
            (node.style as any).webkitFontSmoothing = "antialiased";
            (node.style as any).mozOsxFontSmoothing = "grayscale";

            const style = doc.defaultView?.getComputedStyle(node);
            if (!style) continue;

            if (unsafeColorFns.test(style.color))
              node.style.color = "#111827";
            if (unsafeColorFns.test(style.backgroundColor))
              node.style.backgroundColor = "#ffffff";
            if (unsafeColorFns.test(style.borderTopColor))
              node.style.borderTopColor = "#d1d5db";
            if (unsafeColorFns.test(style.borderRightColor))
              node.style.borderRightColor = "#d1d5db";
            if (unsafeColorFns.test(style.borderBottomColor))
              node.style.borderBottomColor = "#d1d5db";
            if (unsafeColorFns.test(style.borderLeftColor))
              node.style.borderLeftColor = "#d1d5db";
            if (unsafeColorFns.test(style.outlineColor))
              node.style.outlineColor = "transparent";
            if (unsafeColorFns.test(style.textDecorationColor))
              node.style.textDecorationColor = "currentColor";
            if (unsafeColorFns.test(style.caretColor))
              node.style.caretColor = "currentColor";
          }
        },
      });

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas rendering failed");
      }

      // ── Composite onto final A4 canvas at 3x resolution ──
      const a4Canvas = document.createElement("canvas");
      a4Canvas.width = A4_W * SCALE;
      a4Canvas.height = A4_H * SCALE;

      const ctx = a4Canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to create canvas context");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, a4Canvas.width, a4Canvas.height);
      ctx.drawImage(canvas, 0, 0, a4Canvas.width, a4Canvas.height);

      // ── Export as PNG (lossless) instead of JPEG ──
      const imgData = a4Canvas.toDataURL("image/png", 1.0);
      if (!imgData || imgData === "data:,") {
        throw new Error("Canvas export failed");
      }

      // ── Create PDF at exact A4 mm dimensions ──
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",          // 210 x 297 mm
        compress: false,        // no lossy compression
      });

      const pdfW = pdf.internal.pageSize.getWidth();   // 210mm
      const pdfH = pdf.internal.pageSize.getHeight();  // 297mm

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfW,
        pdfH,
        "",
        "FAST",                 // no extra canvas compression
      );

      pdf.save("resume.pdf");
      toast.success("Resume downloaded! ✅");

    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Download failed ❌");
    } finally {
      if (clonedElement?.parentNode) {
        clonedElement.parentNode.removeChild(clonedElement);
      }
      setLoading(false);
      setShowAdOverlay(false);
    }
  };

  const handleDownloadClick = () => {
    setLoading(true);
    setShowAdOverlay(true);
    setCountdown(3);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAdOverlay && countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (showAdOverlay && countdown === 0) {
      startDownload();
    }
    return () => clearTimeout(timer);
  }, [showAdOverlay, countdown]);

  return (
    <>
      <style>{`
        @keyframes pdf-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <button
        onClick={handleDownloadClick}
        disabled={loading}
        aria-label={loading ? "Generating PDF, please wait" : "Download PDF"}
        className={[
          "relative inline-flex w-auto items-center justify-center gap-2",
          "px-5 py-2",
          "rounded-lg font-semibold text-sm text-white",
          "select-none outline-none",
          "transition-all duration-200 ease-in-out",
          loading
            ? "bg-indigo-600 cursor-not-allowed shadow-inner animate-pulse transition-none"
            : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.97] shadow-md hover:shadow-indigo-300/40 hover:shadow-lg cursor-pointer",
        ].join(" ")}
      >
        {loading ? (
          <>
            <span style={spinnerStyle} />
            Preparing...
          </>
        ) : (
          <>
            <DownloadIcon />
            Download PDF
          </>
        )}
      </button>

      {showAdOverlay && (
        <div className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-600">
                  {countdown > 0 ? countdown : ""}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Preparing Your Resume</h3>
              <p className="text-gray-500">Your professional ATS-friendly resume is being generated. Please wait a moment.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 shadow-inner">
              <AdBanner adSlot="download-loading-ad" className="min-h-[250px]" />
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Processing high-quality PDF export...
            </div>

            <button 
              onClick={() => {
                setShowAdOverlay(false);
                setLoading(false);
              }}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
