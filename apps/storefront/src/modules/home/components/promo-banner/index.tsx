import { Button } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const PromoBanner = () => {
  return (
    <section className="content-container pb-16 small:pb-24">
      <div className="relative overflow-hidden rounded-md bg-neutral-950 px-6 py-16 text-white small:px-16 small:py-20">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-neutral-900 [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]" />
        <div className="relative z-10 max-w-xl">
          <p className="section-kicker text-neutral-400">Built for training</p>
          <h2 className="display-title mt-4 text-4xl small:text-6xl">
            Engineered
            <br />
            for movement.
          </h2>
          <p className="mt-5 max-w-md text-neutral-300">
            Clean cuts, durable fabrics and a silent palette. Performance first,
            always.
          </p>
          <LocalizedClientLink href="/store" className="mt-8 inline-flex">
            <Button
              size="large"
              variant="secondary"
              className="bg-white text-black hover:bg-neutral-200"
            >
              Explore the store
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default PromoBanner
