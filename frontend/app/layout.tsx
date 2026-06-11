import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import GTMProvider from "@/components/analytics/GTMProvider";
import GA4Provider from "@/components/analytics/GA4Provider";
import MetaPixel from "@/components/analytics/MetaPixel";
import PageLoader from "@/components/ui/PageLoader";
import SearchOverlay from "@/components/ui/SearchOverlay";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";
import PageTransition from "@/components/ui/PageTransition";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
import { Poppins, Source_Sans_3 } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-source-sans" });

export const metadata: Metadata = {
  metadataBase: new URL('https://northeastforu.com'),
  title: {
    default: "NorthEastForU | Explore North East India",
    template: "%s | NorthEastForU"
  },
  description: "Comprehensive travel guide for North East India. Discover states, cities, attractions, and activities in the Seven Sisters and Sikkim.",
  keywords: ["North East India", "Seven Sisters", "Travel Guide", "Assam", "Meghalaya", "Arunachal Pradesh", "Sikkim", "Nagaland", "Manipur", "Mizoram", "Tripura", "Northeast Tourism"],
  authors: [{ name: "NorthEastForU Team" }],
  creator: "NorthEastForU",
  publisher: "NorthEastForU",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://northeastforu.com',
    siteName: 'NorthEastForU',
    title: 'NorthEastForU | Ultimate North East India Travel Guide',
    description: 'Explore the hidden gems of North East India with our curated guides and itineraries.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NorthEastForU - Explore North East India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NorthEastForU | Explore North East India',
    description: 'Comprehensive travel guide for the Seven Sisters and Sikkim.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'G-XXXXXXXXXX', // Placeholder - User can replace with actual ID
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${dmSans.variable} ${poppins.variable} ${sourceSans.variable} font-sans min-h-screen flex flex-col`}>
        {/* Organization JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'NorthEastForU',
              url: 'https://northeastforu.com',
              logo: 'https://northeastforu.com/logo.png',
              sameAs: [
                'https://www.facebook.com/northeastforu',
                'https://www.instagram.com/northeastforu',
                'https://twitter.com/northeastforu',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-8811909095',
                contactType: 'customer service',
              },
            }),
          }}
        />
        <Header />
        <Suspense fallback={null}>
          <PageLoader />
          <SearchOverlay />
          <WhatsAppButton />
          <ChatWidget />
        </Suspense>
        <main className="flex-grow pt-[89px]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />

        {/* Analytics at bottom to avoid blocking hydration of core UI */}
        <GTMProvider />
        <GA4Provider />
        <MetaPixel />
      </body>
    </html>
  );
}
