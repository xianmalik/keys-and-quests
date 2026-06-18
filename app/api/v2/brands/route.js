import { NextResponse } from 'next/server'
import { notionClient } from '@/lib/notionClient'

export async function GET() {
  try {
    const database = await notionClient.databases.retrieve({ database_id: process.env.NOTION_DB })
    const options = database.properties?.['Switch Brand']?.multi_select?.options || []

    const brands = options
      .map(({ name }) => ({ name }))
      .sort((a, b) => a.name.localeCompare(b.name))

    return NextResponse.json({ success: true, message: 'Succesfully fetched brands', brands })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch data', error: error.message })
  }
}
