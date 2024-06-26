import React from "react";
import { Urbanist as Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const sans = Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Keys & Quests",
  description: "Switch Reviews, Mechanical Keyboards & More...",
};

export default function RootLayout({ children }) {
  return (
    <React.StrictMode>
      <html lang="en">
        <body className={sans.className}>
          <main className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </main>
        </body>
      </html>
    </React.StrictMode>
  );
}
