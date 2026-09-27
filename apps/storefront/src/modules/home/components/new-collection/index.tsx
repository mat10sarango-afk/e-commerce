import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { LIFESTYLE } from "@lib/media/catalog"

export default function NewCollection({
  products,
  region,
}: {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}) {
  if (!products.length) {
    return null
  }

  return (
    <section className="content-container py-20 small:py-28">
      <div className="mb-10 flex flex-col gap-3 small:flex-row small:items-end small:justify-between">
        <div>
          <p className="section-kicker mb-3">New collection</p>
          <h2 className="display-title text-4xl small:text-6xl">Built to move</h2>
        </div>
        <LocalizedClientLink href="/store">
          <Button variant="secondary">Ver colección</Button>
        </LocalizedClientLink>
      </div>
      <div className="grid grid-cols-1 gap-4 small:grid-cols-2 small:gap-6">
        <LocalizedClientLink
          href="/store"
          className="group relative min-h-[420px] overflow-hidden bg-[#111111] small:min-h-[640px]"
        >
          <img
            src={LIFESTYLE.collection}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white small:p-10">
            <p className="section-kicker text-white/70">Campaign</p>
            <h3 className="display-title mt-3 text-4xl small:text-5xl">
              Training season
            </h3>
            <p className="mt-3 max-w-sm text-sm text-white/75">
              Siluetas limpias, tejidos técnicos y una paleta en negro y gris.
            </p>
          </div>
        </LocalizedClientLink>
        <ul className="grid grid-cols-1 gap-4 xsmall:grid-cols-3 small:grid-cols-1 medium:gap-6">
          {products.slice(0, 3).map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
