'use client'

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Socials from "@/components/Socials";

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
    <header className="masthead bg-cream py-8 border-b-4 border-black">
      <div className='max-w-screen-xl mx-auto px-4'>
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl font-bold tracking-widest uppercase">
            Keys & Quests
          </a>
          <div className="ms-8 mb-1 me-auto text-sm font-light tracking-wider">
            <ul className="flex items-center justify-end gap-2 md:gap-6 px-2">
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
          <div className="hidden md:block">
            <Socials />
          </div>
        </div>
      </div>
    </header>
  );
}
