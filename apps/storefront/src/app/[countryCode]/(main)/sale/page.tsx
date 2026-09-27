import { Metadata } from "next"
import { parseOptionValueIds } from "@lib/util/product-option-filters"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Sale",
  description: "Selected PULSE pieces on sale.",
}

export default async function SalePage(props: {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<Record<string, string | string[] | undefined> & {
    sortBy?: SortOptions
    page?: string
  }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams

  return (
    <StoreTemplate
      sortBy={searchParams.sortBy}
      page={searchParams.page}
      countryCode={params.countryCode}
      optionValueIds={parseOptionValueIds(searchParams)}
      kicker="Sale"
      title="Sale"
      filter="sale"
    />
  )
}
