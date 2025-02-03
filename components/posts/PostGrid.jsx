import { Fragment, useId } from "react";
import Link from "next/link";
import Image from "next/image";

// import { Crosshair2Icon } from "@radix-ui/react-icons"

// import { Badge } from "@/components/ui/badge"

import { formatDate } from "@/lib/utils";
import getAssetUrl from "@/lib/sanity/getAssetUrl"
import { Button } from "../ui/button";
import { DotIcon } from "@radix-ui/react-icons";

export default function PostGrid({ posts }) {
  const id = useId();

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
        title, tag, properties, slug, mainImage, _createdAt
      }) => (title && slug && mainImage) ? (
        <div className="flex flex-col" key={`${id}-${slug}`}>
            <div className="transition-all flex flex-1 flex-col overflow-hidden border-2 border-black bg-white hover:shadow-retro shadow-none">
              {mainImage?.asset?.url && (
                <div className="shadow-md">
                  <Image
                    alt={title} width={400} height={400}
                    src={getAssetUrl(mainImage.asset.url)} className="object-cover aspect-[16/10] w-full transition-all"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col py-3 px-4 md:px-5 md:py-4 lg:px-7 lg:py-5">
                {_createdAt && (
                  <div className="mt-auto flex items-center mb-1">
                    <div className="text-xs text-gray600">{formatDate(_createdAt)}</div>
                  </div>
                )}
                {/* Title */}
                <h4 className="text-xl md:text-2xl text-gray-800 mb-1 font-semibold">{title}</h4>
                {/* Tagline Subtitle */}
                {tag && <p className="mb-2 md:mb-3 text-gray-600 text-base">{tag}</p>}
                {/* Metas */}
                <div className="flex items-center justify-start gap-6 mb-4 uppercase text-xs tracking-wider font-semibold">
                  <span className="flex items-center">
                    <DotIcon size={8} />
                    {properties.brandName[0]}
                  </span>
                  <span className="flex items-center">
                    <DotIcon size={8} />
                    {properties.switchType}
                  </span>
                </div>
                {/* CTA */}
                <div className="mt-2 mb-2">
                  <Button variant="retro" asChild className=" bg-purple-200">
                    <Link href={"/post/" + slug.current}>
                      Read more
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
      ) : <Fragment key={idx} />)}
    </div>
  )
}