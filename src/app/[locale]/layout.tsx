import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Header from "../_global_components/header/Header";
import { NextIntlClientProvider } from "next-intl";
import AuthProvider from "../_context/AuthProvider";
import QueryProvider from "../_context/QueryProvider";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

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
    <html lang={locale}>
      <body>
        <QueryProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
