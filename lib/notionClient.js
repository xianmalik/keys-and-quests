import { Client } from '@notionhq/client'

const auth = process.env.NOTION_API_KEY

const notionClient = new Client({ auth })

export {
  notionClient,
}