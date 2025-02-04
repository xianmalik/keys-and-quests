import { notionClient } from "@/lib/notionClient";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const startCursor = searchParams.get('start_cursor');

    console.log({ startCursor: !!startCursor ? startCursor : undefined });

    const posts = await notionClient.databases.query({
      database_id: process.env.NOTION_DB,
      start_cursor: !!startCursor ? startCursor : undefined,
      page_size: 100,
      filter: {
        property: 'Status',
        status: {
          equals: 'Collected'
        }
      },
      sorts: [
        {
          property: 'Name',
          direction: 'ascending',
        },
      ],
    });

    if (posts) {
      return Response.json({
        success: true,
        message: 'Successfully fetched posts',
        posts,
      })
    } else {
      throw new Error('No posts found');
    }
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch data', error: error.message });
  }
}

export const dynamicParams = false
