'use client'

import { useEffect, useState } from "react"
import Image from "next/image";
import { PortableText } from '@portabletext/react'

// Icons
import { AlignBottomIcon, ArrowLeftIcon, ArrowRightIcon, BlendingModeIcon, BorderBottomIcon, BorderTopIcon, CommitIcon, Component1Icon, ComponentBooleanIcon, Crosshair2Icon } from "@radix-ui/react-icons";

// Components
import Loader from "@/components/Loader";
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CommentForm from "@/components/posts/CommentForm"
import CommentView from "@/components/posts/CommentView"

import { cn, formatDate } from "@/lib/utils";
import getAssetUrl from "@/lib/sanity/getAssetUrl";

import apiClient from "@/lib/apiClient";

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
          <div className="mx-auto max-w-screen-xl w-full px-4 my-16">
            <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-2xl border border-gray300 shadow-lg md:flex-row-reverse">
              <div className="md:order-last">
                <Image alt={data?.title} className="w-full h-full object-cover transition-all" src={data?.mainImage?.asset?.url} height={280} width={280} />
              </div>
              <div className="relative col-span-2 flex flex-col justify-center py-6 px-8 lg:px-16 lg:py-12 xl:px-24">
                <div className="flex items-center gap-2 font-light mb-2 md:mb-4">
                  {data?.categories?.map(({ _id, title }) => (
                    <Badge className="tracking-wider rounded-full" key={_id}>{title}</Badge>
                  ))}
                </div>
                <h1 className='text-[2.5rem] font-semibold leading-none mb-4 md:mb-8'>
                  {data?.title}
                  {!!data?.tag && ` | ${data?.tag}`}
                </h1>
                <div className="flex flex-col items-start text-sm font-light mb-4 md:mb-8 gap-1 text-gray-600">
                  {data?.brand?.name && <div className="flex items-center gap-1">
                    <Component1Icon className="me-1" />
                    Brand: <span className="font-medium">{data?.brand?.name}</span>
                  </div>}
                  {data?.switchType?.name && <div className="flex items-center gap-1">
                    <Crosshair2Icon className="me-1" />
                    Switch Type: <span className="font-medium">{data?.switchType?.name}</span>
                  </div>}
                  {data?.actuation && <div className="flex items-center gap-1">
                    <CommitIcon className="me-1" />
                    Actuation Point: <span className="font-medium">{data?.actuation}±5g</span>
                  </div>}
                  <div className="flex items-center gap-1">
                    <BlendingModeIcon className="me-1" />
                    Is Factory Lubed?: <span className="font-medium">{data?.lubeStatus ? 'Yes' : 'No'}</span>
                  </div>
                  {data?.material?.top && <div className="flex items-center gap-1">
                    <BorderTopIcon className="me-1" />
                    Top Housing: <span className="font-medium">{data?.material?.top}</span>
                  </div>}
                  {data?.material?.bottom && <div className="flex items-center gap-1">
                    <BorderBottomIcon className="me-1" />
                    Bottom Housing: <span className="font-medium">{data?.material?.bottom}</span>
                  </div>}
                  {data?.material?.stem && <div className="flex items-center gap-1">
                    <AlignBottomIcon className="me-1" />
                    Stem Material: <span className="font-medium">{data?.material?.stem}</span>
                  </div>}
                  {data?.price && <div className="flex items-center gap-1">
                    <ComponentBooleanIcon className="me-1" />
                    Price: <span className="font-medium">${data?.price}</span> per switch
                  </div>}
                </div>
                <div className="text-xs text-gray600">Published: {formatDate(data?._createdAt)}</div>
              </div>
            </div>
          </div>
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
            <CommentView comments={data.comments} />
            <CommentForm postId={data._id} />
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