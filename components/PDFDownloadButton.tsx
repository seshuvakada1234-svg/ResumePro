'use client';

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { AdBanner } from "./AdBanner";
import { X, Loader2, Zap, ChevronRight, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const A4_W = 794;
const A4_H = 1123;
const SCALE = 3; // 216 DPI — crisp on all screens/printers

const spinnerStyle: React.CSSProperties = {
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  border: "2px solid rgba(255,255,255,0.35)",
  borderTopColor: "#ffffff",
  animation: "pdf-spin 0.7s linear infinite",
  flexShrink: 0,
};

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || "w-4 h-4"}
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M12 3v13M7 11l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

interface PDFDownloadButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function PDFDownloadButton({ className, size = "lg" }: PDFDownloadButtonProps = {}) {
  const [loading, setLoading] = useState(false);
  const [showAdOverlay, setShowAdOverlay] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      toast.success("✅ Resume downloaded successfully");

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
    setCountdown(5);
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
        className={className || [
          "relative inline-flex w-auto items-center justify-center gap-2",
          size === "sm" ? "px-4 py-2.5 text-xs rounded-xl" : "px-8 py-4 text-base sm:text-lg rounded-xl",
          "font-bold text-white",
          "select-none outline-none",
          "transform active:scale-[0.97]",
          "transition-all duration-200 ease-in-out",
          loading
            ? "bg-slate-500 cursor-not-allowed shadow-inner animate-pulse transition-none"
            : "bg-gradient-to-r from-[#5B4DFF] via-[#A855F7] to-[#FF5EA8] hover:opacity-95 shadow-md shadow-indigo-100 hover:shadow-lg cursor-pointer",
        ].join(" ")}
      >
        {loading ? (
          <>
            <span style={spinnerStyle} />
            Preparing...
          </>
        ) : (
          <>
            <DownloadIcon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
            <span>Download PDF 🚀</span>
          </>
        )}
      </button>

      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {showAdOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              id="pdf-download-overlay"
              className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur-xl flex flex-col justify-end sm:justify-center items-center p-4 overflow-y-auto"
            >
              <div 
                id="pdf-container-box" 
                className="w-[90vw] max-w-[320px] sm:w-full sm:max-w-[420px] bg-white border border-slate-200/80 shadow-[0_24px_50px_rgba(0,0,0,0.12)] rounded-[20px] sm:rounded-3xl p-5 sm:p-8 flex flex-col items-center text-center space-y-5 sm:space-y-6 relative mb-[calc(env(safe-area-inset-bottom,0px)+12px)] sm:mb-0 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:pb-8"
              >
                <button 
                  onClick={() => {
                    setShowAdOverlay(false);
                    setLoading(false);
                  }}
                  className="absolute top-3.5 right-3.5 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
                  aria-label="Cancel download"
                >
                  <X size={18} />
                </button>

                {/* Layout: Spinner, Preparing Your Resume, Generating ATS-friendly PDF..., Countdown, Responsive ad banner */}

                {/* 1. Large Spinner */}
                <div className="relative flex items-center justify-center py-1" id="pdf-spinner-area">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
                    className="w-12 h-12 sm:w-14 sm:h-14 border-4 border-slate-100 border-t-indigo-600 rounded-full"
                  />
                </div>

                {/* 2. Title & 3. Subtitle */}
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight" id="pdf-title">
                    Preparing Your Resume
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-semibold" id="pdf-subtitle">
                    Generating ATS-friendly PDF...
                  </p>
                </div>

                {/* 4. Countdown Timer */}
                <div className="space-y-2 py-3 px-4 bg-slate-50 border border-slate-100 rounded-xl w-full" id="pdf-countdown-area">
                  <p className="text-[10px] sm:text-xs font-bold text-indigo-600 uppercase tracking-widest animate-pulse">
                    Ad loading...
                  </p>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight tabular-nums">
                    {countdown}s
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-semibold px-2">
                    Please wait while your PDF is being prepared.
                  </p>
                </div>

                {/* 5. Responsive Ad Container Below the Timer */}
                <div className="w-full flex justify-center pt-1" id="pdf-ad-area">
                  <div className="w-full max-w-[280px] sm:max-w-none sm:w-full flex items-center justify-center bg-slate-50/50 border border-slate-100/80 rounded-[14px] overflow-hidden p-1.5 min-h-[100px] sm:min-h-[90px]">
                    <AdBanner 
                      adSlot="download-loading-ad" 
                      adFormat="horizontal"
                      fullWidthResponsive={true}
                      className="w-full"
                      minHeight={{ mobile: '100px', desktop: '90px' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
