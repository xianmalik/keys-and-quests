'use client'

import { useEffect, useState } from "react"

// Icons
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

// Components
import Loader from "@/components/Loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel"

import apiClient from "@/lib/apiClient";
import PostHeader from "@/components/posts/PostHeader";
import DisqusComments from "@/components/posts/DisqusComments";
import { ImageModal } from "@/components/ImageModal";
import BlockRenderer from "@/components/BlockRenderer";
import VideoEmbed from "@/components/posts/VideoEmbed";

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

          <div className="mx-auto mb-16 grid w-full max-w-screen-xl grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <article className="w-full bg-white border-2 border-black shadow-retro py-8 px-8 lg:col-span-2 lg:px-16 lg:py-12 xl:px-18">
              {data?.content?.length > 0 && (
                <BlockRenderer blocks={data?.content} />
              )}
            </article>

            <aside className="flex w-full flex-col gap-8 lg:col-span-1">
              {data?.properties?.video && (
                <section className="w-full bg-white border-2 border-black shadow-retro py-6 px-6">
                  <h3 className="text-lg font-medium mb-4">Sound Test Video</h3>
                  <VideoEmbed
                    src={data.properties.video}
                    videoType={data.properties.videoType}
                    title={data.title}
                  />
                </section>
              )}

              {data?.properties?.gallery && data.properties?.gallery.length > 0 && (
                <section className="w-full overflow-hidden bg-white border-2 border-black shadow-retro py-6 px-6">
                  <h3 className="text-lg font-medium mb-2">Image Gallery</h3>
                  <Carousel opts={{
                    loop: true,
                  }}>
                    <CarouselContent>
                      {data.properties?.gallery.map(({ name, url }, index) => (
                        <CarouselItem key={index}>
                          <ImageModal
                            width={600} height={400}
                            className="aspect-[3:2] object-cover mx-auto mt-8 mb-2 rounded-lg overflow-hidden shadow"
                            src={url}
                            alt={name}
                          />
                          <h6 className="text-sm text-center">{name}</h6>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 border-black bg-white/90 hover:bg-white" />
                    <CarouselNext className="right-2 border-black bg-white/90 hover:bg-white" />
                    <CarouselDots className="mt-4" />
                  </Carousel>
                </section>
              )}
            </aside>
          </div>

          {/* Commenting */}
          <div className='mx-auto max-w-4xl w-full my-16 px-4'>
            <div className="my-8">
              <h3 className="text-xl font-medium mb-4 mt-16">Comments</h3>
            </div>
            <DisqusComments
              url={`https://keysandquests.com/post/` + data.slug}
              identifier={data._id}
              title={data.title}
            />
          </div>

          <footer className="grid grid-cols-2 gap-4 max-w-screen-xl w-full mx-auto px-4 my-4">
            <div>
              {data.prev?.title && (
                <a href={`/post/${data.prev.slug}`} className="h-full flex items-end gap-2 text-lg md:text-2xl font-medium leading-none text-gray-500 hover:text-gray-800 py-2">
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
                <a href={`/post/${data.next.slug}`} className="h-full flex text-end items-end justify-end gap-2 text-lg md:text-2xl font-medium leading-none text-gray-500 hover:text-gray-800 py-2">
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