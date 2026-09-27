import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import { CATEGORY_LANDING, getCategoryVisual } from "@lib/media/catalog"
import { matchCategoryProduct } from "@lib/util/catalog-filters"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function CategoryLanding({
  countryCode,
}: {
  countryCode: string
}) {
  const [categories, productResult] = await Promise.all([
    listCategories(),
    listProducts({
      countryCode,
      queryParams: { limit: 100, fields: "handle,title,*categories" },
    }),
  ])
  const products = productResult.response.products || []

  const tiles = CATEGORY_LANDING.map((tile, index) => {
    const category = (categories || []).find((item) => {
      const haystack = `${item.handle} ${item.name}`.toLowerCase()
      if (tile.key === "t-shirts") return haystack.includes("shirt") && !haystack.includes("sweat")
      if (tile.key === "jackets") return haystack.includes("jacket") || haystack.includes("sweatshirt")
      return haystack.includes(tile.key.slice(0, -1)) || haystack.includes(tile.key)
    })
    const count = products.filter((product) =>
      matchCategoryProduct(product, tile.key)
    ).length

    return {
      ...tile,
      count,
      href: `/categories/${tile.key}`,
      image: category
        ? getCategoryVisual(category.handle || category.name, index)
        : tile.image,
    }
  })

  return (
    <div className="content-container py-10 small:py-16">
      <p className="section-kicker mb-3">Categories</p>
      <h1 className="display-title text-4xl small:text-6xl">Shop by category</h1>
      <ul className="mt-10 grid grid-cols-1 gap-3 xsmall:grid-cols-2 small:grid-cols-3">
        {tiles.map((tile) => (
          <li key={tile.key}>
            <LocalizedClientLink
              href={tile.href}
              className="group relative block overflow-hidden bg-[#111111]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={tile.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/50" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                  <div>
                    <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight">
                      {tile.label}
                    </h2>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/70">
                      {tile.count} productos
                    </p>
                  </div>
                  <span className="translate-x-2 text-lg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </div>
              </div>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
