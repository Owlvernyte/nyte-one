'use client'

import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import useSidebar from '@/lib/hooks/useSidebar'
import React, { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { sidebarValue } = useSidebar()

    return (
        <div className="min-h-screen h-screen max-h-screen flex flex-row">
            {sidebarValue && <SideBar />}
            <div className="h-screen flex-1 flex flex-col">
                <Header />
                <main className="h-full flex-1 p-2 overflow-auto">{children}</main>
            </div>
        </div>
    )
}
