import { NextResponse } from 'next/server'
import { client } from "@/lib/sanity/client"

export async function GET() {
  const query = `*[_type == "post"] {
    ...,
    author->,
    mainImage {
      ...,
      asset->
    },
    categories[]->,
    body
  }`


  try {
    const posts = await client.fetch(query)
    if (posts) {
      return NextResponse.json({ success: true, message: 'Succesfully fetched posts', posts })
    } else {
      throw Error;
    }
  } catch (error) {
    return NextResponse.status(500).json({ success: false, message: 'Failed to fetch data', error });
  }
}