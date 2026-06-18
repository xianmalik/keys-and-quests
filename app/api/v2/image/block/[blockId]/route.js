import { notionClient } from '@/lib/notionClient'
import { resolveFileUrl } from '@/lib/notion/images'

export async function GET(request, { params }) {
  const { blockId } = params

  try {
    const block = await notionClient.blocks.retrieve({ block_id: blockId })
    const url = block?.image ? resolveFileUrl(block.image) : undefined

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
