export const resolveFileUrl = (file) => {
  if (!file) return undefined
  return file.type === 'external' ? file.external?.url : file.file?.url
}

export const buildPageImageUrl = (pageId, index) =>
  typeof index === 'number' ? `/api/v2/image/page/${pageId}?index=${index}` : `/api/v2/image/page/${pageId}`

export const buildBlockImageUrl = (blockId) => `/api/v2/image/block/${blockId}`
