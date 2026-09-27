"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [active, setActive] = useState(0)
  const current = images[active] || images[0]

  if (!images?.length) {
    return (
      <div className="aspect-[4/5] w-full rounded-md bg-neutral-200" />
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-neutral-100"
        id={current?.id}
      >
        {!!current?.url && (
          <Image
            src={current.url}
            priority
            className="absolute inset-0 object-cover"
            alt={`Product image ${active + 1}`}
            fill
            sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 720px"
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(index)}
              className={clx(
                "relative h-20 w-16 shrink-0 overflow-hidden rounded-md border transition-all duration-200",
                index === active
                  ? "border-neutral-950"
                  : "border-transparent hover:border-neutral-400"
              )}
              id={image.id}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
