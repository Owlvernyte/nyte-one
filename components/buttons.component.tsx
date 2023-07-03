'use client'

import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from './ui/button'

export const LoginButton = ({ providerId }: { providerId: string }) => {
    return <Button onClick={() => signIn(providerId)}>Sign in with {providerId}</Button>
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

export const ProfileButton = () => {
    return (
        <Button asChild>
            <Link href="/profile">Profile</Link>
        </Button>
    )
}
