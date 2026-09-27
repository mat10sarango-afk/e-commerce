import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import NavHeader from "@modules/layout/components/nav-header"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <NavHeader>
      <nav className="content-container flex items-center justify-between w-full h-full text-[12px] text-white">
        <div className="flex items-center gap-3 flex-1 basis-0 h-full">
          <div className="h-full small:hidden">
            <SideMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
            />
          </div>
          <LocalizedClientLink
            href="/"
            className="font-display text-[1.7rem] font-extrabold tracking-[0.22em] uppercase"
            data-testid="nav-store-link"
          >
            Pulse
          </LocalizedClientLink>
        </div>

        <div className="hidden small:flex items-center gap-7 h-full font-display font-semibold uppercase tracking-[0.16em]">
          <LocalizedClientLink className="hover:text-white/70 transition-colors" href="/store">
            Shop
          </LocalizedClientLink>
          <LocalizedClientLink className="hover:text-white/70 transition-colors" href="/categories">
            Categories
          </LocalizedClientLink>
          <LocalizedClientLink className="hover:text-white/70 transition-colors" href="/new">
            New
          </LocalizedClientLink>
          <LocalizedClientLink className="hover:text-white/70 transition-colors" href="/sale">
            Sale
          </LocalizedClientLink>
        </div>

        <div className="flex items-center gap-x-5 h-full flex-1 basis-0 justify-end font-display font-semibold uppercase tracking-[0.16em]">
          <LocalizedClientLink
            className="hidden small:inline-flex hover:text-white/70 transition-colors"
            href="/store"
          >
            Search
          </LocalizedClientLink>
          <LocalizedClientLink
            className="hidden small:inline-flex hover:text-white/70 transition-colors"
            href="/account"
            data-testid="nav-account-link"
          >
            Account
          </LocalizedClientLink>
          <Suspense
            fallback={
              <LocalizedClientLink
                className="hover:text-white/70 flex gap-2 transition-colors"
                href="/cart"
                data-testid="nav-cart-link"
              >
                Cart
                <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-white text-black px-1.5 text-[11px] font-bold">
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
