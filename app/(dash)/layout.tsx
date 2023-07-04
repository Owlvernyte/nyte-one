'use client'

import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import useSidebar from '@/lib/hooks/useSidebar'
import React, { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { sidebarValue } = useSidebar()

    return (
        <div className="h-screen flex flex-row w-full">
            {sidebarValue && <SideBar />}
            <div className="h-full flex flex-col w-full">
                <Header />
                <main className="flex-1 p-2 overflow-y-scroll overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}
