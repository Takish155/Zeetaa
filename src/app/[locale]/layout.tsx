import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import QueryProvider from "@/_context/QueryProvider";
import AuthProvider from "@/_context/AuthProvider";
import HamburgerHeader from "@/_global_components/header/HamburgerHeader";
import Header from "@/_global_components/header/Header";
import { Footer } from "@/_global_components/footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Zeetaa",
  description: "Social media application",
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} className={`${poppins.variable}`}>
      <body>
        <QueryProvider>
          <AuthProvider>
            <Header />
            <div className="container">
              <HamburgerHeader />
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
