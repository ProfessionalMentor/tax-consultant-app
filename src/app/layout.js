import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Law & Tax Consultant Pakistan | FBR & SECP Experts",
  description: "Premium Tax, FBR, and SECP corporate legal consulting for individuals and businesses across Pakistan.",
};

import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

import Chatbot from "@/components/Chatbot";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#040814] text-slate-200 overflow-x-hidden selection:bg-gold/30 selection:text-gold">
        <SmoothScrollProvider>

          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
          <Chatbot />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
