
import imageUrlBuilder from '@sanity/image-url'
import { client } from "@/lib/sanity/client"

const builder = imageUrlBuilder(client);

export default function getAssetUrl(source) {
  return builder.image(source).url()
}