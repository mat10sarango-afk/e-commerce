import { Heading, Text } from "@modules/common/components/ui"
import { Button } from "@modules/common/components/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="surface-card py-20 px-8 flex flex-col justify-center items-start max-w-2xl"
      data-testid="empty-cart-message"
    >
      <p className="section-kicker mb-4">Cart</p>
      <Heading
        level="h1"
        className="display-title text-5xl"
      >
        Your bag is empty
      </Heading>
      <Text className="text-base mt-4 mb-8 max-w-[32rem] text-neutral-600">
        You don&apos;t have anything in your cart. Let&apos;s change that — start
        browsing the latest performance gear.
      </Text>
      <LocalizedClientLink href="/store">
        <Button size="large">Explore products</Button>
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
