'use client'

import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export const NextAuthProvider = ({ children, ...props }: PropsWithChildren) => {
    return <SessionProvider {...props}>{children}</SessionProvider>
}
