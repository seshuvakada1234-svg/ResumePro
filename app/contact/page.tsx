import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, ShieldCheck, Briefcase } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | FreeResume - Get in Touch',
  description: 'Have questions or need help with your resume? Reach out to the FreeResume team via email for support, business inquiries, or feedback.',
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Contact Us</h1>
            <p className="text-gray-500 mb-12 text-lg leading-relaxed">
              Have questions or need help? Reach out to us. Our team is dedicated to helping Indian freshers build the perfect ATS-optimized resume.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100">
                <Mail size={28} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">General</h2>
              <p className="text-gray-600 text-sm mb-6">For general inquiries and information.</p>
              <a href="mailto:contact@freeresume.dev" className="text-indigo-600 font-bold hover:underline break-all">
                contact@freeresume.dev
              </a>
            </div>
            
            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-100">
                <ShieldCheck size={28} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Support</h2>
              <p className="text-gray-600 text-sm mb-6">Need technical help with the builder?</p>
              <a href="mailto:support@freeresume.dev" className="text-blue-600 font-bold hover:underline break-all">
                support@freeresume.dev
              </a>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200">
                <Briefcase size={28} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Business</h2>
              <p className="text-gray-600 text-sm mb-6">For ads and partnership inquiries.</p>
              <a href="mailto:ads@freeresume.dev" className="text-gray-900 font-bold hover:underline break-all">
                ads@freeresume.dev
              </a>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-gray-900 text-white rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <MessageSquare className="text-indigo-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold">We Value Your Feedback</h3>
              </div>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl">
                FreeResume is built for the community. If you have suggestions for new templates, ATS tips, or features, we'd love to hear from you.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Report a technical bug',
                  'Request a new template',
                  'ATS optimization questions',
                  'Advertising opportunities'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
