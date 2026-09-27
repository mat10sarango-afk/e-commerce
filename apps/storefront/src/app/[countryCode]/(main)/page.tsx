import { Metadata } from "next"

import CategoryGrid from "@modules/home/components/category-grid"
import Hero from "@modules/home/components/hero"
import PromoBanner from "@modules/home/components/promo-banner"
import NewCollection from "@modules/home/components/new-collection"
import NewArrivals from "@modules/home/components/new-arrivals"
import Editorial from "@modules/home/components/editorial"
import BestSellers from "@modules/home/components/best-sellers"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "PULSE — Performance Gear",
  description:
    "Ropa deportiva diseñada para entrenar, moverte y superar cada sesión.",
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

  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      fields: "*variants.calculated_price,*categories",
      limit: 12,
    },
  })

  const catalog = products || []
  const collectionItems = catalog.slice(0, 3)
  const arrivals = catalog.slice(0, 8)
  const sellers = [...catalog].reverse().slice(0, 4)

  return (
    <>
      <Hero />
      <NewCollection products={collectionItems} region={region} />
      <CategoryGrid />
      <NewArrivals products={arrivals} region={region} />
      <Editorial />
      <BestSellers products={sellers} region={region} />
      <PromoBanner />
    </>
  )
}
