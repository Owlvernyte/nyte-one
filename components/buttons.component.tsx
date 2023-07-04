'use client'

import Link from 'next/link'
import { Button } from './ui/button'

export const ProfileButton = () => {
    return (
        <Button asChild>
            <Link href="/profile">Profile</Link>
        </Button>
    )
}
