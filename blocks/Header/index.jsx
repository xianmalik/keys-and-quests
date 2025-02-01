'use client'

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Socials from "@/components/Socials";
import SearchButton from "@/components/SearchButton";

const navigation = [
  { path: '/', title: 'Reviews' },
  { path: '/faq', title: 'FAQs' },
]


export default function Header() {
  const pathname = usePathname()

  const isActiveLink = (path) => {
    if (path === '/') {
      // For home/reviews page, check if pathsname is root or starts with /post
      return (pathname === '/' || pathname.startsWith('/post'))
    }
    // For other pages, check if pathname starts with the path
    return pathname.startsWith(path)
  }

  return (
    <header className="masthead bg-cream py-5 border-b-4 border-black">
      <div className='max-w-screen-xl mx-auto px-4'>
        <div className="grid grid-cols-3 items-center">
          <div className="mb-1 text-sm font-light tracking-wider">
            <ul className="flex items-center justify-start gap-2 md:gap-6 px-2">
              {navigation.map(({ path, title }) => (
                <li key={path} className={cn(
                  "navbar-item",
                  isActiveLink(path) ? 'active' : ''
                )}>
                  <Link href={path}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <a href="/" className="text-xl font-bold tracking-widest uppercase mx-auto">
            <Image height="35" width="172" src='/KNQ_main_logo.svg' alt='KNQ Logo' />
          </a>
          <div className="flex justify-end">
            <SearchButton />
          </div>
        </div>
      </div>
    </header>
  );
}
