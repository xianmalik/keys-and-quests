import { client } from "@/lib/sanity/client"
import { notionClient } from "@/lib/notionClient";
import { mutateProperties } from "@/lib/dataMutator";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand');

  const brandQuery = brand ? ` && brand->slug.current == "${brand}"` : '';

  const query = `*[_type == "post"${brandQuery} && isPublished == true] | order(_createdAt desc) {
    ...,
    mainImage {
      ...,
      asset->
    },
    notion_item_id
  }`

  try {
    const posts = await client.fetch(query)
    const notionResponse = await notionClient.databases.query({
      database_id: process.env.NOTION_DB,
      filter: {
        or: posts.map(post => ({
          property: 'ID',
          unique_id: {
            equals: post.notion_item_id
          }
        }))
      }
    });

    const itemProperties = notionResponse?.results?.map(r => mutateProperties(r.properties));

    if (posts) {
      return Response.json({
        success: true,
        message: 'Succesfully fetched posts',
        posts: posts.map((post) => ({
          ...post,
          properties: itemProperties.find(item => item.id === post.notion_item_id),
        })),
      })
    } else {
      throw new Error('No posts found');
    }
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch data', error: error.message });
  }
}

export const dynamicParams = false
