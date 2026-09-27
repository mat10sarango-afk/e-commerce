import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { getCategoryLabel, getProductMedia } from "@lib/media/catalog"
import ProductCard from "./product-card"

export default async function ProductPreview({
  product,
  region: _region,
  showBadge,
  preferAlt,
  compact,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  showBadge?: boolean
  preferAlt?: boolean
  compact?: boolean
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const category =
    product.collection?.title ||
    product.categories?.[0]?.name ||
    product.type?.value

  const media = getProductMedia(product, { preferAlt })
  const extra = product.variants?.length
    ? `${product.variants.length} variantes`
    : "Envío disponible"

  return (
    <ProductCard
      href={`/products/${product.handle}`}
      title={product.title || "Producto"}
      category={category ? getCategoryLabel(category, product.handle) : null}
      price={cheapestPrice?.calculated_price}
      extra={extra}
      primary={media.primary}
      hover={media.hover}
      badge={showBadge ? media.badge : cheapestPrice?.price_type === "sale" ? "SALE" : null}
      compact={compact}
    />
  )
}
