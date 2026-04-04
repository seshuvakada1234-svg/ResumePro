'use client';

import React from "react";
import { dummyResumeData } from "@/constants/dummyData";

// A4 resume dimensions at 96dpi
const A4_W = 794;
const A4_H = 1123;
const SCALE = 0.18;

// Container must match the scaled output exactly — otherwise the resume gets
// clipped. At scale 0.18: 794 × 0.18 = ~143px wide, 1123 × 0.18 = ~202px tall.
const THUMB_W = Math.round(A4_W * SCALE); // 143
const THUMB_H = Math.round(A4_H * SCALE); // 202

export default function TemplateThumbnail({ Template }: any) {
  return (
    <div
      style={{ width: THUMB_W, height: THUMB_H }}
      className="overflow-hidden rounded-lg border bg-white"
    >
      <div
        style={{
          width: A4_W,
          height: A4_H,
          transform: `scale(${SCALE})`,
          transformOrigin: "top left",
          pointerEvents: "none", // prevent click-through on interactive elements
        }}
      >
        <Template data={dummyResumeData} />
      </div>
    </div>
  );
}