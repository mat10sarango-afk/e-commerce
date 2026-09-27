import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function CategoryGrid() {
  const productCategories = await listCategories()
  const categories = (productCategories || []).filter(
    (category) => !category.parent_category
  )

  if (!categories.length) {
    return null
  }

  return (
    <section className="content-container py-16 small:py-24">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="section-kicker mb-3">Shop by category</p>
          <h2 className="display-title text-4xl small:text-5xl">The lineup</h2>
        </div>
        <LocalizedClientLink
          href="/store"
          className="hidden text-sm font-medium uppercase tracking-wider text-neutral-500 transition-colors hover:text-neutral-950 small:inline-flex"
        >
          All products
        </LocalizedClientLink>
      </div>
      <ul className="grid grid-cols-1 gap-4 xsmall:grid-cols-2 small:grid-cols-4">
        {categories.slice(0, 4).map((category, index) => {
          const image = category.products?.find((product) => product.thumbnail)
            ?.thumbnail

          return (
            <li key={category.id}>
              <LocalizedClientLink
                href={`/categories/${category.handle}`}
                className="group relative block overflow-hidden rounded-md bg-neutral-950"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div
                      className="h-full w-full bg-neutral-900"
                      style={{
                        backgroundImage:
                          index % 2 === 0
                            ? "linear-gradient(160deg, #171717 0%, #0a0a0a 100%)"
                            : "linear-gradient(200deg, #0a0a0a 0%, #262626 100%)",
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="section-kicker text-neutral-300">Category</p>
                    <h3 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </LocalizedClientLink>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
