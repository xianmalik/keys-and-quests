'use client'

import { useEffect, useState } from "react"
import { PortableText } from '@portabletext/react'

import { client } from '@/lib/sanity/client';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Post({ params }) {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const { slug } = params

      const query = `*[_type == "post" && slug.current == $slug][0] {
        ...,
        author->,
        mainImage {
          ...,
          asset->
        },
        categories[]->,
        body
      }`

      const data = await client.fetch(query, { slug })
      setData(data)
    }

    fetchData()
  }, [params])

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return data ? (
    <>
      <div className="mx-auto max-w-screen-xl px-4 my-16">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray300 shadow-lg lg:flex-row-reverse">
          <div className="flex-1 basis-1/4">
            <img alt={data.title} className="w-full transition-all" src={data.mainImage.asset.url} />
          </div>
          <div className="relative flex flex-1 basis-3/4 flex-col justify-center py-6 px-8 lg:px-16 lg:py-12 xl:px-24">
            <div className="mb-2 flex flex-wrap items-center">
              <div className="flex items-center">
                <div className="mr-2 overflow-hidden rounded-full border border-blue500">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>KQ</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs leading-none text-gray600">{data.author.name}</span>
              </div>
              {/* <div className="ml-auto hidden pl-2 text-xs text-gray600 lg:block">
                {formatDate(data._createdAt)}
              </div> */}
            </div>
            <h1 className='text-[2.5rem] font-semibold mb-0'>{data.title}</h1>
            <div className="flex items-center gap-2 font-light mb-6">
              {data.categories?.map(({ _id, title }) => (
                <Badge key={_id}>{title}</Badge>
              ))}
            </div>
            <div className="text-xs text-gray600">{formatDate(data._createdAt)}</div>
          </div>
        </div>
      </div>
      <article className='mx-auto max-w-4xl my-16 px-4'>
        <PortableText
          value={data.body}
          components={{
            list: {
              bullet: ({ children }) => <ul className="mt-2">{children}</ul>,
            },
            listItem: {
              bullet: ({ children }) => <li style={{ listStyleType: 'disc' }} className="ms-4 mb-2">{children}</li>,
            },
          }}
        />
      </article>
    </>
  ) : "Loading"
}