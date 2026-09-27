import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-neutral-100 relative small:min-h-screen">
      <div className="h-16 bg-neutral-950 text-white">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-xs uppercase tracking-[0.16em] flex items-center gap-x-2 flex-1 basis-0 hover:text-neutral-300 transition-colors"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden">Back</span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="font-display text-2xl font-extrabold tracking-[0.22em] uppercase"
            data-testid="store-link"
          >
            Pulse
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="py-6 w-full flex items-center justify-center text-neutral-500">
        <MedusaCTA />
      </div>
    </div>
  )
}
