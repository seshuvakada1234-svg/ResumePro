"use client";

import React from 'react';
import { Download } from 'lucide-react';

interface PDFDownloadButtonProps {
  onDownload: () => void;
  loading: boolean;
}

export default function PDFDownloadButton({ onDownload, loading }: PDFDownloadButtonProps) {
  return (
    <button
      type="button"
      onClick={onDownload}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download size={18} />
      {loading ? 'Generating...' : 'Download PDF'}
    </button>
  );
}
