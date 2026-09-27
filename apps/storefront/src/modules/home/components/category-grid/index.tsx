import { CATEGORY_LANDING } from "@lib/media/catalog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CategoryGrid() {
  const tiles = CATEGORY_LANDING.slice(0, 5)

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
              href={`/categories/${tile.key}`}
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
