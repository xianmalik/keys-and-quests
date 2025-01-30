import { notionClient } from '@/lib/notionClient';
import { client } from '@/lib/sanity/client';

export async function GET(request, { params }) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    ...,
    mainImage {
      ...,
      asset->
    },
    body->,
    price->,
    brand->,
    material->,
    actuation->,
    switchType->,
    lubeStatus->,
    categories[]->,
    _createdAt->
  }`

  try {
    const { slug } = params;
    const post = await client.fetch(query, { slug })

    const notionResponse = await notionClient.databases.query({
      database_id: 'f8ecd71b58264356b33b207ebf9a69e5',
      filter: {
        property: 'ID',
        unique_id: {
          equals: 141
        }
      }
    });

    if (!post._id) {
      return Response.json({ success: false, message: '404: Post Not Found!', error });
    }

    const prevQuery = `*[_type == "post" && _createdAt < "${post._createdAt}"] | order(_createdAt desc)[0] {
      slug,
      title
    }`

    const nextQuery = `*[_type == "post" && _createdAt > "${post._createdAt}"] | order(_createdAt asc)[0] {
      slug,
      title
    }`

    const prev = await client.fetch(prevQuery)
    const next = await client.fetch(nextQuery)

    return Response.json({
      success: true,
      message: 'Succesfully fetched post',
      post: {
        ...post,
        properties: notionResponse?.results?.[0]?.properties,
        prev,
        next
      }
    })
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch data', error });
  }
}

export const dynamic = 'error'
