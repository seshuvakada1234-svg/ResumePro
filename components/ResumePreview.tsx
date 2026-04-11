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

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        if (containerWidth > 0) {
          setScale(containerWidth / A4_WIDTH);
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      case 'classic':
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <>
      {/*
        ── Visible preview ──────────────────────────────────────────────────
        Scaled to fit the sidebar/panel width using ResizeObserver.
        NO id here — html2canvas must never target this scaled copy.
      */}
      <div
        ref={containerRef}
        style={{ height: `${A4_HEIGHT * scale}px` }}
        className="w-full overflow-hidden rounded-xl shadow-2xl"
      >
        <div
          style={{
            width: `${A4_WIDTH}px`,
            height: `${A4_HEIGHT}px`,
            minHeight: `${A4_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            // ── Preview sharpness ──
            WebkitFontSmoothing: 'antialiased',
            // @ts-ignore
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            // Prevent subpixel bleed on scaled preview
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {renderTemplate()}
        </div>
      </div>

      {/*
        ── PDF capture target ───────────────────────────────────────────────
        Rendered at true A4 pixel dimensions — no scaling, no clipping.
        PDFDownloadButton targets id="resume-preview".
        Kept off-screen with position:fixed so it never affects page layout
        and html2canvas captures it at full resolution.
      */}
      <div
        id="resume-preview"
        aria-hidden="true"
        style={{
          position: 'fixed',           // fixed > absolute — never shifts with scroll
          top: '-9999px',
          left: '0',
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
          minHeight: `${A4_HEIGHT}px`,
          maxHeight: `${A4_HEIGHT}px`,
          background: '#ffffff',
          overflow: 'hidden',          // clip anything that bleeds past A4
          zIndex: -9999,
          pointerEvents: 'none',
          // ── PDF font quality ──
          WebkitFontSmoothing: 'antialiased',
          // @ts-ignore
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        }}
      >
        {renderTemplate()}
      </div>
    </>
  );
};