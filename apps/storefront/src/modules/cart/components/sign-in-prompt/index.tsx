import { Button, Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="flex flex-col small:flex-row items-start small:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
      <div>
        <Heading level="h2" className="text-xl">
          Already have an account?
        </Heading>
        <Text className="text-sm text-neutral-500 mt-2">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
