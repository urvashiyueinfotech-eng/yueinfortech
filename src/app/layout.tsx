import type { Metadata } from "next";
import { Suspense } from "react";
import { Figtree } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle } from "lucide-react";
import NextTopLoader from 'nextjs-toploader';
import type { MainService } from "@/data/main-services.data";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const DISABLE_INDEXING = process.env.DISABLE_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL("https://yueinfotech.com"),
  title: {
    default: "Yue Infotech | Web, SEO & IT Solutions",
    template: "%s | Yue Infotech",
  },
  verification: {
    google: "gsewmkCfzU4gMRkf-liHZ04BQaHf3B3vwT_W2YlQEmc",
  },
  ...(DISABLE_INDEXING
    ? {
        robots: {
          index: false,
          follow: true,
          nocache: true,
        },
        googleBot: {
          index: false,
          follow: true,
          noimageindex: true,
        },
      }
    : {}),
  icons:{
    icon: "/ylogo.png",
    shortcut: "/ylogo.png",
    apple: "/ylogo.png",
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

const GA_MEASUREMENT_ID = "G-C7F2MF1Q0J";
const SHOULD_LOAD_GA = process.env.NODE_ENV === "production";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function fetchNavServices(): Promise<MainService[]> {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) return [];

    try {
      // List documents to get only the doc names (slugs)
      const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/services?pageSize=100`,
        { next: { revalidate: 86400 } }
      );
      if (!res.ok) return [];
      const rows = await res.json();
      return rows
        .map((doc: any) => {
          const slug = doc.name?.split("/").pop() ?? "";
          if (!slug) return null;
          const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
          return {
            id: slug,
            eyebrow: "",
            title,
            description: "",
            image: "",
            services: [],
            primaryHref: `/services/${slug}`,
            slug,
          } as MainService;
        })
        .filter(Boolean) as MainService[];
    } catch {
      return [];
    }
  }

  let servicesFromServer: MainService[] = [];
  try {
    servicesFromServer = await fetchNavServices();
  } catch (err) {
    console.warn("Nav services fetch skipped:", err);
    servicesFromServer = [];
  }

  return (
    <html lang="en" className={figtree.variable}>
      <head>
        {SHOULD_LOAD_GA && (
          <>
            <Script id="gtag-stub" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
              `}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
            />
          </>
        )}
      </head>
      <body
        className={`${figtree.className} font-body antialiased text-slate-600 bg-slate-50 min-h-screen`}
      >
        <Providers>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <Navbar servicesFromServer={servicesFromServer} />
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
