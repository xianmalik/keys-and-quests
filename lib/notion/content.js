import { buildBlockImageUrl } from '@/lib/notion/images'

export const sanitizeBlocks = (blocks = []) => blocks.map((block) => {
  if (block.type !== 'image' || !block.image) return block

  return {
    ...block,
    image: {
      type: 'file',
      caption: block.image.caption,
      file: { url: buildBlockImageUrl(block.id) },
    },
  }
})
