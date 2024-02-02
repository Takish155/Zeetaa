import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import QueryProvider from "@/_context/QueryProvider";
import AuthProvider from "@/_context/AuthProvider";
import Header from "@/_global_components/header/Header";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang={locale} className={poppins.className}>
      <Script src="https://kit.fontawesome.com/1142d85068.js" />
      <body>
        <QueryProvider>
          <AuthProvider>
            <div className="container">
              <Header />
              {children}
            </div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
