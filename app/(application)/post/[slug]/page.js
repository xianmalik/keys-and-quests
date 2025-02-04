'use client'

import { useEffect, useState } from "react"
import Image from "next/image";
// import { PortableText } from '@portabletext/react'

// Icons
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

// Components
import Loader from "@/components/Loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { cn } from "@/lib/utils";
import getAssetUrl from "@/lib/sanity/getAssetUrl";

import apiClient from "@/lib/apiClient";
import PostHeader from "@/components/posts/PostHeader";
import DisqusComments from "@/components/posts/DisqusComments";
import { ImageModal } from "@/components/ImageModal";
import BlockRenderer from "@/components/BlockRenderer";

export default function Post({ params }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const response = await apiClient.get(`/posts/${params.slug}`);
      setLoading(false)

      if (!response) return;

      const { data } = response;

      if (!data?.success) return;

      setData(data?.post)
    }

    fetchData()
  }, [params])

  return (
    <Loader isLoading={loading}>
      {data ? (
        <div className='px-4'>
          <PostHeader data={data} />
          <article className='mx-auto max-w-screen-md w-full mb-16 py-8 px-8 lg:px-16 lg:py-12 xl:px-18 bg-white border-2 border-black shadow-retro'>
            {data?.content?.length > 0 && (
              <BlockRenderer blocks={data?.content} />
            )}

            {data?.properties?.video && (
              <div className="my-8">
                <h3 className="text-xl font-medium mb-4 mt-16">Sound Test Video</h3>
                <iframe
                  className={cn(
                    "mx-auto w-full",
                    data?.properties?.videoType === 'shorts' ? 'aspect-[9/16] max-w-lg' : 'aspect-video'
                  )}
                  src={data?.properties?.video}
                  title={data?.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen>
                </iframe>
              </div>
            )}
            {data?.properties?.gallery && data.properties?.gallery.length > 0 && (
              <div className="my-8 overflow-hidden">
                <h3 className="text-xl font-medium mb-0 mt-16">Image Gallery</h3>
                <Carousel opts={{
                  loop: true,
                }}>
                  <CarouselContent>
                    {data.properties?.gallery.map(({ name, file: { url } }, index) => (
                      <CarouselItem key={index} className="md:basis-1/2">
                        <Image
                          width={600} height={400}
                          className="aspect-[3:2] object-cover mx-auto mt-8 mb-2 rounded-lg overflow-hidden shadow"
                          src={url}
                          alt={name}
                        />
                        <h6 className="text-sm text-center">{name}</h6>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}
          </article>

          {/* Commenting */}
          <div className='mx-auto max-w-4xl w-full my-16 px-4'>
            <div className="my-8">
              <h3 className="text-xl font-medium mb-4 mt-16">Comments</h3>
            </div>
            <DisqusComments
              url={`https://keysandquests.com/posts/` + data.slug.current}
              identifier={data._id}
              title={data.title}
            />
          </div>

          <footer className="grid grid-cols-2 gap-4 max-w-screen-xl w-full mx-auto px-4 my-4">
            <div>
              {data.prev?.title && (
                <a href={`/post/${data.prev.slug.current}`} className="h-full flex items-end gap-2 text-lg md:text-2xl font-medium leading-none text-gray-500 hover:text-gray-800 py-2">
                  <ArrowLeftIcon className="h-8 w-8" />
                  <span>
                    <span className="text-xs md:text-sm mb-2">Previous Post</span>
                    <br />
                    {data.prev.title}
                  </span>
                </a>
              )}
            </div>
            <div>
              {data.next?.title && (
                <a href={`/post/${data.next.slug.current}`} className="h-full flex text-end items-end justify-end gap-2 text-lg md:text-2xl font-medium leading-none text-gray-500 hover:text-gray-800 py-2">
                  <span>
                    <span className="text-xs md:text-sm mb-2">Next Post</span>
                    <br />
                    {data.next.title}
                  </span>
                  <ArrowRightIcon className="h-8 w-8" />
                </a>
              )}
            </div>
          </footer>
        </div>
      ) : (
        <p className="text-center my-auto text-2xl font-semibold tracking-wide">
          404: Post not found
        </p>
      )}
    </Loader>
  )
}