"use client"

import { clx } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductCardProps = {
  href: string
  title: string
  category?: string | null
  price?: string | null
  extra?: string | null
  primary: string
  hover?: string | null
  badge?: string | null
  compact?: boolean
}

const ProductCard = ({
  href,
  title,
  category,
  price,
  extra,
  primary,
  hover,
  badge,
  compact,
}: ProductCardProps) => {
  return (
    <LocalizedClientLink href={href} className="group block">
      <article
        className="product-card h-full"
        data-testid="product-wrapper"
      >
        <div className={clx("relative overflow-hidden bg-[#F2F2F2]", compact && "aspect-[4/5] max-h-[280px] small:max-h-none")}>
          {badge && (
            <span className="absolute left-3 top-3 z-10 bg-black px-2 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              {badge}
            </span>
          )}
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={primary}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            {hover && (
              <img
                src={hover}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
            <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <span className="flex h-10 items-center justify-center bg-black text-center font-display text-xs font-bold uppercase tracking-[0.14em] text-white">
                Ver producto
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1 bg-white px-0 py-4">
          {category && (
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#707070]">
              {category}
            </p>
          )}
          <h3 className="text-sm font-medium text-black" data-testid="product-title">
            {title}
          </h3>
          {price && <p className="mt-1 text-sm font-semibold">{price}</p>}
          {extra && (
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#707070]">
              {extra}
            </p>
          )}
          <span className="mt-2 text-[11px] font-display font-bold uppercase tracking-[0.16em] text-black/70 transition-colors group-hover:text-black">
            Añadir al carrito
          </span>
        </div>
      </article>
    </LocalizedClientLink>
  )
}

export default ProductCard
