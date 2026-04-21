import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ResumeFunnelProvider } from "@/context/ResumeFunnelContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreeResume | Official Free ATS Resume Builder for Freshers",
  description:
    "Build your professional CV on the official FreeResume.dev. The #1 free ATS resume builder for freshers in India. No hidden fees, download PDF instantly.",
  keywords: [
    "FreeResume",
    "FreeResume.dev",
    "resume builder free",
    "ATS resume India",
    "resume for freshers",
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
        {/* ✅ AdSense Account Verification */}
        <meta
          name="google-adsense-account"
          content="ca-pub-6397085715997255"
        />

        {/* ✅ Google AdSense Auto Ads (Raw tag to avoid data-nscript warning) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6397085715997255"
          crossOrigin="anonymous"
        ></script>

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