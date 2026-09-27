import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createInventoryLevelsWorkflow } from "@medusajs/medusa/core-flows"

const EXTRA_HANDLES = [
  "mesh-training-tee",
  "muscle-fit-tee",
  "double-layer-shorts",
  "slim-training-joggers",
  "relaxed-training-joggers",
  "run-long-sleeve",
  "loose-training-tank",
  "studio-performance-tee",
  "heather-training-joggers",
  "everyday-training-set-tee",
]

export default async function stockExtras({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "variants.sku"],
  })
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "sku"],
  })
  const { data: locations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "name"],
  })
  const { data: levels } = await query.graph({
    entity: "inventory_level",
    fields: ["id", "inventory_item_id", "location_id"],
  })

  const location = locations[0]
  if (!location) {
    throw new Error("Missing stock location")
  }

  const extras = products.filter((product) =>
    EXTRA_HANDLES.includes(product.handle || "")
  )
  const extraSkus = new Set(
    extras.flatMap((product) =>
      (product.variants || []).map((variant) => variant.sku).filter(Boolean)
    )
  )
  const itemIds = inventoryItems
    .filter((item) => extraSkus.has(item.sku))
    .map((item) => item.id)
  const existing = new Set(
    levels
      .filter((level) => level.location_id === location.id)
      .map((level) => level.inventory_item_id)
  )
  const missing = [...new Set(itemIds)].filter((id) => id && !existing.has(id))

  logger.info(
    `extras=${extras.length} skus=${extraSkus.size} items=${itemIds.length} missingLevels=${missing.length} location=${location.name}`
  )

  if (!missing.length) {
    logger.info("Inventory levels already exist")
    return
  }

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: missing.map((inventory_item_id) => ({
        inventory_item_id,
        location_id: location.id,
        stocked_quantity: 1000000,
      })),
    },
  })

  logger.info(`Stocked ${missing.length} inventory items`)
}
