import React from "react";

import Script from "next/script";
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
  if (process.env.KNQ_MAINTENANCE_MODE === 'true') {
    return (
      <html>
        <body>
          <div className="flex items-center justify-center h-dvh w-dvh bg-slate-100">
            <div className="text-center p-6">
              <h1 className="mt-4 text-3xl font-bold text-natural-500 tracking-wide">Maintenance Mode</h1>
              <p className="mt-2 text-gray-400 text-sm">
                Our website is currently undergoing scheduled maintenance.
                <br />
                We should be back shortly. Thank you for your patience.
              </p>
            </div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <React.StrictMode>
      <html lang="en">
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_GTM_ID}');
            `,
          }} />
        <body className={sans.className}>
          <noscript>
            <iframe
              height="0" width="0"
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_GTM_ID}`}
              style={{ display: 'none', visibility: 'hidden' }}></iframe>
          </noscript>
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
