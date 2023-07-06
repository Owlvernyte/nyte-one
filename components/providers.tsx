'use client'
import StoreProvider from '@/lib/StoreProvider'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import React, { PropsWithChildren } from 'react'
import { TooltipProvider } from './ui/tooltip'
import { Toaster } from '@/components/ui/toaster'

function Providers({ children, ...props }: PropsWithChildren) {
    return (
        <>
            <Toaster />
            <SessionProvider>
                <StoreProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <TooltipProvider>{children}</TooltipProvider>
                    </ThemeProvider>
                </StoreProvider>
            </SessionProvider>
        </>
    )
}

export default Providers
