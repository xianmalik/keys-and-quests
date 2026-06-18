import Image from "next/image";
import Link from "next/link";

import Socials from "@/components/Socials";
import NewsletterForm from "@/components/NewsletterForm";
import navigation from "@/content/navigation";

const exploreLinks = [...navigation.left, ...navigation.right];

const communityLinks = [
  { title: 'YouTube', href: 'https://www.youtube.com/@keysandquests' },
  { title: 'Discord', href: 'https://discord.gg/d3sv6wg6gK' },
  { title: 'Switch Database', href: 'https://keysandquests.notion.site/f8ecd71b58264356b33b207ebf9a69e5?v=920d957e9b69456e97701f0335d73137' },
  { title: 'GitHub', href: 'https://github.com/xianmalik' },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-cream">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/">
              <Image height="35" width="172" src="/KNQ_main_logo.svg" alt="KNQ Logo" />
            </Link>
            <p className="mt-4 max-w-sm text-sm font-light text-gray-600">
              Independent mechanical keyboard switch reviews, sound tests, and a growing
              archive of every switch we've gotten our hands on.
            </p>
            <Socials className="justify-start gap-5 p-0 my-6" size={20} />
          </div>

          {/* Explore column */}
          <div>
            <h6 className="text-xs font-semibold uppercase tracking-[2px] mb-4">Explore</h6>
            <ul className="flex flex-col gap-3 text-sm font-light text-gray-600">
              {exploreLinks.map(({ path, title, target = '_self' }) => (
                <li key={path}>
                  <Link href={path} target={target} className="hover:text-black transition-colors">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community column */}
          <div>
            <h6 className="text-xs font-semibold uppercase tracking-[2px] mb-4">Community</h6>
            <ul className="flex flex-col gap-3 text-sm font-light text-gray-600">
              {communityLinks.map(({ title, href }) => (
                <li key={href}>
                  <Link href={href} target="_blank" className="hover:text-black transition-colors">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h6 className="text-xs font-semibold uppercase tracking-[2px] mb-4">Newsletter</h6>
            <p className="mb-4 text-sm font-light text-gray-600">
              Get new switch reviews dropped straight into your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <p className="text-xs tracking-wider text-center text-gray-400 font-light">
          &copy; {new Date().getFullYear()} Keys & Quests. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
