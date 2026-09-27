import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import fs from "node:fs"
import path from "node:path"

export default async function writePublishableKey({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  const { data } = await query.graph({
    entity: "api_key",
    fields: ["token", "type", "deleted_at"],
    filters: {
      type: "publishable",
    },
  })

  const token = data.find((key: { token?: string; deleted_at?: string | null }) => key.token && !key.deleted_at)?.token

  if (!token) {
    throw new Error("No publishable API key found")
  }

  const envPath = path.resolve(process.cwd(), "..", "storefront", ".env.local")
  let env = fs.readFileSync(envPath, "utf8")
  env = env.replace(
    /^NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=.*$/m,
    `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${token}`
  )
  fs.writeFileSync(envPath, env)
  logger.info("Wrote publishable API key to storefront .env.local")
}
