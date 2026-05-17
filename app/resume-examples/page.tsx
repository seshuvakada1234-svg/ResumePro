import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle2, Briefcase, Code, BarChart, PenTool, Smartphone, Database, Globe, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Resume Examples for Freshers 2026 | Role-Specific Samples India",
  description: "Browse 50+ professional resume examples for freshers and students in India. Software Engineer, Marketing, Sales, Data Science, and more. 100% Free to use.",
  alternates: { canonical: 'https://freeresume.dev/resume-examples' },
};

const EXAMPLES = [
  {
    role: "Software Engineer Fresher",
    icon: <Code className="text-indigo-600" />,
    summary: "B.Tech graduate with strong Java and DSA skills. 2+ web projects using React.",
    skills: ["Java", "Spring Boot", "MySQL", "React.js", "Git"],
    tips: "Focus on your GitHub links and technical projects."
  },
  {
    role: "Data Analyst",
    icon: <BarChart className="text-indigo-600" />,
    summary: "Passionate about data storytelling. Skilled in SQL, Python, and PowerBI.",
    skills: ["SQL", "Excel", "Python", "Tableau", "Statistics"],
    tips: "Highlight certifications from Coursera or Google Data Analytics."
  },
  {
    role: "Marketing Executive",
    icon: <Globe className="text-indigo-600" />,
    summary: "Creative thinker with a focus on SEO and Social Media growth.",
    skills: ["Google Ads", "SEO", "Canva", "Meta Ads", "Content Writing"],
    tips: "Mention specific metrics like 'Grew followers by 20%'."
  },
  {
    role: "HR Trainee",
    icon: <Briefcase className="text-indigo-600" />,
    summary: "MBA in HR with excellent communication skills and understanding of labor laws.",
    skills: ["Recruitment", "Payroll", "MS Office", "Communication", "Onboarding"],
    tips: "Focus on people skills and administrative efficiency."
  },
  {
    role: "Mechanical Engineer",
    icon: <Smartphone className="text-indigo-600" />,
    summary: "Knowledge of AutoCAD, SolidWorks, and Manufacturing processes.",
    skills: ["AutoCAD", "MATLAB", "SolidWorks", "Project Management", "Python"],
    tips: "Detail your workshop experience or final year machine project."
  },
  {
    role: "Content Writer",
    icon: <PenTool className="text-indigo-600" />,
    summary: "Ability to write SEO-optimized blogs and engaging technical copy.",
    skills: ["Creative Writing", "SEO", "WordPress", "Research", "Editing"],
    tips: "Link to your personal blog or Medium profile."
  }
];

export default function ResumeExamplesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main>
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200 py-20 px-4">
          <div className="max-w-6xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight">
              Resume <span className="text-indigo-600">Examples</span> for Indian Freshers
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Don't start from a blank page. Browse our library of 2026-ready, ATS-optimized resume samples designed for every major industry in India.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXAMPLES.map((ex) => (
              <div key={ex.role} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {ex.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{ex.role}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed italic border-l-2 border-indigo-100 pl-4">
                  "{ex.summary}"
                </p>
                <div className="mb-6 flex-grow">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Top Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {ex.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl mb-6">
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    <span className="text-indigo-600 font-bold">Pro Tip: </span>{ex.tips}
                  </p>
                </div>
                <Link href={`/builder?template=classic&role=${encodeURIComponent(ex.role)}`} className="w-full bg-indigo-600 text-white text-center py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  Use This Sample <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          {/* Detailed Content for SEO/AdSense */}
          <article className="mt-24 prose prose-slate lg:prose-xl max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-slate-900">How to Use These Resume Examples</h2>
            <p>
              Looking at <strong>resume examples for freshers in India</strong> is a great way to understand what recruiters are expecting from graduates in 2026. However, simply copying a sample word-for-word is a mistake. Here is how to customize these examples for your own career path:
            </p>
            
            <h3 className="font-bold text-2xl">1. Match the Job Description (JD)</h3>
            <p>
                If your target job at <strong>TCS</strong> mentions specific skills like "Cloud Computing" or "Python Scripting," ensure those keywords appear prominently in your skills section. The examples above are generic baselines—you must make them specific.
            </p>

            <h3 className="font-bold text-2xl">2. Focus on Achievements, Not Just Tasks</h3>
            <p>
                Instead of saying "Responsible for coding a website," say "Developed a responsive e-commerce website using React.js that handled 100+ mock transactions." Numbers add impact.
            </p>

            <h3 className="font-bold text-2xl text-indigo-600">Why ATS-Friendly Examples Matter</h3>
            <p>
                As we discuss in our <Link href="/ats-format" className="text-indigo-600 font-bold">ATS Resume Format</Link> guide, most large Indian companies use software to scan your resume. If your resume uses complex multi-column grids or relies on images, the ATS won't be able to read these examples. Every sample on this page is pre-tested to be 100% ATS-compliant.
            </p>

            <div className="bg-indigo-900 text-white p-10 rounded-[3rem] my-16 shadow-2xl">
                <h3 className="text-white text-3xl font-black mb-6">Frequently Asked Questions</h3>
                <div className="space-y-8">
                    <div>
                        <h4 className="font-bold text-indigo-200">Are these examples free to use?</h4>
                        <p className="text-indigo-100 opacity-80 text-sm">Yes, every example and template on FreeResume.dev is 100% free for students and job seekers. No payment required, ever.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-200">Can I use these for entry-level roles outside India?</h4>
                        <p className="text-indigo-100 opacity-80 text-sm">Absolutely. While these are optimized for the Indian market (mentioning degrees like B.Tech/MBA), the structural rules follow global ATS best practices.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-200">How long should my resume be?</h4>
                        <p className="text-indigo-100 opacity-80 text-sm">For freshers, always keep it to 1 single page. Recruiting managers rarely spend more than a few seconds scanning your document.</p>
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900">Common Sections in Fresher Resumes</h2>
            <ul className="space-y-4">
                <li>
                    <strong>Objective:</strong> A quick intro for freshers explaining your degree and career goal.
                </li>
                <li>
                    <strong>Education:</strong> Your 10th, 12th, and Degree details. Include CGPA if it's above 7.5.
                </li>
                <li>
                    <strong>Technical Projects:</strong> The most important part for engineers. Describe your 2-3 best projects.
                </li>
                <li>
                    <strong>Internships:</strong> Any professional experience, even if unpaid or part-time.
                </li>
                <li>
                    <strong>Certifications:</strong> Showcase your learning from platforms like NPTEL, Coursera, or Udemy.
                </li>
            </ul>
          </article>
        </div>

        {/* Closing CTA */}
        <div className="max-w-6xl mx-auto px-4 py-20">
            <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-center text-white space-y-8 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                 <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Ready to Land Your <br/> First Job?</h2>
                 <p className="text-xl text-indigo-100 max-w-2xl mx-auto font-medium">Build a job-winning ATS resume in 5 minutes using our official FreeResume.dev builder.</p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Link href="/builder" className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                        Build Free Resume Now <ArrowRight size={20} />
                    </Link>
                    <Link href="/" className="bg-indigo-500/30 border-2 border-indigo-300 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500/50 transition-all">
                        Go Home
                    </Link>
                 </div>
            </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} FreeResume.dev - Helping India's next generation get hired.
        </div>
      </footer>
    </div>
  );
}
