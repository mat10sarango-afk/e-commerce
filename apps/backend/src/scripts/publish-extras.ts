import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

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
  "studio-training-cap",
  "daily-training-bottle",
]

export default async function publishExtras({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const remoteLink = container.resolve(ContainerRegistrationKeys.LINK)

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "status", "sales_channels.id", "sales_channels.name"],
  })
  const { data: apiKeys } = await query.graph({
    entity: "api_key",
    fields: ["id", "type", "title"],
  })
  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })

  logger.info(
    `products=${products.length} extras=${products.filter((p) => EXTRA_HANDLES.includes(p.handle || "")).length} channels=${salesChannels.map((c) => c.name).join(",")}`
  )

  const extras = products.filter((product) => EXTRA_HANDLES.includes(product.handle || ""))
  const links = extras.flatMap((product) =>
    salesChannels.map((channel) => ({
      [Modules.PRODUCT]: { product_id: product.id },
      [Modules.SALES_CHANNEL]: { sales_channel_id: channel.id },
    }))
  )

  if (links.length) {
    await remoteLink.create(links)
    logger.info(`Linked ${extras.length} products to ${salesChannels.length} sales channels`)
  }

  logger.info(`apiKeys=${apiKeys.map((k) => `${k.type}:${k.title}`).join(",")}`)
}
