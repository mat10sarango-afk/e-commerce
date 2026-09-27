import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import { CatalogFilter } from "@lib/util/catalog-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
  title = "All products",
  kicker = "Shop",
  filter = "all",
  group,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
  title?: string
  kicker?: string
  filter?: CatalogFilter
  group?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-8 small:py-12 content-container gap-8"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} showCategoryFilters={filter === "all"} />
      <div className="w-full">
        <div className="mb-10">
          <p className="section-kicker mb-3">{kicker}</p>
          <h1 className="display-title text-4xl small:text-6xl" data-testid="store-page-title">
            {title}
          </h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            optionValueIds={optionValueIds}
            filter={filter}
            group={group}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
