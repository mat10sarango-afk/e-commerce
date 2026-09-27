import { Suspense } from "react"

import { listCategories } from "@lib/data/categories"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import NavHeader from "@modules/layout/components/nav-header"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale, productCategories] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    listCategories(),
  ])

  const categories = (productCategories || [])
    .filter((category) => !category.parent_category)
    .slice(0, 4)

  return (
    <NavHeader>
      <nav className="content-container flex items-center justify-between w-full h-full text-sm text-white">
        <div className="flex items-center gap-3 flex-1 basis-0 h-full">
          <div className="h-full small:hidden">
            <SideMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
            />
          </div>
          <div className="hidden small:flex items-center gap-6 h-full">
            <LocalizedClientLink
              className="hover:text-neutral-300 transition-colors duration-200"
              href="/store"
            >
              Store
            </LocalizedClientLink>
            {categories.map((category) => (
              <LocalizedClientLink
                key={category.id}
                className="hover:text-neutral-300 transition-colors duration-200"
                href={`/categories/${category.handle}`}
              >
                {category.name}
              </LocalizedClientLink>
            ))}
          </div>
        </div>

        <div className="flex items-center h-full">
          <LocalizedClientLink
            href="/"
            className="font-display text-2xl font-extrabold tracking-[0.22em] uppercase hover:text-neutral-200 transition-colors"
            data-testid="nav-store-link"
          >
            Pulse
          </LocalizedClientLink>
        </div>

        <div className="flex items-center gap-x-5 h-full flex-1 basis-0 justify-end">
          <LocalizedClientLink
            className="hidden small:inline-flex hover:text-neutral-300 transition-colors duration-200"
            href="/account"
            data-testid="nav-account-link"
          >
            Account
          </LocalizedClientLink>
          <Suspense
            fallback={
              <LocalizedClientLink
                className="hover:text-neutral-300 flex gap-2 transition-colors"
                href="/cart"
                data-testid="nav-cart-link"
              >
                Cart
                <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-white text-neutral-950 px-1.5 text-[11px] font-bold">
                  0
                </span>
              </LocalizedClientLink>
            }
          >
            <CartButton />
          </Suspense>
          <div className="hidden small:block h-full">
            <SideMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
            />
          </div>
        </div>
      </nav>
    </NavHeader>
  )
}
