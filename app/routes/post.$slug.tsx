import { json } from '@remix-run/node';
import { useLoaderData } from "@remix-run/react";
import BlockContent from '@sanity/block-content-to-react';

import client from '~/sanityClient';

import Layout from '~/components/Layout';
import { Badge } from '~/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

export const loader = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const query = `*[_type == "post" && slug.current == $slug][0] {
    ...,
    author->,
    mainImage {
      ...,
      asset->
    },
    categories[]->,
    body
  }`;

  const data = await client.fetch(query, { slug });
  return json(data);
};

export default function Index() {
  const data = useLoaderData<Post>();
  const { title, body, categories, mainImage, author, _createdAt } = data;

  function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl px-4 my-16">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray300 shadow-lg lg:flex-row-reverse">
          <div className="flex-1 basis-1/4">
            <img alt={title} className="w-full transition-all" src={mainImage.asset.url} />
          </div>
          <div className="relative flex flex-1 basis-3/4 flex-col justify-center py-6 px-8 lg:px-16 lg:py-12 xl:px-24">
            <div className="mb-2 flex flex-wrap items-center">
              <div className="flex items-center">
                <div className="mr-2 overflow-hidden rounded-full border border-blue500">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>KQ</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs leading-none text-gray600">{author.name}</span>
              </div>
              {/* <div className="ml-auto hidden pl-2 text-xs text-gray600 lg:block">
                {formatDate(_createdAt)}
              </div> */}
            </div>
            <h1 className='text-[2.5rem] font-semibold mb-0'>{title}</h1>
            <div className="flex items-center gap-2 font-light mb-6">
              {categories?.map(({ _id, title }) => (
                <Badge key={_id}>{title}</Badge>
              ))}
            </div>
            <div className="text-xs text-gray600">{formatDate(_createdAt)}</div>
          </div>
        </div>
      </div>
      <article className='mx-auto max-w-4xl my-16 px-4'>
        <BlockContent blocks={body} />
      </article>
    </Layout>
  );
  {/* // <div className="mx-auto max-w-screen-xl px-4 my-8 md:mb-10 lg:mb-16">
      <div className="grid grid-cols-1 gap-y-4 gap-x-5 lg:gap-x-12 lg:gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        <a href={"/" + slug.current} className="flex flex-col">
          <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray300 shadow-lg">
            <div>
              <img alt={title} src={mainImage.asset.url} className="object-cover aspect-[16/10] w-full transition-all" />
            </div>
            <div className="flex flex-1 flex-col py-3 px-4 md:px-5 md:py-4 lg:px-7 lg:py-5">
              <p className="text-xl mb-2 text-gray800 md:mb-3">
                {title}
              </p>
              <div className="mt-auto flex items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>KQ</AvatarFallback>
                  </Avatar>
                  <span className="text-xs leading-none text-gray600">{author.name}</span>
                </div>
                <div className="ml-auto pl-2 text-xs text-gray600">{formatDate(_createdAt)}</div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div> */}
}
