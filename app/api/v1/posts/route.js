import { client } from "@/lib/sanity/client"

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
    brand->,
    switchType->,
    categories[]->
  }`

  try {
    const posts = await client.fetch(query)

    if (posts) {
      return Response.json({ success: true, message: 'Succesfully fetched posts', posts })
    } else {
      throw new Error('No posts found');
    }
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch data', error: error.message });
  }
}

export const dynamicParams = false
