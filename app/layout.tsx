import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Metadata } from 'next'
import StoreProvider from '@/lib/StoreProvider'
import { NextAuthProvider } from '@/components/NextAuthProvider'
import { Toaster } from '@/components/ui/toaster'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
    title: 'Nyte One',
    description: 'An aio web tools.',
    viewport: {
        width: 'device-width',
        initialScale: 1,
    },
}

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="shortcut icon" href="./favicon.svg" />
            </head>
            <body
                className={`h-screen bg-background font-sans antialiased overflow-hidden`}
            >
                <NextAuthProvider>
                    <StoreProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                        >
                            <TooltipProvider>{children}</TooltipProvider>
                        </ThemeProvider>
                    </StoreProvider>
                </NextAuthProvider>
                <Toaster />
            </body>
        </html>
    )
}
