import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free ATS Resume Builder for Freshers India | ResumePro",
  description: "Build a professional, ATS-friendly resume for free. Optimized for freshers in India. Real-time preview, multiple templates, and one-click PDF download. No watermark.",
  keywords: "Free resume builder India, ATS resume builder free, Resume builder for freshers, Professional resume maker, Free CV builder",
  authors: [{ name: "ResumePro India" }],
  openGraph: {
    type: "website",
    url: "https://resumepro.in/",
    title: "Free ATS Resume Builder for Freshers India | ResumePro",
    description: "Build a professional, ATS-friendly resume for free. Optimized for freshers in India. Real-time preview, multiple templates, and one-click PDF download.",
    images: ["https://resumepro.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ATS Resume Builder for Freshers India | ResumePro",
    description: "Build a professional, ATS-friendly resume for free. Optimized for freshers in India. Real-time preview, multiple templates, and one-click PDF download.",
    images: ["https://resumepro.in/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ResumePro India",
    "url": "https://resumepro.in",
    "description": "Free ATS Resume Builder for Freshers in India. Create job-winning resumes in minutes.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {children}
      </body>
    </html>
  );
}
