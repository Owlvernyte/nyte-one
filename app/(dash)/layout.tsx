'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import useSidebar from '@/lib/hooks/useSidebar'
import React, { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { sidebarValue } = useSidebar()

    return (
        <div className="min-h-screen h-full flex flex-col px-2">
            <Header />
            <main className="flex-1 p-2">{children}</main>
            <Footer />
        </div>
    )
}
