import React from "react";

import Script from "next/script";
import { Poppins as Sans } from "next/font/google";

import Header from "@/blocks/Header";
import Footer from "@/blocks/Footer";

import Maintenance from "@/components/Maintenance";
import GlitchCursor from '@/components/GlitchCursor'

import "./globals.css";

const sans = Sans({
  subsets: [ 'latin' ],
  weight: [ '100', '200', '300', '400', '500', '600', '700', '800', '900' ],
});

export const metadata = {
  title: "Keys & Quests",
  description: "Mechanical Keyboards, Switch Reviews & More...",
};

export default function RootLayout({ children }) {
  if (process.env.KNQ_MAINTENANCE_MODE === 'true') {
    return (
      <Maintenance />
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
          <GlitchCursor />
        </body>
      </html>
    </React.StrictMode>
  );
}
