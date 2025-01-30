import Image from "next/image";

import { Badge } from "@/components/ui/badge"
import { Crosshair2Icon } from "@radix-ui/react-icons"

import getAssetUrl from "@/lib/sanity/getAssetUrl"
import { formatDate } from "@/lib/utils";
import { Fragment } from "react";

export default function PostGrid({ posts }) {

  if (posts.length <= 0) {
    return (
      <p className="font-medium text-lg text-center">
        No reviews found! Please reload or check back later!
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map(({
        title, tag, brand, switchType, slug, mainImage, _createdAt
      }, idx) => (title && slug && mainImage) ? (
        <a href={"/post/" + slug.current} className="flex flex-col" key={idx}>
            <div className="transition-all flex flex-1 flex-col overflow-hidden border-2 border-black bg-white hover:shadow-retro shadow-none">
              {mainImage?.asset?.url && <div className="shadow-md">
              <Image alt={title} width={400} height={400} src={getAssetUrl(mainImage.asset.url)} className="object-cover aspect-[16/10] w-full transition-all" />
            </div>}
            <div className="flex flex-1 flex-col py-3 px-4 md:px-5 md:py-4 lg:px-7 lg:py-5">
              {_createdAt && <div className="mt-auto flex items-center mb-1">
                <div className="text-xs text-gray600">{formatDate(_createdAt)}</div>
              </div>}
              <h4 className="text-xl md:text-2xl text-gray-800 mb-2">
                {title}
              </h4>
              {tag && <p className="mb-2 md:mb-4 text-gray-600 text-base">
                {tag}
              </p>}
              <div className="flex items-center justify-start gap-2 mb-2">
                {brand && <Badge className="uppercase text-xs tracking-wider rounded-full">
                  {brand.name}
                </Badge>}
                {switchType && <Badge variant="secondary" className="uppercase text-xs tracking-wider rounded-full">
                  <Crosshair2Icon className="me-1" />
                  {switchType}
                </Badge>}
              </div>
            </div>
          </div>
        </a>
      ) : <Fragment key={idx} />)}
    </div>
  )
}