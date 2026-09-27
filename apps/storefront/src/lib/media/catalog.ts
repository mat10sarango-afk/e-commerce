export type ProductMedia = {
  primary: string
  hover: string
  gallery: string[]
  badge?: "NEW" | "LIMITED" | "BEST SELLER"
}

const vtex = (id: number) =>
  `https://hmecuador.vtexassets.com/arquivos/ids/${id}-1200-1600`

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

const LOOKS: ProductMedia[] = [
  {
    primary: vtex(4498740),
    hover: vtex(4498736),
    gallery: [vtex(4498740), vtex(4498736), vtex(4498738)],
    badge: "NEW",
  },
  {
    primary: vtex(3893372),
    hover: vtex(3893368),
    gallery: [vtex(3893372), vtex(3893368)],
    badge: "BEST SELLER",
  },
  {
    primary: vtex(4463950),
    hover: vtex(4463945),
    gallery: [vtex(4463950), vtex(4463945)],
    badge: "NEW",
  },
  {
    primary: vtex(3939847),
    hover: vtex(3939844),
    gallery: [vtex(3939847), vtex(3939844)],
    badge: "LIMITED",
  },
  {
    primary: vtex(4394293),
    hover: vtex(4394289),
    gallery: [vtex(4394293), vtex(4394289)],
    badge: "BEST SELLER",
  },
  {
    primary: vtex(4478456),
    hover: vtex(4478457),
    gallery: [vtex(4478456), vtex(4478457)],
    badge: "NEW",
  },
  {
    primary: vtex(4263636),
    hover: vtex(4263631),
    gallery: [vtex(4263636), vtex(4263631)],
    badge: "LIMITED",
  },
  {
    primary: vtex(4327420),
    hover: vtex(4327416),
    gallery: [vtex(4327420), vtex(4327416)],
    badge: "NEW",
  },
  {
    primary: vtex(4039117),
    hover: vtex(4039114),
    gallery: [vtex(4039117), vtex(4039114)],
    badge: "BEST SELLER",
  },
  {
    primary: vtex(4498741),
    hover: vtex(4498746),
    gallery: [vtex(4498741), vtex(4498746)],
  },
]

const HANDLE_INDEX: Record<string, number> = {
  "t-shirt": 0,
  sweatshirt: 5,
  sweatpants: 3,
  shorts: 2,
}

export function getProductMedia(
  product?: { handle?: string | null; id?: string | null } | null,
  options?: { preferAlt?: boolean }
): ProductMedia {
  const handle = product?.handle || ""
  const mapped = HANDLE_INDEX[handle]
  const index =
    typeof mapped === "number"
      ? mapped
      : Math.abs(hashCode(product?.id || handle || "pulse")) % LOOKS.length
  const look = LOOKS[index]
  if (!options?.preferAlt) {
    return look
  }
  return {
    ...look,
    primary: look.hover,
    hover: look.primary,
  }
}

export function getCategoryVisual(handleOrName: string, index = 0) {
  const key = handleOrName.toLowerCase()
  if (key.includes("shirt") && !key.includes("sweat")) return LIFESTYLE.training
  if (key.includes("short")) return LIFESTYLE.running
  if (key.includes("pant") || key.includes("sweat")) return LIFESTYLE.gym
  if (key.includes("merch") || key.includes("jacket")) return LIFESTYLE.jacket
  const pool = [
    LIFESTYLE.training,
    LIFESTYLE.running,
    LIFESTYLE.gym,
    LIFESTYLE.jacket,
    LIFESTYLE.urban,
  ]
  return pool[index % pool.length]
}

export function getCategoryLabel(name: string, handle?: string | null) {
  const key = `${handle || ""} ${name}`.toLowerCase()
  if (key.includes("short")) return "Shorts"
  if (key.includes("shirt") && !key.includes("sweat")) return "Camisetas"
  if (key.includes("sweatshirt")) return "Chaquetas"
  if (key.includes("pant")) return "Pantalones"
  if (key.includes("short")) return "Shorts"
  if (key.includes("merch")) return "Conjuntos"
  return name
}

function hashCode(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return hash
}
