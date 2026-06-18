import { buildBlockImageUrl, cacheBlockImage } from '@/lib/notion/images'

export const sanitizeBlocks = (blocks = []) => blocks.map((block) => {
  if (block.type !== 'image' || !block.image) return block

  cacheBlockImage(block.id, block.image)

  return {
    ...block,
    image: {
      type: 'file',
      caption: block.image.caption,
      file: { url: buildBlockImageUrl(block.id) },
    },
  }
})
