export type ProductMedia = {
  primary: string
  hover?: string
  gallery: string[]
}

export const LIFESTYLE = {
  hero: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=80",
  collection:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80",
  editorial:
    "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1800&q=80",
  running:
    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1400&q=80",
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80",
  urban:
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1400&q=80",
  training:
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80",
  jacket:
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=80",
}

type CatalogFlags = {
  isNew?: boolean
  onSale?: boolean
  originalPrice?: number | null
}

const FALLBACK_FLAGS: Record<string, CatalogFlags> = {
  "t-shirt": { isNew: false, onSale: false },
  sweatshirt: { isNew: false, onSale: true, originalPrice: 25 },
  sweatpants: { isNew: false, onSale: false },
  shorts: { isNew: true, onSale: false },
}

export function getProductMedia(
  product?: {
    handle?: string | null
    thumbnail?: string | null
    images?: { url?: string }[] | null
  } | null,
  options?: { preferAlt?: boolean }
): ProductMedia {
  const urls = (product?.images || [])
    .map((image) => image.url)
    .filter((url): url is string => Boolean(url))
  const primary = product?.thumbnail || urls[0] || ""
  const hover = urls.find((url) => url !== primary) || urls[1] || primary

  if (options?.preferAlt && hover) {
    return { primary: hover, hover: primary, gallery: urls.length ? urls : [hover, primary] }
  }

  return {
    primary,
    hover: hover !== primary ? hover : undefined,
    gallery: urls.length ? urls : [primary, hover].filter(Boolean),
  }
}

export function getCatalogFlags(product?: {
  handle?: string | null
  metadata?: Record<string, unknown> | null
} | null): CatalogFlags {
  const metadata = product?.metadata || {}
  const fallback = FALLBACK_FLAGS[product?.handle || ""] || {}
  return {
    isNew: Boolean(metadata.isNew ?? fallback.isNew),
    onSale: Boolean(metadata.onSale ?? fallback.onSale),
    originalPrice:
      typeof metadata.originalPrice === "number"
        ? metadata.originalPrice
        : fallback.originalPrice,
  }
}

export function getCategoryVisual(handleOrName: string, index = 0) {
  const key = handleOrName.toLowerCase()
  if (key.includes("shirt") && !key.includes("sweat")) return LIFESTYLE.training
  if (key.includes("short")) return LIFESTYLE.running
  if (key.includes("pant")) return LIFESTYLE.gym
  if (key.includes("jacket") || key.includes("sweat")) return LIFESTYLE.jacket
  if (key.includes("set")) return LIFESTYLE.collection
  if (key.includes("access") || key.includes("merch")) return LIFESTYLE.urban
  const pool = [
    LIFESTYLE.training,
    LIFESTYLE.running,
    LIFESTYLE.gym,
    LIFESTYLE.jacket,
    LIFESTYLE.collection,
    LIFESTYLE.urban,
  ]
  return pool[index % pool.length]
}

export function getCategoryLabel(name: string, handle?: string | null) {
  const key = `${handle || ""} ${name}`.toLowerCase()
  if (key.includes("short")) return "Shorts"
  if (key.includes("jacket")) return "Jackets"
  if (key.includes("set")) return "Sets"
  if (key.includes("access")) return "Accessories"
  if (key.includes("shirt") && !key.includes("sweat")) return "T-Shirts"
  if (key.includes("sweatshirt")) return "Jackets"
  if (key.includes("pant")) return "Pants"
  if (key.includes("merch")) return "Accessories"
  return name
}

export const CATEGORY_LANDING = [
  { key: "t-shirts", label: "T-Shirts", image: LIFESTYLE.training },
  { key: "shorts", label: "Shorts", image: LIFESTYLE.running },
  { key: "pants", label: "Pants", image: LIFESTYLE.gym },
  { key: "jackets", label: "Jackets", image: LIFESTYLE.jacket },
  { key: "sets", label: "Sets", image: LIFESTYLE.collection },
  { key: "accessories", label: "Accessories", image: LIFESTYLE.urban },
]
