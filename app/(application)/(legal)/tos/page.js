import { cn } from "@/lib/utils";

export default function Terms() {
  return (
    <article className='w-full pb-16'>
      <div
        className="mb-16 bg-cover bg-center bg-[url(/terms.webp)]"
      >
        <h1 className={cn(
          "text-3xl md:text-6xl text-white font-bold tracking-wider text-center",
          "uppercase py-16"
        )}>
          Terms of Use
        </h1>
      </div>
      <div className="max-w-4xl w-full mx-auto px-4">
        {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
      </div>
    </article>
  )
}
