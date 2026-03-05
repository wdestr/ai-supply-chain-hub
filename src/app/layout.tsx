import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PageShell from "@/components/PageShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://resource-hub-rosy.vercel.app'),
  title: {
    default: "AI in Supply Chain Resource Hub",
    template: "%s | AI in Supply Chain Resource Hub",
  },
  description: "Your comprehensive resource for AI in supply chain management. Explore 470+ tools, use cases, platforms, and learning resources.",
  keywords: ["AI", "supply chain", "machine learning", "logistics", "demand forecasting", "procurement", "warehouse automation"],
  openGraph: {
    title: "AI in Supply Chain Resource Hub",
    description: "Explore 470+ AI tools, use cases, platforms, and learning resources for supply chain professionals.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI in Supply Chain Resource Hub",
    description: "Explore 470+ AI tools, use cases, platforms, and learning resources for supply chain professionals.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <AnalyticsTracker />
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
