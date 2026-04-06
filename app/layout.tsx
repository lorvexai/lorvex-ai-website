import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lorvexai.github.io/lorvexai";
const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
const socialImageUrl = `${normalizedSiteUrl}/og-image.png`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(`${normalizedSiteUrl}/`),
  title: "LorvexAI | Operationalizing Agentic AI for Enterprise Scale",
  description:
    "Operationalize Agentic AI with LorvexAI. We build production-ready LLM systems with governance-first controls for Finance and Healthcare.",
  keywords: [
    "Agentic AI Systems",
    "LLM Engineering for Banking",
    "NHS AI Triage Blueprint",
    "Enterprise RAG Governance",
    "AI-native treasury control tower",
    "enterprise AI architecture"
  ],
  authors: [{ name: "LorvexAI Editorial Team" }],
  icons: {
    icon: "/lorvex_icon.png",
    apple: "/lorvex_icon.png"
  },
  openGraph: {
    title: "LorvexAI | Operationalizing Agentic AI for Enterprise Scale",
    description:
      "Operationalize Agentic AI with governance-first controls for finance, healthcare, and NHS workflows.",
    url: siteUrl,
    siteName: "LorvexAI",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "LorvexAI"
      }
    ],
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "LorvexAI | Agentic AI for Enterprise",
    description:
      "Build production-grade agentic systems and enterprise RAG platforms with LorvexAI.",
    images: [socialImageUrl]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="relative pb-20 md:pb-0">
        <Header />
        <main>{children}</main>
        <MobileStickyCTA />
        <Footer />
      </body>
    </html>
  );
}

