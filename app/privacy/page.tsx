import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-indigo max-w-none space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Welcome to FreeResume. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Data Collection</h2>
            <p>
              We collect information that you voluntarily provide to us when using our resume builder, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Professional Experience and Education</li>
              <li>Any other data you include in your resume</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Use of Cookies and Google AdSense</h2>
            <p>
              We use cookies to enhance your browsing experience and analyze our traffic. We also use Google AdSense to serve advertisements. Google, as a third-party vendor, uses cookies to serve ads based on your visit to our site and other sites on the Internet.
            </p>
            <p>
              Users may opt out of personalized advertising by visiting Google's Ads Settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Data Protection</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. Your resume data is stored locally in your browser and is only sent to our servers if you explicitly choose to save or share it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, you can contact us at:
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
