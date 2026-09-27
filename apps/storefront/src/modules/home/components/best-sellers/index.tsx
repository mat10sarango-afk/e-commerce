import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function BestSellers({
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
    <section className="content-container pb-8 small:pb-16">
      <div className="mb-12 flex items-end justify-between gap-4">
        <div>
          <p className="section-kicker mb-3">Most wanted</p>
          <h2 className="display-title text-4xl small:text-6xl">
            Best sellers
          </h2>
        </div>
        <InteractiveLink href="/store">Ver ofertas</InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-10 small:grid-cols-3 medium:grid-cols-4 small:gap-x-6">
        {products.slice(0, 4).map((product) => (
          <li key={`best-${product.id}`}>
            <ProductPreview
              product={product}
              region={region}
              preferAlt
              showBadge
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
