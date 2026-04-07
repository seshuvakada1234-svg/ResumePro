import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Footer from "@/components/Footer";
import { ResumeFunnelProvider } from "@/context/ResumeFunnelContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreeResume – Free ATS Resume Builder for Freshers in India",
  description: "Build professional ATS-friendly resumes for free. Designed for freshers and job seekers in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6397085715997255"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ResumeFunnelProvider>
          {children}
        </ResumeFunnelProvider>
        <Footer />
      </body>
    </html>
  );
}
