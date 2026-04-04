'use client';

import React from 'react';

interface SafeTextProps {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

export default function SafeText({
  text = '',
  className = '',
  style = {},
  as: Component = 'p',
}: SafeTextProps) {
  const baseStyles: React.CSSProperties = {
    // 🔥 CRITICAL WRAPPING
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',

    // 🔥 FLEX FIX (MOST IMPORTANT)
    flex: 1,
    minWidth: 0,

    // Layout
    lineHeight: '1.4',
    margin: 0,

    // PDF rendering
    WebkitFontSmoothing: 'antialiased',
  };

  if (!text) return null;

  return (
    <Component
      className={className}
      style={{
        ...baseStyles,
        ...style,
      }}
    >
      {text}
    </Component>
  );
}