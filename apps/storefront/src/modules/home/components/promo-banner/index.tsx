import { Button } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const PromoBanner = () => {
  return (
    <section className="content-container pb-20 small:pb-28">
      <div className="flex flex-col items-start justify-between gap-8 bg-black px-6 py-16 text-white small:flex-row small:items-center small:px-16 small:py-20">
        <div>
          <h2 className="display-title text-5xl small:text-7xl">
            Up to 30% off
          </h2>
          <p className="mt-4 text-sm text-white/65 small:text-base">
            Seleccionados de temporada.
          </p>
        </div>
        <LocalizedClientLink href="/store">
          <Button className="bg-white text-black hover:bg-[#F2F2F2]">
            Ver ofertas
          </Button>
        </LocalizedClientLink>
      </div>
    </section>
  )
}

export default PromoBanner
