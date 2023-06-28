'use client'

import React from 'react'
import Header from './Header'
import SideBar from './SideBar'
import { selectSidebarValue, useSelector } from '@/lib/redux'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const sidebarValue = useSelector(selectSidebarValue)
    return (
        <div className="h-screen flex flex-row w-full">
            {sidebarValue && <SideBar />}
            <div className="h-full flex flex-col w-full">
                <Header />
                <main className="flex-1 p-2">{children}</main>
            </div>
        </div>
    )
}
