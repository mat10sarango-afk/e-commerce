import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { OptionValueIds } from "@lib/util/product-option-filters"
import {
  CatalogFilter,
  filterCatalogProducts,
  matchCategoryProduct,
} from "@lib/util/catalog-filters"
import { CATEGORY_LANDING } from "@lib/media/catalog"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 24

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  optionValueIds,
  filter = "all",
  group,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  optionValueIds?: OptionValueIds
  filter?: CatalogFilter
  group?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 50,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products },
  } = await listProductsWithSort({
    page: 1,
    queryParams,
    sortBy,
    countryCode,
    optionValueIds,
  })

  const tile = CATEGORY_LANDING.find((item) => item.key === group)
  const grouped = tile
    ? products.filter((product) => matchCategoryProduct(product, tile.key))
    : products
  const filtered = filterCatalogProducts(grouped, filter)
  const count = filtered.length
  const pageParam = (page - 1) * PRODUCT_LIMIT
  const paged = filtered.slice(pageParam, pageParam + PRODUCT_LIMIT)
  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-10 small:gap-x-6"
        data-testid="products-list"
      >
        {paged.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
