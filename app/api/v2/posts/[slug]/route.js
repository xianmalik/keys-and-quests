import { notionClient } from '@/lib/notionClient'
import { fetchPublishedPosts } from '@/lib/notion/posts'
import { sanitizeBlocks } from '@/lib/notion/content'

export async function GET(request, { params }) {
  try {
    const { slug } = params
    // Posts are sorted newest first (descending by created_time).
    const posts = await fetchPublishedPosts()
    const index = posts.findIndex((post) => post.slug === slug)
    const post = posts[index]

    if (!post) {
      return Response.json({ success: false, message: '404: Post Not Found!' })
    }

    const notionPageResponse = await notionClient.blocks.children.list({
      block_id: post._id,
    })

    const older = posts[index + 1]
    const newer = posts[index - 1]

    return Response.json({
      success: true,
      message: 'Succesfully fetched post',
      post: {
        ...post,
        content: sanitizeBlocks(notionPageResponse?.results),
        prev: older ? { title: older.title, slug: older.slug } : null,
        next: newer ? { title: newer.title, slug: newer.slug } : null,
      },
    })
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch data', error: error.message })
  }
}

export const dynamic = 'error'
