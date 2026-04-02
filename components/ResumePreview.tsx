'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ResumeData } from '@/types/resume';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { TwoColumnTemplate } from './templates/TwoColumnTemplate';
import PremiumTemplate from './templates/PremiumTemplate';
import { Download, FileText } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
  showDownload?: boolean;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, showDownload = false }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const element = document.getElementById("resume-preview");

    if (!element) return;

    // Apply PDF-safe class to override oklch colors
    element.classList.add("pdf-safe");

    try {
      // @ts-ignore
      const html2pdf = (await import("html2pdf.js")).default;

      await html2pdf()
        .set({
          margin: 0,
          filename: "resume.pdf",
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        })
        .from(element)
        .save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      // Remove PDF-safe class to restore original UI
      element.classList.remove("pdf-safe");
    }
  };

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
    <div className="flex flex-col gap-4 w-full h-full">
      {showDownload && (
        <div className="flex justify-end px-4">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      )}

      <div className="a4-preview-container">
        <div 
          id="resume-preview"
          ref={resumeRef}
          className="a4-preview-scale"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
