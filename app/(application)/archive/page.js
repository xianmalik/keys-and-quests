import { cn } from "@/lib/utils";

export default function Archive() {
  return (
    <article className='w-full pb-16 px-4'>
      <div
        className="mb-16 bg-cover bg-center bg-[url(/faq-header.webp)]"
      >
        <h1 className={cn(
          "text-3xl md:text-6xl text-white font-bold tracking-wider text-center",
          "block h-full w-full py-16 md:py-52 px-4 bg-black/50"
        )}>Archive</h1>
      </div>
      <div className="border-2 border-[#222] shadow-retro p-6 max-w-screen-lg mx-auto bg-white">
        Archive
      </div>
    </article>
  )
}
