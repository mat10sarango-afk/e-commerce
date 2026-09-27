import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import ProductPreview from "@modules/products/components/product-preview"

export default async function FeaturedProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const { collections } = await listCollections({
    fields: "*products",
  })

  if (collections?.length) {
    return collections.map((collection) => (
      <li key={collection.id}>
        <ProductRail collection={collection} region={region} />
      </li>
    ))
  }

  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      fields: "*variants.calculated_price",
      limit: 8,
    },
  })

  if (!products?.length) {
    return null
  }

  return (
    <li>
      <div className="content-container py-12 small:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker mb-3">Featured</p>
            <h2 className="display-title text-4xl small:text-5xl">
              Selected gear
            </h2>
          </div>
          <InteractiveLink href="/store">View all</InteractiveLink>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 small:grid-cols-3 medium:grid-cols-4 small:gap-x-6">
          {products.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
