import Link from "next/link";
import { DiscordLogoIcon, GitHubLogoIcon, NotionLogoIcon } from "@radix-ui/react-icons";
import { FacebookIcon } from '@/lib/icons'
import { LucideFacebook, YoutubeIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white py-4 shadow">
      <div className='max-w-screen-xl mx-auto px-4'>
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl font-bold tracking-widest uppercase">
            Keys & Quests
          </a>
          <div className="ms-8 me-auto">
            <ul className="flex items-center justify-end gap-2 md:gap-6 px-2">
              <li>
                <Link href="/">Home</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex items-center justify-end gap-2 md:gap-4 px-2">
              <li>
                <Link href="/">
                  <DiscordLogoIcon />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <GitHubLogoIcon />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <NotionLogoIcon />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <YoutubeIcon size={15} strokeWidth={1} />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <LucideFacebook size={15} strokeWidth={1} fill="#000000" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
