'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/v1/posts');
      if (!response) return;

      const { data } = response;

      if (!data.success) return;

      setPosts(data.posts)
    }

    fetchData()
  }, [])

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 my-8 md:mb-10 lg:mb-16">
      <h1 className="text-lg lg:text-4xl mb-16 mt-8 font-bold tracking-wide lg:text-center">
        Switch Reviews by Keys & Quests
      </h1>
      <div className="grid grid-cols-1 gap-y-4 gap-x-5 lg:gap-x-12 lg:gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 && posts?.map(({ title, brand, switchType, slug, mainImage, author, _createdAt }, idx) => (
          <a href={"/post/" + slug.current} className="flex flex-col" key={idx}>
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray300 shadow-lg">
              <div>
                <Image alt={title} width={400} height={400} src={mainImage.asset.url} className="object-cover aspect-[16/10] w-full transition-all" />
              </div>
              <div className="flex flex-1 flex-col py-3 px-4 md:px-5 md:py-4 lg:px-7 lg:py-5">
                <p className="text-lg lg:text-2xl mb-1 text-gray800 md:mb-2">
                  {title}
                </p>
                <p className="flex items-center justify-start gap-2 mb-4">
                  <Badge className="uppercase text-xs tracking-wider rounded-full">
                    {brand.name}
                  </Badge>
                  <Badge variant="secondary" className="uppercase text-xs tracking-wider rounded-full">
                    {switchType.name}
                  </Badge>
                </p>
                <div className="mt-auto flex items-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>KQ</AvatarFallback>
                    </Avatar>
                    <span className="text-xs leading-none text-gray600">{author.name}</span>
                  </div>
                  <div className="ml-auto pl-2 text-xs text-gray600">{formatDate(_createdAt)}</div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
