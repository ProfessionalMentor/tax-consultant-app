import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata = {
  title: "Law & Tax Consultant Pakistan | FBR & SECP Experts",
  description: "Premium Tax, FBR, and SECP corporate legal consulting for individuals and businesses across Pakistan.",
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#040814] text-slate-200 overflow-x-hidden selection:bg-gold/30 selection:text-gold">
        <>

          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
          <Chatbot />
        </>
      </body>
    </html>
  );
}
