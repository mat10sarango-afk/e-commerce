import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import CategoryGrid from "@modules/home/components/category-grid"
import Hero from "@modules/home/components/hero"
import PromoBanner from "@modules/home/components/promo-banner"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "PULSE — Performance Gear",
  description:
    "Premium athletic apparel and performance gear. Move faster. Train harder.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <Hero />
      <CategoryGrid />
      <div className="bg-white py-4">
        <ul className="flex flex-col">
          <FeaturedProducts region={region} />
        </ul>
      </div>
      <PromoBanner />
    </>
  )
}
