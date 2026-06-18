import { cacheGet, cacheSet } from '@/lib/notion/cache'

// Notion's signed file URLs are valid for ~1hr; cache well under that so we
// never serve a stale, expired URL out of cache.
const FILE_CACHE_TTL = 45 * 60 * 1000

export const resolveFileUrl = (file) => {
  if (!file) return undefined
  return file.type === 'external' ? file.external?.url : file.file?.url
}

export const buildPageImageUrl = (pageId, index) =>
  typeof index === 'number' ? `/api/v2/image/page/${pageId}?index=${index}` : `/api/v2/image/page/${pageId}`

export const buildBlockImageUrl = (blockId) => `/api/v2/image/block/${blockId}`

// We already have a page's cover/gallery files in hand whenever we build a
// post payload — prime the cache so the image proxy can skip re-fetching
// the page from Notion on the very next request for the same image.
export const cachePageFiles = (pageId, { cover, gallery }) => {
  cacheSet(`page:${pageId}`, { cover, gallery }, FILE_CACHE_TTL)
}

export const getCachedPageFiles = (pageId) => cacheGet(`page:${pageId}`)

export const cacheBlockImage = (blockId, image) => {
  cacheSet(`block:${blockId}`, image, FILE_CACHE_TTL)
}

export const getCachedBlockImage = (blockId) => cacheGet(`block:${blockId}`)
