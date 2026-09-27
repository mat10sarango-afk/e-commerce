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
        Tu carrito está vacío
      </Heading>
      <Text className="text-base mt-4 mb-8 max-w-[32rem] text-[#707070]">
        Aún no hay productos. Empieza por la nueva colección y arma tu sesión.
      </Text>
      <LocalizedClientLink href="/store">
        <Button size="large">Explore products</Button>
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
