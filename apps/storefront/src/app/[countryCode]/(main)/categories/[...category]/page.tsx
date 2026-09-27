import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { CATEGORY_LANDING } from "@lib/media/catalog"
import { resolveCategoryGroup } from "@lib/util/catalog-filters"
import { HttpTypes, StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { parseOptionValueIds } from "@lib/util/product-option-filters"
import StoreTemplate from "@modules/store/templates"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<
    Record<string, string | string[] | undefined> & {
      sortBy?: SortOptions
      page?: string
      optionValueIds?: string | string[]
    }
  >
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  const categoryHandles = [
    ...CATEGORY_LANDING.map((tile) => tile.key),
    ...(product_categories || []).map(
      (category: HttpTypes.StoreProductCategory) => category.handle
    ),
  ]

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: string) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const group = resolveCategoryGroup(params.category[0])
  const tile = CATEGORY_LANDING.find((item) => item.key === group)

  if (tile) {
    return {
      title: `${tile.label} | PULSE`,
      description: `Shop ${tile.label}.`,
    }
  }

  try {
    const productCategory = await getCategoryByHandle(params.category)

    if (!productCategory) {
      notFound()
    }

    const title = `${productCategory.name} | PULSE`
    const description = productCategory.description ?? `${title} category.`

    return {
      title,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
      },
    }
  } catch {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams
  const optionValueIds = parseOptionValueIds(searchParams)
  const group = resolveCategoryGroup(params.category[0])
  const tile = CATEGORY_LANDING.find((item) => item.key === group)

  if (tile) {
    return (
      <StoreTemplate
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
        optionValueIds={optionValueIds}
        kicker="Categories"
        title={tile.label}
        group={tile.key}
      />
    )
  }

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
    />
  )
}
