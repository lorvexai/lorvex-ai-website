import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lorvexai.github.io/lorvexai";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lorvex AI | AI Consulting & LLM Engineering",
  description:
    "Lorvex AI delivers enterprise AI systems, LLM engineering, and agentic platforms for high-impact decision automation.",
  icons: {
    icon: "/lorvex_icon.png",
    apple: "/lorvex_icon.png"
  },
  openGraph: {
    title: "Lorvex AI | AI Consulting & LLM Engineering",
    description:
      "AI consulting, LLM engineering, and agentic AI systems for enterprise transformation.",
    url: siteUrl,
    siteName: "Lorvex AI",
    images: ["/og.svg"],
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorvex AI",
    description: "AI consulting, LLM engineering, and agentic AI systems."
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="relative">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
