'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import { ScrollArea } from '@/components/ui/scroll-area'
import useSidebar from '@/lib/hooks/useSidebar'
import React, { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { sidebarValue } = useSidebar()

    return (
        <div className="min-h-screen h-full flex sm:flex-row flex-col">
            {sidebarValue && <SideBar />}
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2">{children}</main>
                <Footer />
            </div>
        </div>
    )
}
