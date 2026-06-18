import { fetchPublishedPosts } from '@/lib/notion/posts'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const brand = searchParams.get('brand')

  try {
    let posts = await fetchPublishedPosts()

    if (brand) {
      posts = posts.filter((post) => post.properties?.brandName?.includes(brand))
    }

    return Response.json({
      success: true,
      message: 'Succesfully fetched posts',
      posts,
    })
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch data', error: error.message })
  }
}

export const dynamicParams = false
