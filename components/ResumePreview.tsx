'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';
import { TwoColumnTemplate } from '@/components/templates/TwoColumnTemplate';
import PremiumTemplate from '@/components/templates/PremiumTemplate';

const A4_WIDTH = 794;   // A4 in px at 96dpi
const A4_HEIGHT = 1123; // A4 in px at 96dpi

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Auto-scale the A4 page to always fit the container width
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
      case 'classic':
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (

    <div
      ref={containerRef}
      style={{ height: `${A4_HEIGHT * scale}px` }}
      className="w-full overflow-hidden rounded-xl shadow-2xl"
    >
      {/* A4 page at full 794px, scaled down via transform to fit container */}
      <div
        id="resume-preview"
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
  );
};