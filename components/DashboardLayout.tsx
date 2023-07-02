'use client'

import React from 'react'
import Header from './Header'
import SideBar from './SideBar'
import useSidebar from '@/lib/hooks/useSidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { sidebarValue } = useSidebar()

    return (
        <div className="h-screen flex flex-row w-full">
            {sidebarValue && <SideBar />}
            <div className="h-full flex flex-col w-full overflow-y-scroll overflow-x-hidden">
                <Header />
                <main className="flex-1 p-2">{children}</main>
            </div>
        </div>
    )
}
