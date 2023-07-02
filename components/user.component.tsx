'use client'

import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export const User = () => {
    const { data: session } = useSession()

    return (
        <>
            <h1>Client Session</h1>
            <p className="break-all">{JSON.stringify(session)}</p>
            {session?.user?.image && (
                <Avatar>
                    <AvatarImage src={session.user.image} />
                    <AvatarFallback>{session.user.name}</AvatarFallback>
                </Avatar>
            )}
        </>
    )
}
