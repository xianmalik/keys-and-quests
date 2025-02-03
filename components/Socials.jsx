'use client'

import Link from "next/link";
import { FacebookIcon, NotionIcon, DiscordIcon, GithubIcon, YouTubeIcon } from '@/lib/icons'

export default function Socials() {
  return (
    <ul className="flex items-center justify-center gap-8 p-2 my-8">
      <li>
        <Link href="https://www.youtube.com/@keysandquests" target="_blank">
          <YouTubeIcon />
        </Link>
      </li>
      <li>
        <Link href="https://www.facebook.com/KeysAndQuests" target="_blank">
          <FacebookIcon />
        </Link>
      </li>
      <li>
        <Link href="https://discord.gg/d3sv6wg6gK" target="_blank">
          <DiscordIcon />
        </Link>
      </li>
      <li>
        <Link href="https://keysandquests.notion.site/f8ecd71b58264356b33b207ebf9a69e5?v=920d957e9b69456e97701f0335d73137" target="_blank">
          <NotionIcon />
        </Link>
      </li>
      <li>
        <Link href="https://github.com/xianmalik" target="_blank">
          <GithubIcon />
        </Link>
      </li>
    </ul>
  )
}
