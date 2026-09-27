import { Button } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { LIFESTYLE } from "@lib/media/catalog"

const Hero = () => {
  return (
    <section className="relative h-[86vh] min-h-[560px] w-full overflow-hidden bg-black text-white">
      <img
        src={LIFESTYLE.hero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />

      <div className="content-container relative z-10 flex h-full flex-col justify-end pb-16 small:justify-center small:pb-0">
        <p className="section-kicker text-white/70">Performance gear</p>
        <h1 className="display-title mt-4 max-w-4xl text-[3.2rem] leading-[0.9] text-white small:text-7xl">
          Entrena.
          <br />
          Muévete.
          <br />
          Supera.
        </h1>
        <p className="mt-6 max-w-md text-sm leading-7 text-white/75 small:text-base">
          Ropa deportiva diseñada para acompañarte en cada movimiento.
        </p>
        <LocalizedClientLink href="/store" className="mt-8 inline-flex">
          <Button
            size="large"
            className="bg-white text-black hover:bg-[#F2F2F2]"
          >
            Ver colección
          </Button>
        </LocalizedClientLink>
      </div>
    </section>
  )
}

export default Hero
