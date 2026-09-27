import { CATEGORY_LANDING, getCatalogFlags } from "@lib/media/catalog"
import { HttpTypes } from "@medusajs/types"

export type CatalogFilter = "all" | "new" | "sale"

export function filterCatalogProducts(
  products: HttpTypes.StoreProduct[],
  filter: CatalogFilter = "all"
) {
  if (filter === "new") {
    return products.filter((product) => getCatalogFlags(product).isNew)
  }
  if (filter === "sale") {
    return products.filter((product) => getCatalogFlags(product).onSale)
  }
  return products
}

export function matchCategoryProduct(
  product: HttpTypes.StoreProduct,
  group: string
) {
  const categories = (product.categories || []).map((category) =>
    `${category.name} ${category.handle}`.toLowerCase()
  )
  const text = `${product.handle || ""} ${product.title || ""}`.toLowerCase()
  const has = (...values: string[]) =>
    values.some(
      (value) =>
        categories.some((category) => category.includes(value)) ||
        text.includes(value)
    )

  switch (group) {
    case "t-shirts":
      return (
        !has("set") &&
        (categories.some((category) => category.includes("shirts") && !category.includes("sweat")) ||
          has("t-shirt", "tee", "tank"))
      )
    case "shorts":
      return has("short")
    case "pants":
      return has("pant", "jogger")
    case "jackets":
      return has("jacket", "sweatshirt", "long-sleeve", "long sleeve")
    case "sets":
      return has("set")
    case "accessories":
      return has("access", "cap", "bottle", "sock", "bag")
    default:
      return false
  }
}

export function resolveCategoryGroup(handle?: string | null) {
  const key = (handle || "").toLowerCase()
  if (CATEGORY_LANDING.some((tile) => tile.key === key)) {
    return key
  }
  if (key.includes("short")) return "shorts"
  if (key.includes("jacket") || key.includes("sweatshirt")) return "jackets"
  if (key.includes("set")) return "sets"
  if (key.includes("access")) return "accessories"
  if (key.includes("shirt") && !key.includes("sweat")) return "t-shirts"
  if (key.includes("pant")) return "pants"
  return null
}
