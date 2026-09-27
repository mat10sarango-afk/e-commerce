import { Metadata } from "next"
import { parseOptionValueIds } from "@lib/util/product-option-filters"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "New arrivals",
  description: "New PULSE training pieces.",
}

export default async function NewPage(props: {
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
      kicker="New"
      title="New arrivals"
      filter="new"
    />
  )
}
