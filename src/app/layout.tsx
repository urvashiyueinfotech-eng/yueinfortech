import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

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
      <body className={`${figtree.className} font-body antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
