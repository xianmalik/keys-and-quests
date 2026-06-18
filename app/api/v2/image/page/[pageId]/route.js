import { notionClient } from '@/lib/notionClient'
import { resolveFileUrl, getCachedPageFiles, cachePageFiles } from '@/lib/notion/images'

export async function GET(request, { params }) {
  const { pageId } = params
  const { searchParams } = new URL(request.url)
  const index = searchParams.get('index')

  try {
    let files = getCachedPageFiles(pageId)

    if (!files) {
      const page = await notionClient.pages.retrieve({ page_id: pageId })
      files = { cover: page.cover, gallery: page.properties?.['Gallery']?.files }
      cachePageFiles(pageId, files)
    }

    const file = index !== null
      ? files.gallery?.[Number(index)]
      : (files.cover || files.gallery?.[0])

    const url = resolveFileUrl(file)
    if (!url) {
      return new Response('Not found', { status: 404 })
    }

    const upstream = await fetch(url)
    if (!upstream.ok || !upstream.body) {
      return new Response('Not found', { status: 404 })
    }

    return new Response(upstream.body, {
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/octet-stream',
        'Cache-Control': 'public, max-age=1800',
      },
    })
  } catch (error) {
    return new Response('Not found', { status: 404 })
  }
}
