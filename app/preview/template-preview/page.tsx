'use client';

import html2canvas from "html2canvas";
import { useRef } from "react";
import PremiumTemplate from "@/components/templates/PremiumTemplate";
import { dummyResumeData } from "@/constants/dummyData";

export default function TemplatePreviewPage() {
  const ref = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current, {
      scale: 2,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = "template.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="p-10">
      <button
        onClick={generateImage}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Generate Preview
      </button>

      <div ref={ref} className="bg-white">
        <PremiumTemplate data={dummyResumeData} />
      </div>
    </div>
  );
}