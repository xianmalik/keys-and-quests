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
    price->,
    brand->,
    material->,
    actuation->,
    switchType->,
    lubeStatus->,
    categories[]->,
    body
  }`

  try {
    const { slug } = params;
    const post = await client.fetch(query, { slug })

    if (post) {
      return NextResponse.json({ success: true, message: 'Succesfully fetched post', post })
    } else {
      throw Error;
    }
  } catch (error) {
    return NextResponse.status(500).json({ success: false, message: 'Failed to fetch data', error });
  }
}
