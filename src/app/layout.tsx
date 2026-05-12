import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-satoshi", // Using Plus Jakarta Sans as our Satoshi alternative
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manacles Solutions | Global Partner in Sourcing & Logistics",
  description: "Providing reliable sourcing, procurement, supply chain, and logistics solutions across multiple industries worldwide.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-brand-charcoal text-white flex flex-col pt-24">
        <LenisProvider>
          <Header />
          <div className="flex-1 relative z-20 bg-brand-charcoal">
            {children}
          </div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
