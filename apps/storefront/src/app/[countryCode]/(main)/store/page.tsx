import { Metadata } from "next"

import { CATEGORY_LANDING } from "@lib/media/catalog"
import { parseOptionValueIds } from "@lib/util/product-option-filters"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type StorePageSearchParams = Record<string, string | string[] | undefined> & {
  sortBy?: SortOptions
  page?: string
  optionValueIds?: string | string[]
}

type Params = {
  searchParams: Promise<StorePageSearchParams>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page, group } = searchParams
  const optionValueIds = parseOptionValueIds(searchParams)
  const groupKey = Array.isArray(group) ? group[0] : group
  const tile = CATEGORY_LANDING.find((item) => item.key === groupKey)

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
      kicker="Shop"
      title={tile ? tile.label : "Todos los productos"}
      group={groupKey}
    />
  )
}
