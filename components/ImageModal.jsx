'use client'

import { useState } from 'react'
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export const ImageModal = ({ src, alt, width, height, className, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn("cursor-zoom-in", className)}
          {...rest}
        />
      </DialogTrigger>

      <DialogContent className="max-w-3xl border-2 border-black bg-white p-4 shadow-retro sm:rounded-none">
        <DialogTitle className="text-sm font-medium text-gray-700">{alt}</DialogTitle>
        <div className="relative h-[70vh] w-full">
          <Image src={src} alt={alt} fill className="object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
