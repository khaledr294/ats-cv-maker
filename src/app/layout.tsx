import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    default: "CV Maker - صانع السيرة الذاتية | Create Professional Resumes",
    template: "%s | CV Maker - صانع السيرة الذاتية",
  },
  description:
    "أنشئ سيرة ذاتية احترافية مجانًا بدعم العربية والإنجليزية. Create stunning, professional CVs with Arabic and English support, multiple templates, and ATS optimization.",
  keywords: [
    "CV maker",
    "resume builder",
    "professional CV",
    "Arabic CV",
    "free resume",
    "صانع سيرة ذاتية",
    "إنشاء CV",
    "سيرة ذاتية احترافية",
    "سيرة ذاتية عربية",
    "ATS optimization",
    "توافق ATS",
  ],
  authors: [{ name: "CV Maker Team" }],
  creator: "CV Maker",
  publisher: "CV Maker",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: ["en_US"],
    url: "https://cv-maker.com",
    siteName: "CV Maker - صانع السيرة الذاتية",
    title: "CV Maker - صانع السيرة الذاتية | Create Professional Resumes",
    description:
      "أنشئ سيرة ذاتية احترافية مجانًا. Create stunning, professional CVs for free.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "CV Maker - Professional Resume Builder",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Maker - صانع السيرة الذاتية",
    description:
      "أنشئ سيرة ذاتية احترافية مجانًا. Create professional CVs for free.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Add your Google Search Console verification code here after claiming your site
  // Get it from: https://search.google.com/search-console
  // verification: {
  //   google: "your-google-verification-code-here",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cairo.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
