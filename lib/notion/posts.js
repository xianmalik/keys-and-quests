import { notionClient } from '@/lib/notionClient'
import { mutatePost } from '@/lib/dataMutator'

export async function fetchPublishedPosts() {
  let results = []
  let cursor = undefined

  do {
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DB,
      start_cursor: cursor,
      page_size: 100,
      filter: {
        property: 'Blog Publishing',
        status: { equals: 'Published' },
      },
      sorts: [{ timestamp: 'created_time', direction: 'descending' }],
    })

    results = results.concat(response.results)
    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)

  return results.map(mutatePost)
}
