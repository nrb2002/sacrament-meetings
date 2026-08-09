import type { Metadata } from "next";
import { EB_Garamond, Source_Sans_3 } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";
import NavLinks from "@/components/NavLinks";
import Footer from "@/components/Footer";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans-3",
});

export const metadata: Metadata = {
  title: {
    default: "Sacrament Meetings | Kasa-Vubu Ward",
    template: "%s | Sacrament Meetings",
  },
  description:
    "Sacrament meeting plans, schedules, speakers, hymns, and announcements for Kasa-Vubu Ward.",
  metadataBase: new URL("https://sacrament-meetings-dzfu.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ebGaramond.className}>
        <Header />
        <NavLinks />

        <main className="mx-auto min-h-screen max-w-6xl px-6 py-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
