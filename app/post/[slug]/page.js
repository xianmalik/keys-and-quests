'use client'

import { useEffect, useState } from "react"
import Image from "next/image";
import { PortableText } from '@portabletext/react'

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
import CommentForm from "@/components/posts/CommentForm"
import CommentView from "@/components/posts/CommentView"

import { cn } from "@/lib/utils";
import getAssetUrl from "@/lib/sanity/getAssetUrl";

import apiClient from "@/lib/apiClient";
import PostHeader from "@/components/posts/PostHeader";
import DisqusComments from "@/components/posts/DisqusComments";

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
        <>
          <PostHeader data={data} />
          <article className='mx-auto max-w-4xl w-full my-16 px-4'>
            <PortableText
              value={data?.body}
              components={{
                types: {
                  image: ({ value }) =>
                    <Image width={600} height={400} className="aspect-[3:2] object-cover mx-auto mt-8 mb-2" src={getAssetUrl(value.asset)} alt={data?.title} />,
                },
                list: {
                  bullet: ({ children }) => <ul className="mt-2">{children}</ul>,
                },
                listItem: {
                  bullet: ({ children }) => <li style={{ listStyleType: 'disc' }} className="ms-4 mb-2">{children}</li>,
                },
              }}
            />

            {data?.youtube && (
              <div className="my-8">
                <h3 className="text-xl font-medium mb-4 mt-16">Sound Test & Review Video</h3>
                <iframe
                  className={cn(
                    "mx-auto w-full",
                    data?.videoType === 'shorts' ? 'aspect-[9/16] max-w-lg' : 'aspect-video'
                  )}
                  src={data?.youtube}
                  title={data?.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen>
                </iframe>
              </div>
            )}
            {data.gallery && data.gallery.length > 0 && (
              <div className="my-8 overflow-hidden">
                <h3 className="text-xl font-medium mb-0 mt-16">Image Gallery</h3>
                <Carousel opts={{
                  loop: true,
                }}>
                  <CarouselContent>
                    {data.gallery.map((media, index) => (
                      <CarouselItem key={index} className="md:basis-1/2">
                        <Image
                          width={600} height={400}
                          className="aspect-[3:2] object-cover mx-auto mt-8 mb-2 rounded-lg overflow-hidden shadow"
                          src={getAssetUrl(media.asset)}
                          alt={media?.alt}
                        />
                        <h6 className="text-sm text-center">{media?.caption}</h6>
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
        </>
      ) : (
        <p className="text-center my-auto text-2xl font-semibold tracking-wide">
          404: Post not found
        </p>
      )}
    </Loader>
  )
}