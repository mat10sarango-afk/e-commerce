import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function useUsd({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const regionModule = container.resolve(Modules.REGION)
  const storeModule = container.resolve(Modules.STORE)
  const pricingModule = container.resolve(Modules.PRICING)
  const cartModule = container.resolve(Modules.CART)

  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "currency_code"],
  })
  const { data: stores } = await query.graph({
    entity: "store",
    fields: ["id", "supported_currencies.currency_code", "supported_currencies.is_default"],
  })
  const { data: variants } = await query.graph({
    entity: "variant",
    fields: [
      "id",
      "price_set.id",
      "price_set.prices.id",
      "price_set.prices.amount",
      "price_set.prices.currency_code",
    ],
  })
  const { data: carts } = await query.graph({
    entity: "cart",
    fields: ["id", "currency_code"],
  })

  for (const region of regions) {
    if (region.currency_code === "usd") continue
    await regionModule.updateRegions(region.id, { currency_code: "usd" })
    logger.info(`Region ${region.name} -> usd`)
  }

  const store = stores[0]
  if (store) {
    await storeModule.updateStores(store.id, {
      supported_currencies: [
        { currency_code: "usd", is_default: true },
        { currency_code: "eur", is_default: false },
      ],
    })
    logger.info(`Store default currency -> usd`)
  }

  let updatedPrices = 0
  for (const variant of variants) {
    const prices = variant.price_set?.prices || []
    const eur = prices.find((price) => price.currency_code === "eur")
    const usd = prices.find((price) => price.currency_code === "usd")
    if (!usd || !eur || usd.amount === eur.amount) continue
    await pricingModule.updatePriceSets(variant.price_set.id, {
      prices: prices.map((price) =>
        price.currency_code === "usd"
          ? { id: price.id, amount: eur.amount, currency_code: "usd" }
          : { id: price.id, amount: price.amount, currency_code: price.currency_code }
      ),
    })
    updatedPrices += 1
  }
  logger.info(`Aligned ${updatedPrices} USD prices with current amounts`)

  const staleCarts = carts.filter((cart) => cart.currency_code !== "usd")
  for (const cart of staleCarts) {
    await cartModule.updateCarts(cart.id, { currency_code: "usd" })
  }
  logger.info(`Updated ${staleCarts.length} carts to usd`)
}
