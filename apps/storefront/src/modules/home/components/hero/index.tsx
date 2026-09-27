import { Button, Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative h-[78vh] min-h-[540px] w-full overflow-hidden bg-neutral-950 text-white">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 0 42%, rgba(255,255,255,0.08) 42.5% 43%, transparent 43.5% 62%, rgba(255,255,255,0.05) 62.5% 63%, transparent 63.5%)",
        }}
      />
      <div className="absolute -right-24 top-10 h-[120%] w-[55%] rotate-12 bg-neutral-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

      <div className="content-container relative z-10 flex h-full flex-col justify-center gap-8 py-16">
        <span className="section-kicker text-neutral-400 animate-fade-up">
          Performance gear
        </span>
        <Heading
          level="h1"
          className="display-title max-w-3xl text-5xl text-white small:text-7xl animate-fade-up"
        >
          Move faster.
          <br />
          Train harder.
        </Heading>
        <p className="max-w-md text-base leading-7 text-neutral-300 small:text-lg">
          Athletic apparel designed for speed, control and everyday performance.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <LocalizedClientLink href="/store">
            <Button size="large">Shop now</Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/store">
            <Button
              size="large"
              variant="secondary"
              className="!bg-transparent !text-white !border-white hover:!bg-white hover:!text-black"
            >
              View collection
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
