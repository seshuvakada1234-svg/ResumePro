import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ResumeFunnelProvider } from "@/context/ResumeFunnelContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free Resume Builder for Freshers in India | ATS Resume Maker",
  description:
    "Create professional ATS resumes for free. Best resume builder for freshers in India. Download instantly and get hired faster.",
  keywords: [
    "resume builder free",
    "ATS resume India",
    "resume for freshers",
    "CV maker free",
  ],
  metadataBase: new URL("https://freeresume.dev"),
  alternates: {
    canonical: "https://freeresume.dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ AdSense Script (CRITICAL - RAW) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6397085715997255"
          crossOrigin="anonymous"
        ></script>

        {/* ✅ Extra AdSense verification meta (optional boost) */}
        <meta
          name="google-adsense-account"
          content="ca-pub-6397085715997255"
        />

        {/* ✅ Canonical */}
        <link rel="canonical" href="https://freeresume.dev" />
      </head>

      <body className={`${inter.className} overflow-x-hidden`}>
        <ResumeFunnelProvider>
          <Navbar />
          {children}
        </ResumeFunnelProvider>
        <Footer />
      </body>
    </html>
  );
}