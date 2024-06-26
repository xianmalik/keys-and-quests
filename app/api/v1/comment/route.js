import { client } from "@/lib/sanity/client"

export async function POST(request) {
  const data = await request.json()
  const { name, email, message, post } = data;
  console.log(data)

  try {
    await client.create({
      _type: 'comment',
      name,
      email,
      message,
      post,
      approved: true, // process.env.NEXT_COMMENT_AUTO_APPROVE || true
    });
    return Response.json({ success: true, message: 'Comment submitted' });
  } catch (error) {
    return Response.json({ success: false, message: 'Could not submit comment', error });
  }
}