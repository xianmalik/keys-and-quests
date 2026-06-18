import { notionClient } from '@/lib/notionClient'
import { buildPageImageUrl } from '@/lib/notion/images'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const startCursor = searchParams.get('start_cursor')

    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DB,
      start_cursor: startCursor || undefined,
      page_size: 100,
      filter: {
        property: 'Status',
        status: { equals: 'Collected' },
      },
      sorts: [{ property: 'Name', direction: 'ascending' }],
    })

    const items = response.results.map((page) => {
      const uniqueId = page.properties?.['ID']?.unique_id

      return {
        id: page.id,
        idLabel: uniqueId ? `${uniqueId.prefix || ''}-${uniqueId.number}` : null,
        name: page.properties?.['Name']?.title?.[0]?.plain_text,
        brand: page.properties?.['Switch Brand']?.multi_select?.[0]?.name,
        switchType: page.properties?.['Type']?.select?.name,
        coverImageUrl: page.cover ? buildPageImageUrl(page.id) : null,
      }
    })

    return Response.json({
      success: true,
      message: 'Successfully fetched posts',
      items,
      nextCursor: response.has_more ? response.next_cursor : null,
    })
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch data', error: error.message })
  }
}

export const dynamicParams = false
