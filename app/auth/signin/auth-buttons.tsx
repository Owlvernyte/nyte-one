'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { BuiltInProviderType } from 'next-auth/providers'
import { LiteralUnion, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export const LoginButton = ({
    provider,
    ...props
}: {
    provider?: LiteralUnion<BuiltInProviderType>
} & ButtonProps) => {
    return (
        <Button onClick={() => signIn(provider)} {...props}>
            Sign in{provider && ` with ${provider}`}
        </Button>
    )
}

export const RegisterButton = () => {
    return (
        <Button asChild>
            <Link href="/register">Register</Link>
        </Button>
    )
}

export const LogoutButton = () => {
    return <Button onClick={() => signOut()}>Sign Out</Button>
}
