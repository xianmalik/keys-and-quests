import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crosshair2Icon } from "@radix-ui/react-icons"

import getAssetUrl from "@/lib/sanity/getAssetUrl"
import { formatDate } from "@/lib/utils";

export default function PostGrid({ posts }) {
  if (posts.length <= 0) {
    return (
      <p className="font-medium text-lg">
        No reviews found! Please reload or check back later!
      </p>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map(({ title, brand, switchType, slug, mainImage, author, _createdAt }, idx) => (
        <a href={"/post/" + slug.current} className="flex flex-col" key={idx}>
          <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray300 shadow-lg">
            <div>
              <Image alt={title} width={400} height={400} src={mainImage.asset.url} className="object-cover aspect-[16/10] w-full transition-all" />
            </div>
            <div className="flex flex-1 flex-col py-3 px-4 md:px-5 md:py-4 lg:px-7 lg:py-5">
              <p className="text-xl md:text-2xl text-gray-800 mb-2 md:mb-4">
                {title}
              </p>
              <div className="flex items-center justify-start gap-2 mb-4">
                <Badge className="uppercase text-xs tracking-wider rounded-full">
                  {brand.name}
                </Badge>
                <Badge variant="secondary" className="uppercase text-xs tracking-wider rounded-full">
                  <Crosshair2Icon className="me-1" />
                  {switchType.name}
                </Badge>
              </div>
              <div className="mt-auto flex items-center">
                <div className="flex items-center gap-2">
                  {author?.image && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={getAssetUrl(author.image.asset)} />
                      <AvatarFallback>KQ</AvatarFallback>
                    </Avatar>
                  )}
                  <span className="text-xs leading-none text-gray600">{author.name}</span>
                </div>
                <div className="ml-auto pl-2 text-xs text-gray600">{formatDate(_createdAt)}</div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}