'use client';

import React, { useRef, useState } from 'react';
import { Upload, FileText, X, Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onUpload, isAnalyzing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndUpload(file);
  };

  const validateAndUpload = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF or DOCX file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB.');
      return;
    }
    onUpload(file);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-indigo-100 border-2 border-dashed border-gray-200 relative overflow-hidden group"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-indigo-600/10 backdrop-blur-[2px] z-10 flex items-center justify-center"
            >
              <div className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4">
                <Upload className="text-indigo-600 animate-bounce" size={48} />
                <span className="text-xl font-bold text-indigo-600">Drop your resume here</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-center text-center space-y-8 relative z-0">
          <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <FileText className="text-indigo-600" size={40} />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Upload Your Resume</h2>
            <p className="text-xl text-gray-500 max-w-md mx-auto">
              Get your ATS score in seconds. We support PDF and DOCX formats.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <Upload size={24} />
              )}
              {isAnalyzing ? 'Analyzing...' : 'Select Resume File'}
            </button>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">or drag and drop</span>
          </div>

          <div className="flex items-center gap-6 pt-8 border-t border-gray-100 w-full justify-center">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
              <Zap size={16} className="text-amber-500" fill="currentColor" />
              Instant Analysis
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
              <Zap size={16} className="text-amber-500" fill="currentColor" />
              Job Matching
            </div>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.docx"
        />
      </motion.div>
    </div>
  );
};
