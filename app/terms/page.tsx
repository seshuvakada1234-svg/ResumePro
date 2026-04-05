import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-indigo max-w-none space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using FreeResume, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Use of Website</h2>
            <p>
              You are granted a limited, non-exclusive, non-transferable license to use our resume builder for personal, non-commercial purposes. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Upload any malicious code or content</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p>
              You are solely responsible for the content you input into our resume builder. You represent and warrant that you have all necessary rights to use the information you provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
            <p>
              FreeResume is provided "as is" without any warranties. We shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our website or any errors in the resumes generated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Updates to Terms</h2>
            <p>
              We reserve the right to modify these Terms & Conditions at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the website after changes are posted constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions regarding these Terms & Conditions, you can contact us at:
            </p>
            <p className="font-semibold text-indigo-600">contact@freeresume.dev</p>
          </section>

          <p className="text-sm text-gray-400 mt-12">
            Last updated: April 5, 2026
          </p>
        </div>
      </div>
    </div>
  );
}
