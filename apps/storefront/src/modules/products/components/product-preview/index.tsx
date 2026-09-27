import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const category =
    product.collection?.title ||
    product.categories?.[0]?.name ||
    product.type?.value

  const isSale = cheapestPrice?.price_type === "sale"

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <article className="product-card group h-full" data-testid="product-wrapper">
        <div className="relative overflow-hidden bg-neutral-100">
          {isSale && (
            <span className="absolute left-3 top-3 z-10 bg-neutral-950 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              Sale
            </span>
          )}
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex h-10 items-center justify-center rounded-md bg-neutral-950 text-center font-display text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg">
              View product
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-4 py-4">
          {category && (
            <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
              {category}
            </p>
          )}
          <Text
            className="font-medium text-neutral-950"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="mt-2 flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </article>
    </LocalizedClientLink>
  )
}
