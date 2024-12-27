import ThemeSwitch from "@/components/panel/ThemeSwitch";
import Sidebar from "@/components/sidebar/sidebar";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/blue.css";
import "../styles/style.css";
import "../styles/theme.css";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "System Developer, Aspiring to be a supermodel which can do Hardware and software Application ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="temp-layout">
            <ThemeSwitch />
            <Sidebar />
            {children}
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
