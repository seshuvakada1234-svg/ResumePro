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
      case 'classic':
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <>
      {/*
        ── Visible preview ────────────────────────────────────────────────────
        Scaled down to fit the container. overflow-hidden clips the scaled
        content so it doesn't bleed outside its box. This div has NO id so
        html2canvas never accidentally targets it.
      */}
      <div
        ref={containerRef}
        style={{ height: `${A4_HEIGHT * scale}px` }}
        className="w-full overflow-hidden rounded-xl shadow-2xl"
      >
        <div
          style={{
            width: `${A4_WIDTH}px`,
            minHeight: `${A4_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
          className="bg-white text-gray-900"
        >
          {renderTemplate()}
        </div>
      </div>

      {/*
        ── PDF capture target ─────────────────────────────────────────────────
        Full A4 size, visually hidden (off-screen), NO scaling, NO clipping.
        PDFDownloadButton targets id="resume-preview" — this is that element.
        Rendering the template twice is intentional: the visible copy is scaled
        for display; this copy is at true pixel dimensions for html2canvas so
        the entire page is captured without any overflow clipping.
      */}
      <div
        id="resume-preview"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '0',
          width: `${A4_WIDTH}px`,
          minHeight: `${A4_HEIGHT}px`,
          background: '#ffffff',
          zIndex: -1,
          pointerEvents: 'none',
        }}
        className="text-gray-900"
      >
        {renderTemplate()}
      </div>
    </>
  );
};