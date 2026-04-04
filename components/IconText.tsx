'use client';

import React from 'react';

interface IconTextProps {
  icon: React.ReactElement;
  text: string;
  iconBadge?: React.CSSProperties;
}

export default function IconText({ icon, text, iconBadge }: IconTextProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start', // ⭐ IMPORTANT
        gap: '8px',
        width: '100%',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '24px',
          height: '24px',
          ...iconBadge,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px', // ⭐ align with text start
        }}
      >
        {React.cloneElement(icon as React.ReactElement<any>, {
          style: {
            display: 'block',
            width: '12px',
            height: '12px',
          },
        })}
      </div>

      {/* Text */}
      <span
        style={{
          lineHeight: '1.4', // ⭐ allow multi-line
          fontFeatureSettings: '"tnum"',
          wordBreak: 'break-word',
          flex: 1,
        }}
      >
        {text}
      </span>
    </div>
  );
}