import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import Header from '@/components/Header'
import { Providers } from '@/lib/providers'
import DashboardLayout from '@/components/DashboardLayout'

export const metadata = {
    title: 'Nyte One',
    description: 'An aio web tools.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Providers>
            <html lang="en" suppressHydrationWarning>
                <head>
                    <link rel="shortcut icon" href="./favicon.svg" />
                </head>
                <body
                    className={`min-h-screen bg-background font-sans antialiased`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <TooltipProvider>
                            <DashboardLayout>{children}</DashboardLayout>
                        </TooltipProvider>
                    </ThemeProvider>
                </body>
            </html>
        </Providers>
    )
}
