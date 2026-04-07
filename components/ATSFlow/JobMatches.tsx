'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, DollarSign, ArrowRight, ExternalLink, Zap } from 'lucide-react';

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  match: number;
  url: string;
}

interface JobMatchesProps {
  jobs: Job[];
}

export const JobMatches: React.FC<JobMatchesProps> = ({ jobs }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Job Matches 🔥</h2>
          <p className="text-xl text-gray-500 font-medium">
            Based on your resume, these roles are a perfect fit for you.
          </p>
        </div>
        <button
          onClick={() => window.open('https://adzuna.com', '_blank')}
          className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
        >
          View More Jobs 🚀
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-indigo-50 border border-gray-100 flex flex-col gap-6 group hover:border-indigo-200 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="bg-indigo-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Briefcase size={24} />
              </div>
              <div className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                <Zap size={12} fill="currentColor" />
                {job.match}% Match
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{job.company}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <MapPin size={16} className="text-indigo-400" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <DollarSign size={16} className="text-indigo-400" />
                {job.salary}
              </div>
            </div>

            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full py-4 bg-gray-50 text-indigo-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-indigo-600 group-hover:text-white transition-all"
            >
              View Job <ExternalLink size={16} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
