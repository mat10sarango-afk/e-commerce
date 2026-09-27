import { ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
} from "@medusajs/medusa/core-flows"

const vtex = (id: number) =>
  `https://hmecuador.vtexassets.com/arquivos/ids/${id}-1200-1600`

const NEW_PRODUCTS = [
  {
    title: "Mesh Training Tee",
    handle: "mesh-training-tee",
    category: "Shirts",
    isNew: true,
    onSale: false,
    amount: 39,
    images: [vtex(4498740), vtex(4498736)],
  },
  {
    title: "Muscle Fit Tee",
    handle: "muscle-fit-tee",
    category: "Shirts",
    isNew: true,
    onSale: false,
    amount: 35,
    images: [vtex(3893372), vtex(3893368)],
  },
  {
    title: "Double Layer Shorts",
    handle: "double-layer-shorts",
    category: "Shorts",
    isNew: true,
    onSale: true,
    originalPrice: 49,
    amount: 32,
    images: [vtex(4463950), vtex(4463945)],
  },
  {
    title: "Slim Training Joggers",
    handle: "slim-training-joggers",
    category: "Pants",
    isNew: false,
    onSale: true,
    originalPrice: 59.99,
    amount: 39.99,
    images: [vtex(3939847), vtex(3939844)],
  },
  {
    title: "Relaxed Training Joggers",
    handle: "relaxed-training-joggers",
    category: "Pants",
    isNew: false,
    onSale: true,
    originalPrice: 55,
    amount: 36,
    images: [vtex(4394293), vtex(4394289)],
  },
  {
    title: "Run Long Sleeve",
    handle: "run-long-sleeve",
    category: "Jackets",
    isNew: true,
    onSale: false,
    amount: 45,
    images: [vtex(4478456), vtex(4478457)],
  },
  {
    title: "Loose Training Tank",
    handle: "loose-training-tank",
    category: "Shirts",
    isNew: true,
    onSale: false,
    amount: 29,
    images: [vtex(4263636), vtex(4263631)],
  },
  {
    title: "Studio Performance Tee",
    handle: "studio-performance-tee",
    category: "Shirts",
    isNew: true,
    onSale: true,
    originalPrice: 42,
    amount: 28,
    images: [vtex(4327420), vtex(4327416)],
  },
  {
    title: "Heather Training Joggers",
    handle: "heather-training-joggers",
    category: "Pants",
    isNew: false,
    onSale: true,
    originalPrice: 52,
    amount: 34,
    images: [vtex(4039117), vtex(4039114)],
  },
  {
    title: "Everyday Training Set Tee",
    handle: "everyday-training-set-tee",
    category: "Sets",
    isNew: true,
    onSale: false,
    amount: 38,
    images: [vtex(4498741), vtex(4498746)],
  },
  {
    title: "Studio Training Cap",
    handle: "studio-training-cap",
    category: "Accessories",
    isNew: true,
    onSale: false,
    amount: 18,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "Daily Training Bottle",
    handle: "daily-training-bottle",
    category: "Accessories",
    isNew: false,
    onSale: true,
    originalPrice: 22,
    amount: 14,
    images: [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
    ],
  },
]

export default async function expandCatalog({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const productModule = container.resolve("product")

  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "metadata"],
  })
  const { data: existingCategories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle"],
  })
  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })

  const defaultSalesChannel = salesChannels[0]
  const shippingProfile = shippingProfiles[0]
  if (!defaultSalesChannel || !shippingProfile) {
    throw new Error("Missing sales channel or shipping profile")
  }

  const neededCategories = ["Shorts", "Jackets", "Sets", "Accessories"]
  const missingCategories = neededCategories.filter(
    (name) => !existingCategories.some((category) => category.name === name)
  )
  if (missingCategories.length) {
    await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: missingCategories.map((name) => ({
          name,
          is_active: true,
        })),
      },
    })
  }

  const { data: categories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle"],
  })
  const categoryByName = Object.fromEntries(
    categories.map((category) => [category.name, category.id])
  )

  const originals: Record<string, Record<string, unknown>> = {
    "t-shirt": { isNew: false, onSale: false },
    sweatshirt: { isNew: false, onSale: true, originalPrice: 25 },
    sweatpants: { isNew: false, onSale: false },
    shorts: { isNew: true, onSale: false },
  }

  for (const product of existingProducts) {
    const flags = originals[product.handle || ""]
    if (!flags) continue
    await productModule.updateProducts(product.id, {
      metadata: {
        ...(product.metadata || {}),
        ...flags,
      },
    })
  }

  const missingProducts = NEW_PRODUCTS.filter(
    (item) => !existingProducts.some((product) => product.handle === item.handle)
  )

  if (!missingProducts.length) {
    logger.info("Catalog extras already exist")
    return
  }

  await createProductsWorkflow(container).run({
    input: {
      products: missingProducts.map((item) => ({
        title: item.title,
        handle: item.handle,
        description:
          "Ropa deportiva diseñada para entrenar, moverte y superar cada sesión.",
        status: ProductStatus.PUBLISHED,
        weight: 400,
        shipping_profile_id: shippingProfile.id,
        category_ids: categoryByName[item.category]
          ? [categoryByName[item.category]]
          : [],
        images: item.images.map((url) => ({ url })),
        metadata: {
          isNew: item.isNew,
          onSale: item.onSale,
          originalPrice: item.originalPrice ?? null,
        },
        options: [{ title: "Size", values: ["S", "M", "L", "XL"] }],
        variants: ["S", "M", "L", "XL"].map((size) => ({
          title: size,
          sku: `${item.handle}-${size}`.toUpperCase(),
          options: { Size: size },
          prices: [
            { amount: item.amount, currency_code: "eur" },
            { amount: item.amount, currency_code: "usd" },
          ],
        })),
        sales_channels: [{ id: defaultSalesChannel.id }],
      })),
    },
  })

  logger.info(`Created ${missingProducts.length} extra catalog products`)

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "sku"],
  })
  const { data: locations } = await query.graph({
    entity: "stock_location",
    fields: ["id"],
  })
  const { data: levels } = await query.graph({
    entity: "inventory_level",
    fields: ["inventory_item_id", "location_id"],
  })
  const location = locations[0]
  const extraSkus = new Set(
    NEW_PRODUCTS.flatMap((item) =>
      ["S", "M", "L", "XL"].map((size) => `${item.handle}-${size}`.toUpperCase())
    )
  )
  const existingLevels = new Set(
    levels
      .filter((level) => level.location_id === location?.id)
      .map((level) => level.inventory_item_id)
  )
  const missingLevels = inventoryItems
    .filter((item) => extraSkus.has(item.sku) && !existingLevels.has(item.id))
    .map((item) => item.id)

  if (location && missingLevels.length) {
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: missingLevels.map((inventory_item_id) => ({
          inventory_item_id,
          location_id: location.id,
          stocked_quantity: 1000000,
        })),
      },
    })
    logger.info(`Stocked ${missingLevels.length} extra inventory items`)
  }
}
