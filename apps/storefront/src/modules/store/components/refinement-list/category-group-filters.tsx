"use client"

import { usePathname, useSearchParams } from "next/navigation"

import { CATEGORY_LANDING } from "@lib/media/catalog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"

const FILTERS = [
  { key: "all", label: "All", href: "/store" },
  ...CATEGORY_LANDING.map((tile) => ({
    key: tile.key,
    label: tile.label,
    href: `/categories/${tile.key}`,
  })),
]

export default function CategoryGroupFilters() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const segments = pathname.split("/").filter(Boolean)
  const section = segments[1]
  const categoryKey = segments[2]
  const active =
    section === "categories" && categoryKey
      ? categoryKey
      : searchParams.get("group") || "all"

  return (
    <div className="flex flex-col gap-y-3">
      <p className="txt-compact-small-plus text-ui-fg-muted">Category</p>
      <ul className="flex flex-col gap-2">
        {FILTERS.map((item) => (
          <li key={item.key}>
            <LocalizedClientLink
              href={item.href}
              className={clx(
                "txt-compact-small text-ui-fg-subtle hover:text-ui-fg-base",
                active === item.key && "text-ui-fg-base font-semibold"
              )}
            >
              {item.label}
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
