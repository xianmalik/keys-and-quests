'use client'

import { useState, useEffect } from "react";
import axios from "axios";

// import Filter from "@/components/posts/Filter";
import PostGrid from "@/components/posts/PostGrid";
import Loader from "@/components/Loader";
import generateRssFeed from "@/lib/rss";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState([])
  const [brands, setBrands] = useState([])
  const [params, setParams] = useState({})

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/v1/posts', { params });
      setLoading(false);

      if (!response) return;

      const { data } = response;

      if (data.success) {
        setPosts(data.posts);
        generateRssFeed(data.posts);
      }
    }
    fetchData()
  }, [params])

  useEffect(() => {
    async function fetchBrands() {
      const response = await axios.get('/api/v1/brands')
      if (!response) return;

      const { data } = response;

      if (!data.success) return;

      setBrands(data.brands)
    }
    fetchBrands()
  }, [])

  // function handleFilter(filterParams) {
  //   setLoading(true)
  //   setParams({
  //     brand: filterParams?.brand,
  //     switchType: filterParams?.switchType
  //   })
  // }

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 my-8 md:mb-10 lg:mb-16">
      <h1 className="text-lg lg:text-4xl mb-16 mt-8 font-bold tracking-wide lg:text-center">
        Mechanical Switch Reviews
      </h1>
      {/* <Filter brands={brands} onFilter={handleFilter} /> */}
      <Loader isLoading={loading}>
        <PostGrid posts={posts} />
      </Loader>
    </div>
  );
}
