import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client';

export async function GET(request, { params }) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    ...,
    author->,
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

    if (post) {
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

      return NextResponse.json({
        success: true,
        message: 'Succesfully fetched post',
        post: {
          ...post,
          prev,
          next
        }
      })
    } else {
      throw new Error('ba dum tss');
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch data', error });
  }
}
