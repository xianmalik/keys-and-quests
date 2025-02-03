'use client'

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Socials from "@/components/Socials";
import SearchButton from "@/components/header/SearchButton";
import HamburgerMenu from "@/components/header/HamburgerMenu";

import navigation from '@/content/navigation';
import { ExternalLinkIcon } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const isActiveLink = (path) => {
    if (path === '/') {
      // For home/reviews page, check if pathsname is root or starts with /post
      return (pathname === '/' || pathname.startsWith('/post'))
    }
    // For other pages, check if pathname starts with the path
    return pathname.startsWith(path)
  }

  const NavItem = ({ path, title, target = '_self' }) => {
    return (
      <li key={path} className={cn(
        "navbar-item",
        isActiveLink(path) ? 'active' : ''
      )}>
        <Link href={path} target={target}>
          {title}
          {target === '_blank' && <span className="mb-1 ms-1"><ExternalLinkIcon size={14} /></span>}
        </Link>
      </li>
    )
  }

  return (
    <header className="masthead bg-cream py-5 border-b-4 border-black">
      <div className='max-w-screen-xl mx-auto px-4'>
        <div className="grid grid-cols-3 items-center">
          {/* Left Part */}
          <div className="flex justify-start gap-4 items-center">
            <HamburgerMenu />
            <ul className="hidden lg:flex items-center justify-start gap-2 md:gap-4 text-sm font-light tracking-wider">
              {navigation.left.map(NavItem)}
            </ul>
          </div>
          {/* Logo */}
          <div>
            <a href="/" className="text-xl font-bold tracking-widest uppercase text-center">
              <Image height="35" width="172" src='/KNQ_main_logo.svg' alt='KNQ Logo' className="mx-auto" />
            </a>
          </div>
          {/* Right Part */}
          <div className="flex justify-end gap-4 items-center">
            <ul className="hidden lg:flex items-center justify-end gap-2 md:gap-4 text-sm font-light tracking-wider">
              {navigation.right.map(NavItem)}
            </ul>
            <SearchButton />
          </div>
        </div>
      </div>
    </header>
  );
}
