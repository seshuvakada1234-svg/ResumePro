'use client';

import React from "react";
import { dummyResumeData } from "@/constants/dummyData";

export default function TemplateThumbnail({ Template }: any) {
  return (
    <div className="w-full h-40 overflow-hidden rounded-lg border bg-white">
      <div
        style={{
          width: "794px",
          height: "1123px",
          transform: "scale(0.18)",
          transformOrigin: "top left",
        }}
      >
        <Template data={dummyResumeData} />
      </div>
    </div>
  );
}
