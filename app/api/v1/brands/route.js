import { NextResponse } from 'next/server'
import { client } from "@/lib/sanity/client"

export async function GET() {
  const query = `*[_type == "brands"] | order(name asc) {
    _createdAt,
    _id,
    _rev,
    _type,
    _updatedAt,
    name,
    slug
  }`

  try {
    const brands = await client.fetch(query)
    if (brands) {
      return NextResponse.json({ success: true, message: 'Succesfully fetched brands', brands })
    } else {
      throw Error;
    }
  } catch (error) {
    return NextResponse.status(500).json({ success: false, message: 'Failed to fetch data', error });
  }
}