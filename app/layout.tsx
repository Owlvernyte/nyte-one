import './globals.css'
import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import Providers from '@/components/providers'

export const metadata: Metadata = {
    title: 'Nyte One',
    description: 'An aio web tools.',
    viewport: {
        width: 'device-width',
        initialScale: 1,
    },
    icons: [{ rel: "icon", url: "/favicon.svg" }]
}

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="shortcut icon" href="/favicon.svg" />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
