import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import DashboardLayout from '@/components/DashboardLayout'
import { Metadata } from 'next'
import StoreProvider from '@/lib/StoreProvider'

export const metadata: Metadata = {
    title: 'Nyte One',
    description: 'An aio web tools.',
    viewport: {
        width: 'device-width',
        initialScale: 1,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="shortcut icon" href="./favicon.svg" />
            </head>
            <body
                className={`min-h-screen bg-background font-sans antialiased`}
            >
                <StoreProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <TooltipProvider>
                            <DashboardLayout>{children}</DashboardLayout>
                        </TooltipProvider>
                    </ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    )
}
