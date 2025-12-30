import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle } from "lucide-react";
import NextTopLoader from 'nextjs-toploader';

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yueinfotech.com"),
  title: {
    default: "Yue Infotech | Web, SEO & IT Solutions",
    template: "%s | Yue Infotech",
  },
  description: "Fast, modern websites, AI-optimized SEO, performance ads, powerful content, and secure IT solutions to help your business grow.",
  openGraph: {
    title: "Yue Infotech | Web, SEO & IT Solutions",
    description: "Fast, modern websites, AI-optimized SEO, performance ads, powerful content, and secure IT solutions to help your business grow.",
    url: "https://yueinfotech.com",
    siteName: "Yue Infotech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yue Infotech | Web, SEO & IT Solutions",
    description: "Fast, modern websites, AI-optimized SEO, performance ads, powerful content, and secure IT solutions to help your business grow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body
        className={`${figtree.className} font-body antialiased text-slate-600 bg-slate-50 min-h-screen`}
      >
        <Providers>
          <Navbar />
          <NextTopLoader
          color="#4f46e5"   // Your brand indigo color
          initialPosition={0.08}
          crawlSpeed={200}
          height={6}        // Height of the bar
          crawl={true}
          showSpinner={false} // Hides the spinner circle (cleaner look)
          easing="ease"
          speed={200}
          shadow="0 0 10px #4f46e5,0 0 5px #4f46e5" // Glowing shadow effect
        />
          {children}
          <a
            href="https://wa.me/918859366292"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#128C7E] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label="Chat with us on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Chat on WhatsApp</span>
          </a>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
