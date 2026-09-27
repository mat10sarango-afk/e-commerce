import { Button } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { LIFESTYLE } from "@lib/media/catalog"

export default function Editorial() {
  return (
    <section className="content-container py-20 small:py-28">
      <div className="grid grid-cols-1 overflow-hidden bg-black text-white small:grid-cols-2">
        <div className="relative min-h-[420px] small:min-h-[620px]">
          <img
            src={LIFESTYLE.editorial}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-[#000000] px-6 py-14 small:px-16">
          <p className="section-kicker text-white/55">Campaign</p>
          <h2 className="display-title mt-4 text-4xl small:text-6xl">
            Train without limits
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/70 small:text-base">
            Rendimiento, comodidad y movimiento en una sola colección.
          </p>
          <LocalizedClientLink href="/store" className="mt-8 inline-flex">
            <Button className="bg-white text-black hover:bg-[#F2F2F2]">
              Explorar
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
