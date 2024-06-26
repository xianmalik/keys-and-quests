'use client'

import Link from "next/link";
import { DiscordLogoIcon, GitHubLogoIcon, NotionLogoIcon } from "@radix-ui/react-icons";
import { DiscordIcon, FacebookIcon } from '@/lib/icons'
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navigation = [
  { path: '/', title: 'Reviews' },
  { path: '/faq', title: 'FAQs' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white py-8 shadow">
      <div className='max-w-screen-xl mx-auto px-4'>
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl font-bold tracking-widest uppercase">
            Keys & Quests
          </a>
          <div className="ms-8 mb-1 me-auto text-sm font-light tracking-wider">
            <ul className="flex items-center justify-end gap-2 md:gap-6 px-2">
              {navigation.map(({ path, title }) => (
                <li key={path}>
                  <Link className={cn(
                    'py-1',
                    pathname == path ? 'border-b border-gray-700' : ''
                  )} href={path}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="flex items-center justify-end gap-2 md:gap-4 px-2">
              <li>
                <Link href="https://discord.gg/d3sv6wg6gK" target="_blank">
                  <DiscordIcon />
                </Link>
              </li>
              <li>
                <Link href="/" target="_blank">
                  <GitHubLogoIcon />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <NotionLogoIcon />
                </Link>
              </li>
              {/* <li>
                <Link href="/">
                  <YoutubeIcon size={15} strokeWidth={1} />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <LucideFacebook size={15} strokeWidth={1} fill="#000000" />
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
