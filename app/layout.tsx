import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ResumeFunnelProvider } from "@/context/ResumeFunnelContext";
import Script from "next/script";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreeResume – Free ATS Resume Builder & Resume Checker",
  description:
    "Build ATS-friendly resumes online for free. Download PDF instantly and improve your chances of getting shortlisted.",
  keywords: [
    "free resume builder",
    "ATS resume builder",
    "resume checker",
    "ATS resume checker",
    "resume templates",
    "resume examples",
    "resume for freshers",
    "software engineer resume",
    "teacher resume format",
    "HR resume template",
    "marketing resume template",
    "college resume template",
    "resume PDF download",
    "best ATS resume builder free",
    "free resume builder without watermark",
    "resume templates for freshers in India",
    "ATS score checker online",
    "software engineer resume template free",
    "teacher resume examples",
    "resume format for TCS Infosys Wipro",
  ],
  metadataBase: new URL("https://freeresume.dev"),
  alternates: {
    canonical: "https://freeresume.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FreeResume – Free ATS Resume Builder & Resume Checker",
    description: "Build ATS-friendly resumes online for free. Download PDF instantly and improve your chances of getting shortlisted.",
    url: "https://freeresume.dev",
    siteName: "FreeResume",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://freeresume.dev/logo.png",
        width: 1200,
        height: 630,
        alt: "FreeResume ATS Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeResume – Free ATS Resume Builder & Resume Checker",
    description: "Build ATS-friendly resumes online for free. Download PDF instantly and improve your chances of getting shortlisted.",
    images: ["https://freeresume.dev/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://freeresume.dev/#website",
        "url": "https://freeresume.dev",
        "name": "FreeResume",
        "description": "Free ATS Resume Builder and Resume Checker for students, freshers and professionals.",
        "publisher": {
          "@id": "https://freeresume.dev/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://freeresume.dev/#organization",
        "name": "FreeResume",
        "url": "https://freeresume.dev",
        "logo": "https://freeresume.dev/logo.png",
        "description": "Free ATS Resume Builder and Resume Checker for students, freshers and professionals."
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://freeresume.dev/#software",
        "name": "FreeResume Builder",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* ✅ Monetag Verification */}
        <meta name="monetag" content="9cfb02b252d4b116d21fe5348c820725" />

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

        {/* ✅ Theme Color & Favicon/Meta */}
        <meta name="theme-color" content="#5B4DFF" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="https://freeresume.dev/logo.png" />
      </head>

      <body className={`${inter.className} overflow-x-hidden`}>
        {/* ✅ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ResumeFunnelProvider>
          <Navbar />
          <ServiceWorkerRegister />
          {children}
        </ResumeFunnelProvider>
        <Footer />

        {/* ✅ Monetag In - Page Push (Zone ID 11149485) */}
        <Script
          id="monetag-in-page-push"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(s){
                s.dataset.zone='11149485';
                s.src='https://nap5k.com/tag.min.js';
              })(
                [document.documentElement, document.body]
                  .filter(Boolean)
                  .pop()
                  .appendChild(document.createElement('script'))
              );
            `,
          }}
        />

        {/* ✅ Monetag Vignette Banner (Zone ID 11149486) */}
        <Script
          id="monetag-vignette-banner"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(s){
                s.dataset.zone='11149486';
                s.src='https://n6wxm.com/vignette.min.js';
              })(
                [document.documentElement, document.body]
                  .filter(Boolean)
                  .pop()
                  .appendChild(document.createElement('script'))
              );
            `,
          }}
        />
      </body>
    </html>
  );
}