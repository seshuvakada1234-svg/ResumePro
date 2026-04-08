'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AIFeedback } from '@/constants/generateAIFeedback';
import {
  CheckCircle2, AlertTriangle, Lightbulb, Tags, Wand2,
  ChevronDown, ChevronUp, Sparkles, ArrowRight
} from 'lucide-react';

interface AIFeedbackPanelProps {
  feedback: AIFeedback;
}

// ─── Section wrapper with expand/collapse ────────────────────────────────────
function Section({
  icon, title, color, items, defaultOpen = true,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  items: React.ReactNode[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-5 py-4 ${color} transition-colors`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-bold text-sm tracking-wide">{title}</span>
          <span className="text-xs font-semibold opacity-60 bg-white/40 rounded-full px-2 py-0.5">
            {items.length}
          </span>
        </div>
        {open ? <ChevronUp size={16} className="opacity-50" /> : <ChevronDown size={16} className="opacity-50" />}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="px-5 py-4 space-y-3 bg-white">
              {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                  <ArrowRight size={14} className="mt-0.5 shrink-0 text-gray-300" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export const AIFeedbackPanel: React.FC<AIFeedbackPanelProps> = ({ feedback }) => {
  const toneStyles = {
    strong:   { bg: 'bg-emerald-50',  border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', label: 'Strong Resume' },
    moderate: { bg: 'bg-amber-50',    border: 'border-amber-200',   badge: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-500',   label: 'Needs Improvement' },
    weak:     { bg: 'bg-red-50',      border: 'border-red-200',     badge: 'bg-red-100 text-red-700',         dot: 'bg-red-500',     label: 'Needs Major Work' },
  };
  const tone = toneStyles[feedback.summaryTone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">AI Resume Review</h2>
          <p className="text-xs text-gray-400 font-medium">Smart rule-based analysis · no data sent anywhere</p>
        </div>
      </div>

      {/* Summary card */}
      <div className={`rounded-2xl border p-5 mb-5 ${tone.bg} ${tone.border}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className={`w-2 h-2 rounded-full ${tone.dot}`} />
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tone.badge}`}>
            {tone.label}
          </span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{feedback.summary}</p>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        <Section
          icon={<CheckCircle2 size={16} className="text-emerald-600" />}
          title="Strengths"
          color="bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
          items={feedback.strengths.map(s => <span>{s}</span>)}
          defaultOpen={true}
        />

        <Section
          icon={<AlertTriangle size={16} className="text-amber-600" />}
          title="Weaknesses"
          color="bg-amber-50 text-amber-800 hover:bg-amber-100"
          items={feedback.weaknesses.map(w => <span>{w}</span>)}
          defaultOpen={true}
        />

        <Section
          icon={<Lightbulb size={16} className="text-blue-600" />}
          title="Improvements"
          color="bg-blue-50 text-blue-800 hover:bg-blue-100"
          items={feedback.improvements.map(i => <span>{i}</span>)}
          defaultOpen={false}
        />

        {/* Missing keywords — pill style */}
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 bg-purple-50 text-purple-800">
            <Tags size={16} className="text-purple-600" />
            <span className="font-bold text-sm tracking-wide">Missing Keywords</span>
            <span className="text-xs font-semibold opacity-60 bg-white/40 rounded-full px-2 py-0.5">
              {feedback.missingKeywords.length}
            </span>
          </div>
          <div className="px-5 py-4 bg-white flex flex-wrap gap-2">
            {feedback.missingKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-100"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Rewritten bullets */}
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 bg-rose-50 text-rose-800">
            <Wand2 size={16} className="text-rose-600" />
            <span className="font-bold text-sm tracking-wide">Suggested Rewrites</span>
            <span className="text-xs font-semibold opacity-60 bg-white/40 rounded-full px-2 py-0.5">
              {feedback.rewrittenPoints.length}
            </span>
          </div>
          <div className="px-5 py-4 bg-white space-y-4">
            {feedback.rewrittenPoints.map((pt, i) => (
              <div key={i} className="space-y-2">
                <div className="flex gap-2 items-start">
                  <span className="mt-0.5 shrink-0 text-xs font-bold text-red-400 bg-red-50 px-1.5 py-0.5 rounded">Before</span>
                  <p className="text-sm text-gray-400 line-through leading-relaxed">{pt.original}</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="mt-0.5 shrink-0 text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">After</span>
                  <p className="text-sm text-gray-800 font-medium leading-relaxed">{pt.rewritten}</p>
                </div>
                {i < feedback.rewrittenPoints.length - 1 && (
                  <hr className="border-gray-100 mt-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-gray-300 mt-6 font-medium">
        Analysis generated locally · resume text never leaves your browser
      </p>
    </motion.div>
  );
};