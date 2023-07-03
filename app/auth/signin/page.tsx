import { LoginButton } from '@/components/buttons.component'
import { Button } from '@/components/ui/button'
import { getProviders } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

async function SignIn() {
    const providers = (await getProviders()) ?? []

    return (
        <div>
            <Button asChild>
                <Link href="/">Home</Link>
            </Button>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <LoginButton providerId={provider.id} />
                </div>
            ))}
        </div>
    )
}

export default SignIn
