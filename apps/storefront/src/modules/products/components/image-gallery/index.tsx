"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import { getProductMedia } from "@lib/media/catalog"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  product?: { handle?: string | null; id?: string | null } | null
}

const ImageGallery = ({ images, product }: ImageGalleryProps) => {
  const media = getProductMedia(product)
  const gallery = media.gallery.length
    ? media.gallery.map((url, index) => ({ id: `media-${index}`, url }))
    : images
  const [active, setActive] = useState(0)
  const current = gallery[active] || gallery[0]

  if (!gallery?.length) {
    return <div className="aspect-[4/5] w-full bg-[#F2F2F2]" />
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#F2F2F2]"
        id={current?.id}
      >
        {!!current?.url && (
          <img
            src={current.url}
            alt={`Product image ${active + 1}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {gallery.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(index)}
              className={clx(
                "relative h-20 w-16 shrink-0 overflow-hidden border transition-all duration-200",
                index === active
                  ? "border-black"
                  : "border-transparent hover:border-[#707070]"
              )}
              id={image.id}
            >
              {!!image.url && (
                <img
                  src={image.url}
                  alt=""
                  className="h-full w-full object-cover"
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
