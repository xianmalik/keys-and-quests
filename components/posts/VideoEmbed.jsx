'use client'

import { useState } from "react"
import Image from "next/image"
import { ExternalLinkIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const getYoutubeId = (url) => {
  const match = url?.match(/(?:embed\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{6,})/)
  return match?.[1]
}

export default function VideoEmbed({ src, videoType, title }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!src) return null

  const youtubeId = getYoutubeId(src)
  const poster = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null
  const isShorts = videoType === 'shorts'
  const youtubeWatchUrl = youtubeId
    ? (isShorts ? `https://www.youtube.com/shorts/${youtubeId}` : `https://www.youtube.com/watch?v=${youtubeId}`)
    : src

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "group relative mx-auto block w-full overflow-hidden rounded-md border-2 border-black bg-black",
            isShorts ? "aspect-[9/16] max-w-xs" : "aspect-video"
          )}
          aria-label={`Play video: ${title}`}
        >
          {poster && (
            <Image
              src={poster}
              alt={title}
              fill
              className="object-cover opacity-80 transition-opacity group-hover:opacity-60"
            />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
          <span className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-white shadow-retro transition-transform group-hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
                <path d="M8 5v14l11-7-11-7Z" />
              </svg>
            </span>
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className={cn(
        "border-2 border-black bg-white p-4 shadow-retro sm:rounded-none",
        isShorts ? "max-w-sm" : "max-w-3xl"
      )}>
        <DialogTitle className="pe-6 text-sm font-medium text-gray-700">{title}</DialogTitle>
        <div className={cn(
          "relative w-full overflow-hidden rounded-md border-2 border-black bg-black",
          isShorts ? "aspect-[9/16] max-w-xs mx-auto" : "aspect-video"
        )}>
          {isOpen && (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`${src}${src.includes('?') ? '&' : '?'}autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>
          )}
        </div>
        <Button variant="retro" asChild className="mx-auto mt-1 bg-red-100">
          <a href={youtubeWatchUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLinkIcon size={14} className="me-1.5 inline" />
            View on YouTube
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
