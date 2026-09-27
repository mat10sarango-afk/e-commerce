import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function NewArrivals({
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
    <section className="bg-white py-20 small:py-28">
      <div className="content-container">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker mb-3">Just dropped</p>
            <h2 className="display-title text-4xl small:text-6xl">
              New arrivals
            </h2>
          </div>
          <InteractiveLink href="/store">Ver todo</InteractiveLink>
        </div>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-10 small:grid-cols-4 small:gap-x-6">
          {products.slice(0, 8).map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} showBadge />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
