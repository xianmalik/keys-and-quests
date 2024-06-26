import { client } from "@/lib/sanity/client"

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand');

  const brandQuery = brand ? ` && brand->slug.current == "${brand}"` : '';

  const query = `*[_type == "post"${brandQuery}] | order(_createdAt desc) {
    ...,
    author->,
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
      throw Error;
    }
  } catch (error) {
    return Response.status(500).json({ success: false, message: 'Failed to fetch data', error });
  }
}