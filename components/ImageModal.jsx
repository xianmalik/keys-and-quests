import { useState } from 'react'
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

export const ImageModal = ({ src, alt, width, height, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ cursor: 'pointer' }}
          onClick={() => setIsOpen(true)}
          {...rest}
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>{alt}</DialogHeader>
        <Image width={window.innerHeight / 2 * 3} height={window.innerHeight} src={src} alt={alt} className="mx-auto" />
      </DialogContent>
    </Dialog>
  );
};
