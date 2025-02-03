"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import navigation from '@/content/navigation';
import Socials from "../Socials";
import { MenuIcon } from "lucide-react";

export default function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <button className="masthead-btn hamburger-btn !bg-blue-200">
            <MenuIcon size={22} />
          </button>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="h-full w-80 border-r-4 border-[#222]">
        <div className="p-2 flex flex-col h-full justify-between">
          {/* Top Part */}
          <div>
            <h2 className="text-lg font-semibold -mt-[2px]">
              <a href="/" className="text-xl font-bold tracking-widest uppercase text-center mb-6">
                Keys And Quests
              </a>
            </h2>
            <ul className="mt-4 space-y-2">
              {[...navigation.left, ...navigation.right].map(({ path, title, target = '_self' }) => (
                <li key={path} className="navbar-item">
                  <a href={path} className="text-sm font-medium text-[#222] block px-4 py-2 border-2 border-transparent hover:border-[#222] hover:shadow-retro transition-all hover:bg-blue-300" target={target}>
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Socials />
        </div>
      </SheetContent>
    </Sheet>
  );
}
