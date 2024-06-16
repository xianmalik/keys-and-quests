import { ReactNode } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function Layout ({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      <Footer />
    </main>
  );
}
