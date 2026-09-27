import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getCategoryLabel } from "@lib/media/catalog"

export default async function Footer() {
  const productCategories = await listCategories()
  const parents = (productCategories || []).filter(
    (category) => !category.parent_category
  )

  return (
    <footer className="w-full bg-black text-[#F2F2F2]">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 small:flex-row items-start justify-between py-16 small:py-24">
          <div className="max-w-xs">
            <LocalizedClientLink
              href="/"
              className="font-display text-3xl font-extrabold tracking-[0.22em] uppercase text-white"
            >
              Pulse
            </LocalizedClientLink>
            <p className="mt-4 text-sm text-[#707070] leading-6">
              Ropa deportiva para entrenar, correr y moverte todos los días.
            </p>
          </div>
          <div className="text-sm gap-12 grid grid-cols-2 sm:grid-cols-4">
            <div className="flex flex-col gap-y-3">
              <span className="font-display text-xs tracking-[0.22em] uppercase text-white">
                Tienda
              </span>
              <ul className="grid grid-cols-1 gap-2 text-[#707070]">
                <li>
                  <LocalizedClientLink className="hover:text-white transition-colors" href="/store">
                    Todos los productos
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-white transition-colors" href="/store">
                    New arrivals
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-white transition-colors" href="/store">
                    Sale
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            {parents.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="font-display text-xs tracking-[0.22em] uppercase text-white">
                  Categorías
                </span>
                <ul className="grid grid-cols-1 gap-2 text-[#707070]">
                  {parents.slice(0, 6).map((category) => (
                    <li key={category.id}>
                      <LocalizedClientLink
                        className="hover:text-white transition-colors"
                        href={`/categories/${category.handle}`}
                      >
                        {getCategoryLabel(category.name)}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="font-display text-xs tracking-[0.22em] uppercase text-white">
                Ayuda
              </span>
              <ul className="grid grid-cols-1 gap-2 text-[#707070]">
                <li>
                  <LocalizedClientLink className="hover:text-white transition-colors" href="/cart">
                    Carrito
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-white transition-colors" href="/account">
                    Cuenta
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-3">
              <span className="font-display text-xs tracking-[0.22em] uppercase text-white">
                Contacto
              </span>
              <ul className="grid grid-cols-1 gap-2 text-[#707070]">
                <li>hola@pulse.store</li>
                <li>Entrenamiento diario</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full py-6 border-t border-white/10 justify-between items-center text-[#707070]">
          <p className="text-xs">© {new Date().getFullYear()} PULSE. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
