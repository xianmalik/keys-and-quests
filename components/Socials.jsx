import Link from "next/link";
import { DiscordLogoIcon, GitHubLogoIcon, NotionLogoIcon, VideoIcon } from "@radix-ui/react-icons";
import { FacebookIcon } from '@/lib/icons'

export default function Socials() {
  return (
    <ul className="flex items-center justify-center gap-2 md:gap-6 lg:gap-8 px-2">
      <li>
        <Link href="https://www.youtube.com/@keysandquests" target="_blank">
          <VideoIcon />
        </Link>
      </li>
      <li>
        <Link href="https://www.facebook.com/KeysAndQuests" target="_blank">
          <FacebookIcon size={15} strokeWidth={1} fill="#000000" />
        </Link>
      </li>
      <li>
        <Link href="https://discord.gg/d3sv6wg6gK" target="_blank">
          <DiscordLogoIcon />
        </Link>
      </li>
      <li>
        <Link href="https://keysandquests.notion.site/f8ecd71b58264356b33b207ebf9a69e5?v=920d957e9b69456e97701f0335d73137" target="_blank">
          <NotionLogoIcon />
        </Link>
      </li>
      <li>
        <Link href="https://github.com/xianmalik" target="_blank">
          <GitHubLogoIcon />
        </Link>
      </li>
    </ul>
  )
}
