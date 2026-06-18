import { slugify } from '@/lib/utils'
import { resolveFileUrl, buildPageImageUrl } from '@/lib/notion/images'

export const mutateProperties = (properties, pageId) => {
  const galleryFiles = properties?.['Gallery']?.files || []

  return {
    id: properties?.['ID']?.unique_id?.number,
    tagline: properties?.['Tagline']?.rich_text?.[0]?.plain_text,
    brandName: properties?.['Switch Brand']?.multi_select?.map(({ name }) => name),
    switchType: properties?.['Type']?.select?.name,
    lubeStatus: properties?.['Lube Status']?.select?.name,
    stemMaterial: properties?.['Stem Material']?.select?.name,
    topHousing: properties?.['Top Housing']?.select?.name,
    bottomHousing: properties?.['Bottom Housing']?.select?.name,
    actuation: properties?.['Actuation (g)']?.number,
    video: properties?.['Video']?.url,
    videoType: properties?.['Video Type']?.select?.name,
    // Gallery files are served through our own proxy so raw Notion S3 URLs never reach the client.
    gallery: galleryFiles.map((file, index) => ({
      name: file.name,
      url: buildPageImageUrl(pageId, index),
    })),
  }
}

export const mutatePost = (page) => {
  const title = page.properties?.['Name']?.title?.[0]?.plain_text
  const slug = page.properties?.['Slug']?.rich_text?.[0]?.plain_text || slugify(title)
  const hasImage = Boolean(resolveFileUrl(page.cover) || resolveFileUrl(page.properties?.['Gallery']?.files?.[0]))

  return {
    _id: page.id,
    title,
    slug,
    mainImage: hasImage ? buildPageImageUrl(page.id) : null,
    isPublished: page.properties?.['Blog Publishing']?.status?.name === 'Published',
    _createdAt: page.created_time,
    properties: mutateProperties(page.properties, page.id),
  }
}
