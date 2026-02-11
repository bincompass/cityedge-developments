import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";
import StructuredData from "@/components/shared/StructuredData";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "سيتي إيدج للتطوير العقاري | المطور العقاري الوطني",
  description:
    "سيتي إيدج للتطوير العقاري هي شركة رائدة في مجال التطوير العقاري في مصر، تقدم مشروعات سكنية وتجارية فاخرة في أرقى المواقع مثل العلمين الجديدة، القاهرة الجديدة، والشيخ زايد.",
  icons: {
    icon: "/fav-icon.svg",
    shortcut: "/fav-icon.svg",
    apple: "/fav-icon.svg",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/fav-icon.svg",
    },
  },
  keywords: [
    "سيتي إيدج للتطوير العقاري",
    "شركة سيتي إيدج",
    "City Edge Developments",
    "عقارات مصر",
    "العلمين الجديدة",
    "أبراج العلمين",
    "مشروع المقصد",
    "مشروع إيتابا",
    "القاهرة الجديدة",
    "الشيخ زايد",
    "المنصورة الجديدة",
    "مطور عقاري",
    "خدمات الصيانة سيتي إيدج",
    "حجز دخول الشاطئ العلمين",
    "North Edge Towers",
    "The Gate Towers",
    "Mazarine New Alamein",
    "Etapa Sheikh Zayed",
    "Al Maqsad New Capital",
    "Egyptian real estate",
  ],
  authors: [{ name: "City Edge Developments" }],
  creator: "City Edge Developments",
  publisher: "City Edge Developments",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  openGraph: {
    title: "سيتي إيدج للتطوير العقاري | المطور العقاري الوطني",
    description:
      "سيتي إيدج للتطوير العقاري هي شركة رائدة في مجال التطوير العقاري في مصر، تقدم مشروعات سكنية وتجارية فاخرة في أرقى المواقع.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "City Edge Developments",
    locale: "ar_AR",
    type: "website",
    images: [
      {
        url: "/assets/images/heros/hero.jpg",
        width: 1200,
        height: 630,
        alt: "سيتي إيدج للتطوير العقاري - المطور العقاري الوطني",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "سيتي إيدج للتطوير العقاري | المطور العقاري الوطني",
    description:
      "سيتي إيدج للتطوير العقاري هي شركة رائدة في مجال التطوير العقاري في مصر، تقدم مشروعات سكنية وتجارية فاخرة.",
    images: ["/assets/images/heros/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <noscript>
          <style>{`
            /* Ensure all content is visible when JavaScript is disabled */
            * {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className={`${manrope.variable} antialiased font-sans`}>
        <StructuredData />
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
