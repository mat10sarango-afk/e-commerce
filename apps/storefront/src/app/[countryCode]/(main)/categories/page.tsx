import { Metadata } from "next"
import CategoryLanding from "@modules/categories/templates/landing"

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse PULSE by category.",
}

export default async function CategoriesIndexPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  return <CategoryLanding countryCode={countryCode} />
}
