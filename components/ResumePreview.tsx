'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';
import { TwoColumnTemplate } from '@/components/templates/TwoColumnTemplate';
import PremiumTemplate from '@/components/templates/PremiumTemplate';
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate';
import { RedlineTemplate } from '@/components/templates/RedlineTemplate';
import { NavyTemplate } from '@/components/templates/NavyTemplate';
import { SerifTemplate } from '@/components/templates/SerifTemplate';
import PhotoSidebarTemplate from '@/components/templates/PhotoSidebarTemplate';
import PhotoCircleTemplate from '@/components/templates/PhotoCircleTemplate';
import LawyerClassicTemplate from '@/components/templates/LawyerClassicTemplate';
import MinimalProTemplate from '@/components/templates/MinimalProTemplate';
import PinkHeaderTemplate from '@/components/templates/PinkHeaderTemplate';
import DarkNavyTemplate from '@/components/templates/DarkNavyTemplate';
import CrimsonTemplate from '@/components/templates/CrimsonTemplate';
import BlackYellowTemplate from '@/components/templates/BlackYellowTemplate';
import { LuxuryGoldTemplate } from '@/components/templates/LuxuryGoldTemplate';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Check, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [baseScale, setBaseScale] = useState(1);
  const [zoomFactor, setZoomFactor] = useState(1); // 0.6 to 1.5
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        if (containerWidth > 0) {
          // Leave some safety margins around the paper
          const padding = 32;
          const targetWidth = containerWidth - padding;
          setBaseScale(Math.min(targetWidth / A4_WIDTH, 1.2));
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scale = baseScale * zoomFactor;

  const handleZoomIn = () => setZoomFactor((prev) => Math.min(prev + 0.1, 1.6));
  const handleZoomOut = () => setZoomFactor((prev) => Math.max(prev - 0.1, 0.5));
  const handleZoomReset = () => setZoomFactor(1);

  const renderTemplate = () => {
    switch (data.template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'two-column':
        return <TwoColumnTemplate data={data} />;
      case 'premium':
        return <PremiumTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'redline':
        return <RedlineTemplate data={data} />;
      case 'navy':
        return <NavyTemplate data={data} />;
      case 'serif':
        return <SerifTemplate data={data} />;
      case 'photo-sidebar':
        return <PhotoSidebarTemplate data={data} />;
      case 'photo-circle':
        return <PhotoCircleTemplate data={data} />;
      case 'lawyer-classic':
        return <LawyerClassicTemplate data={data} />;
      case 'minimal-pro':
        return <MinimalProTemplate data={data} />;
      case 'pink-header':
        return <PinkHeaderTemplate data={data} />;
      case 'dark-navy':
        return <DarkNavyTemplate data={data} />;
      case 'crimson':
        return <CrimsonTemplate data={data} />;
      case 'black-yellow':
        return <BlackYellowTemplate data={data} />;
      case 'luxury-gold':
        return <LuxuryGoldTemplate data={data} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <>
      {/* Canvas Workspace Wrapper */}
      <div className="flex flex-col bg-[#F8FAFC] border border-[#ECECF5] rounded-[24px] overflow-hidden shadow-sm">
        
        {/* Workspace Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ECECF5] bg-white gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#0F172A] tracking-wide uppercase">Live Updates Active</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <div className="flex items-center gap-1.5 bg-[#F1F5F9] rounded-xl p-1">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomFactor <= 0.5}
                className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-white rounded-lg transition-all disabled:opacity-30"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                type="button"
                onClick={handleZoomReset}
                className="px-2 py-0.5 text-[11px] font-bold text-[#0F172A] hover:bg-white rounded-md transition-all whitespace-nowrap"
                title="Reset Zoom"
              >
                {Math.round(zoomFactor * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomFactor >= 1.6}
                className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-white rounded-lg transition-all disabled:opacity-30"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="p-2 text-[#64748B] hover:text-[#0f172a] hover:bg-[#F1F5F9] rounded-xl transition-all"
              title="Fullscreen Preview"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* Outer Workspace Canvas */}
        <div 
          ref={containerRef}
          className="relative w-full flex items-start justify-center p-2.5 sm:p-6 lg:p-8 min-h-[380px] sm:min-h-[500px] overflow-x-auto overflow-y-hidden select-none"
          style={{
            backgroundImage: 'radial-gradient(#E2E8F0 1.2px, transparent 1.2px)',
            backgroundSize: '16px 16px',
            backgroundColor: '#F8FAFC'
          }}
        >
          {/* Scaled A4 paper */}
          <div
            style={{
              width: `${A4_WIDTH * scale}px`,
              height: `${A4_HEIGHT * scale}px`,
              transition: 'width 0.2s ease-out, height 0.2s ease-out'
            }}
            className="relative bg-white shadow-2xl rounded-lg overflow-hidden border border-[#ECECF5]"
          >
            <div
              style={{
                width: `${A4_WIDTH}px`,
                height: `${A4_HEIGHT}px`,
                minHeight: `${A4_HEIGHT}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay using Framer Motion */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-4"
          >
            <div className="absolute top-4 right-4 flex items-center gap-3">
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              >
                <Minimize2 size={24} />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              style={{
                width: 'min(95vw, 680px)',
                aspectRatio: `${A4_WIDTH} / ${A4_HEIGHT}`,
              }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden relative max-h-[90vh]"
            >
              <div className="w-full h-full overflow-auto p-4 bg-gray-100 flex justify-center">
                <div 
                  style={{
                    width: `${A4_WIDTH}px`,
                    height: `${A4_HEIGHT}px`,
                    transform: `scale(${600 / A4_WIDTH})`,
                    transformOrigin: 'top center',
                  }}
                  className="bg-white shadow-lg"
                >
                  {renderTemplate()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Off-screen PDF Target Element */}
      <div
        id="resume-preview"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '0',
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
          minHeight: `${A4_HEIGHT}px`,
          maxHeight: `${A4_HEIGHT}px`,
          background: '#ffffff',
          overflow: 'hidden',
          zIndex: -9999,
          pointerEvents: 'none',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        }}
      >
        {renderTemplate()}
      </div>
    </>
  );
};
