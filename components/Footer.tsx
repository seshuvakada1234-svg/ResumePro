'use client';

import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <FileText className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">FreeResume</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-6">
              Empowering Indian freshers to land their first job with professional, ATS-optimized resumes. Built with passion for the Indian student community.
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
            <ul className="space-y-3 text-gray-500 text-sm font-medium">
              <li>
                <Link href="/resume-guide" className="hover:text-indigo-600 transition-colors">
                  Resume for Freshers
                </Link>
              </li>
              <li>
                <Link href="/ats-format" className="hover:text-indigo-600 transition-colors">
                  ATS Resume Format
                </Link>
              </li>
              <li>
                <Link href="/resume-examples" className="hover:text-indigo-600 transition-colors">
                  Resume Examples
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-3 text-gray-500 text-sm font-medium">
              <li>
                <Link href="/about" className="hover:text-indigo-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-bold text-gray-900 mb-6">Contact</h4>
            <ul className="space-y-3 text-gray-500 text-sm font-medium">
              <li className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">General Contact</span>
                <a href="mailto:contact@freeresume.dev" className="hover:text-indigo-600 transition-colors">contact@freeresume.dev</a>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Technical Support</span>
                <a href="mailto:support@freeresume.dev" className="hover:text-indigo-600 transition-colors">support@freeresume.dev</a>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Business & Ads</span>
                <a href="mailto:ads@freeresume.dev" className="hover:text-indigo-600 transition-colors">ads@freeresume.dev</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm font-medium">© 2026 FreeResume. All rights reserved.</p>
          <div className="flex gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
