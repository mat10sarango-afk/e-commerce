import { getProductPrice } from "@lib/util/get-product-price"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { getCatalogFlags, getCategoryLabel, getProductMedia } from "@lib/media/catalog"
import ProductCard from "./product-card"

export default async function ProductPreview({
  product,
  region,
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
  const flags = getCatalogFlags(product)

  const category =
    product.collection?.title ||
    product.categories?.[0]?.name ||
    product.type?.value

  const media = getProductMedia(product, { preferAlt })
  const extra = product.variants?.length
    ? `${product.variants.length} variantes`
    : "Envío disponible"

  const originalPrice =
    flags.onSale && flags.originalPrice
      ? convertToLocale({
          amount: flags.originalPrice,
          currency_code: region.currency_code,
        })
      : cheapestPrice?.price_type === "sale"
        ? cheapestPrice.original_price
        : null

  const badge = flags.onSale
    ? "SALE"
    : flags.isNew || showBadge
      ? flags.isNew
        ? "NEW"
        : null
      : cheapestPrice?.price_type === "sale"
        ? "SALE"
        : null

  return (
    <ProductCard
      href={`/products/${product.handle}`}
      title={product.title || "Producto"}
      category={category ? getCategoryLabel(category, product.handle) : null}
      price={cheapestPrice?.calculated_price}
      originalPrice={originalPrice}
      extra={extra}
      primary={media.primary}
      hover={media.hover}
      badge={badge}
      compact={compact}
    />
  )
}
