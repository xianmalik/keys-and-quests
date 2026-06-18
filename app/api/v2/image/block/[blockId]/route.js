import { notionClient } from '@/lib/notionClient'
import { resolveFileUrl, getCachedBlockImage, cacheBlockImage } from '@/lib/notion/images'

export async function GET(request, { params }) {
  const { blockId } = params

  try {
    let image = getCachedBlockImage(blockId)

    if (!image) {
      const block = await notionClient.blocks.retrieve({ block_id: blockId })
      image = block?.image
      if (image) cacheBlockImage(blockId, image)
    }

    const url = image ? resolveFileUrl(image) : undefined

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
