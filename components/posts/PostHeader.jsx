import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { AlignBottomIcon, BlendingModeIcon, BorderBottomIcon, BorderTopIcon, CommitIcon, Component1Icon, ComponentBooleanIcon, Crosshair2Icon } from "@radix-ui/react-icons";

import { Badge } from '@/components/ui/badge';

import { formatDate } from "@/lib/utils";

export default function PostHeader({ data }) {
  if (!data) {
    return 'no data'
  }

  return (
    <div className="mx-auto max-w-screen-xl w-full px-4 my-16">
      <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-2xl border border-gray300 shadow-lg md:flex-row-reverse">
        <div className="md:order-last">
          <Image alt={data?.title} className="w-full h-full object-cover transition-all" src={data?.mainImage?.asset?.url} height={280} width={280} />
        </div>
        <div className="relative col-span-2 flex flex-col justify-center py-6 px-8 lg:px-16 lg:py-12 xl:px-24">
          <div className="flex items-center gap-2 font-light mb-2 md:mb-4">
            {data?.categories?.map(({ _id, title }) => (
              <Badge className="tracking-wider rounded-full" key={_id}>{title}</Badge>
            ))}
          </div>
          <h1 className='text-[2.5rem] font-semibold leading-none mb-4 md:mb-8'>
            {data?.title}
            {!!data?.tag && ` | ${data?.tag}`}
          </h1>
          <div className="flex flex-col items-start text-sm font-light mb-4 md:mb-8 gap-1 text-gray-600">
            {data?.brand?.name && <div className="flex items-center gap-1">
              <Component1Icon className="me-1" />
              Brand: <span className="font-medium">{data?.brand?.name}</span>
            </div>}
            {data?.switchType?.name && <div className="flex items-center gap-1">
              <Crosshair2Icon className="me-1" />
              Switch Type: <span className="font-medium">{data?.switchType?.name}</span>
            </div>}
            {data?.actuation && <div className="flex items-center gap-1">
              <CommitIcon className="me-1" />
              Actuation Point: <span className="font-medium">{data?.actuation}±5g</span>
            </div>}
            <div className="flex items-center gap-1">
              <BlendingModeIcon className="me-1" />
              Is Factory Lubed?: <span className="font-medium">{data?.lubeStatus ? 'Yes' : 'No'}</span>
            </div>
            {data?.material?.top && <div className="flex items-center gap-1">
              <BorderTopIcon className="me-1" />
              Top Housing: <span className="font-medium">{data?.material?.top}</span>
            </div>}
            {data?.material?.bottom && <div className="flex items-center gap-1">
              <BorderBottomIcon className="me-1" />
              Bottom Housing: <span className="font-medium">{data?.material?.bottom}</span>
            </div>}
            {data?.material?.stem && <div className="flex items-center gap-1">
              <AlignBottomIcon className="me-1" />
              Stem Material: <span className="font-medium">{data?.material?.stem}</span>
            </div>}
            {data?.price && <div className="flex items-center gap-1">
              <ComponentBooleanIcon className="me-1" />
              Price: <span className="font-medium">${data?.price}</span> per switch
            </div>}
          </div>
          <div className="text-xs text-gray600">Published: {formatDate(data?._createdAt)}</div>
        </div>
      </div>
    </div>
  )
}