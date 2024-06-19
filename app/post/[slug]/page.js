'use client'

import { useEffect, useState } from "react"
import { PortableText } from '@portabletext/react'

import { client } from '@/lib/sanity/client';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";
import { AlignBottomIcon, BlendingModeIcon, BorderBottomIcon, BorderTopIcon, CommitIcon, Component1Icon, ComponentBooleanIcon, Crosshair2Icon } from "@radix-ui/react-icons";

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
        price->,
        brand->,
        material->,
        actuation->,
        switchType->,
        lubeStatus->,
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
      <div className="mx-auto max-w-screen-xl w-full px-4 my-16">
        <div className="flex flex-col items-center overflow-hidden rounded-2xl border border-gray300 shadow-lg lg:flex-row-reverse">
          <div className="flex-1 basis-1/3">
            <Image alt={data.title} className="w-full transition-all" src={data.mainImage.asset.url} height={280} width={280} />
          </div>
          <div className="relative flex flex-1 basis-2/3 flex-col justify-center py-6 px-8 lg:px-16 lg:py-12 xl:px-24">
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
            </div>
            <h1 className='text-[2.5rem] font-semibold'>{data.title}</h1>
            <div className="flex items-center gap-2 font-light mb-8">
              {data.categories?.map(({ _id, title }) => (
                <Badge key={_id}>{title}</Badge>
              ))}
            </div>
            <div className="flex flex-col items-start text-sm font-light mb-6 gap-1 text-gray-600">
              {data.brand.name && <div className="flex items-center gap-1">
                <Component1Icon className="me-1" />
                Brand: {data.brand.name}
              </div>}
              {data.switchType.name && <div className="flex items-center gap-1">
                <Crosshair2Icon className="me-1" />
                Switch Type: {data.switchType.name}
              </div>}
              {data.actuation && <div className="flex items-center gap-1">
                <CommitIcon className="me-1" />
                Actuation Point: {data.actuation}±5g
              </div>}
              <div className="flex items-center gap-1">
                <BlendingModeIcon className="me-1" />
                Is Factory Lubed?: {data.lubeStatus ? 'Yes' : 'No'}
              </div>
              {data.material.top && <div className="flex items-center gap-1">
                <BorderTopIcon className="me-1" />
                Top Housing: {data.material.top}
              </div>}
              {data.material.bottom && <div className="flex items-center gap-1">
                <BorderBottomIcon className="me-1" />
                Bottom Housing: {data.material.bottom}
              </div>}
              {data.material.stem && <div className="flex items-center gap-1">
                <AlignBottomIcon className="me-1" />
                Stem Material: {data.material.stem}
              </div>}
              {data.price && <div className="flex items-center gap-1">
                <ComponentBooleanIcon className="me-1" />
                Price: ${data.price} per switch
              </div>}
            </div>
            <div className="text-xs text-gray600">Publihsed: {formatDate(data._createdAt)}</div>
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
  ) : (
    <p className="p-8 w-full text-center">Loading...</p>
  )
}