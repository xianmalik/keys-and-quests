'use client'

import Link from "next/link";
import { FacebookIcon, NotionIcon, DiscordIcon, GithubIcon, YouTubeIcon } from '@/lib/icons'
import { cn } from "@/lib/utils";

export default function Socials({ className, size = 24 }) {
  return (
    <ul className={cn("flex items-center justify-center gap-8 p-2 my-8", className)}>
      <li>
        <Link href="https://www.youtube.com/@keysandquests" target="_blank">
          <YouTubeIcon size={size} />
        </Link>
      </li>
      <li>
        <Link href="https://www.facebook.com/KeysAndQuests" target="_blank">
          <FacebookIcon size={size} />
        </Link>
      </li>
      <li>
        <Link href="https://discord.gg/d3sv6wg6gK" target="_blank">
          <DiscordIcon size={size} />
        </Link>
      </li>
      <li>
        <Link href="https://keysandquests.notion.site/f8ecd71b58264356b33b207ebf9a69e5?v=920d957e9b69456e97701f0335d73137" target="_blank">
          <NotionIcon size={size} />
        </Link>
      </li>
      <li>
        <Link href="https://github.com/xianmalik" target="_blank">
          <GithubIcon size={size} />
        </Link>
      </li>
    </ul>
  )
}
