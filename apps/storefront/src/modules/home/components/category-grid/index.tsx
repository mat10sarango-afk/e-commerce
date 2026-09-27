import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getCategoryLabel, getCategoryVisual, LIFESTYLE } from "@lib/media/catalog"

export default async function CategoryGrid() {
  const productCategories = await listCategories()
  const categories = (productCategories || []).filter(
    (category) => !category.parent_category
  )

  const tiles = [
    ...categories.slice(0, 4).map((category, index) => ({
      key: category.id,
      href: `/categories/${category.handle}`,
      label: getCategoryLabel(category.name),
      image: getCategoryVisual(category.handle || category.name, index),
    })),
    {
      key: "shorts",
      href: "/store",
      label: "Shorts",
      image: LIFESTYLE.running,
    },
  ].slice(0, 5)

  if (!tiles.length) {
    return null
  }

  return (
    <section className="content-container py-8 small:py-16">
      <div className="mb-10">
        <p className="section-kicker mb-3">Shop by category</p>
        <h2 className="display-title text-4xl small:text-6xl">Categorías</h2>
      </div>
      <ul className="grid grid-cols-1 gap-3 xsmall:grid-cols-2 small:grid-cols-5">
        {tiles.map((tile) => (
          <li key={tile.key} className="small:first:col-span-2">
            <LocalizedClientLink
              href={tile.href}
              className="group relative block overflow-hidden bg-[#111111]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={tile.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/50" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-white">
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">
                    {tile.label}
                  </h3>
                  <span className="translate-x-2 text-lg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </div>
              </div>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
