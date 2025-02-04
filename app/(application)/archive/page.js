'use client'

import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Archive() {
  const [posts, setPosts] = useState([])
  const [nextCursor, setNextCursor] = useState(undefined)
  const [loading, setLoading] = useState(false)

  async function fetchData(cursor = undefined) {
    setLoading(true)
    try {
      const response = await axios.get('/api/v2/posts', {
        params: {
          start_cursor: cursor
        }
      });

      if (!response) return;

      const { data } = response;

      if (data.success) {
        if (cursor) {
          setPosts(prev => [...prev, ...data.posts.results]);
        } else {
          setPosts(data.posts.results);
        }
        setNextCursor(data.posts.next_cursor);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <article className='w-full pb-16 px-4'>
      <div
        className="mb-16 bg-cover bg-center bg-[url(/faq-header.webp)]"
      >
        <h1 className={cn(
          "text-3xl md:text-6xl text-white font-bold tracking-wider text-center",
          "block h-full w-full py-16 md:py-52 px-4 bg-black/50"
        )}>Archive</h1>
      </div>
      <div className="border-2 border-[#222] shadow-retro p-6 max-w-screen-lg mx-auto bg-white">
        {posts ? (
          <>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts?.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.properties.ID.unique_id.prefix}-{post.properties.ID.unique_id.number}</TableCell>
                    <TableCell>
                      {post.cover?.file?.url && (
                        <img
                          src={post.cover.file.url}
                          alt=""
                          className="w-10 h-10 object-cover rounded-sm"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <a
                        href={post.public_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {post.properties.Name.title[0]?.plain_text}
                      </a>
                    </TableCell>
                    <TableCell>{post.properties['Switch Brand'].multi_select[0]?.name}</TableCell>
                    <TableCell>{post.properties.Type.select?.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {nextCursor && (
              <div className="mt-4 text-center">
                <Button
                  variant="retro"
                  className="bg-cyan-200"
                  onClick={() => fetchData(nextCursor)}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}
          </>
        ) : (
          'Loading...'
        )}
      </div>
    </article>
  )
}
