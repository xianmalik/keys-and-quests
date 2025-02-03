'use client'

import { useState, useEffect } from "react";
import axios from "axios";

// import Filter from "@/components/posts/Filter";
import Loader from "@/components/Loader";
import PostGrid from "@/components/posts/PostGrid";

import generateRssFeed from "@/lib/rss";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/v1/posts');
      setLoading(false);

      if (!response) return;

      const { data } = response;

      if (data.success) {
        setPosts(data.posts);
        generateRssFeed(data.posts);
      }
    }
    fetchData()
  }, [])

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 my-8 md:mb-10 lg:mb-16">
      <h1 className="text-lg lg:text-4xl mb-16 mt-8 font-bold tracking-wide lg:text-center">
        Mechanical Switch Reviews
      </h1>
      <Loader isLoading={loading}>
        <PostGrid posts={posts} />
        <Button variant="retro" className="bg-cyan-200 mx-auto mt-6 md:mt-12 !block">
          Load more
        </Button>
      </Loader>
    </div>
  );
}
