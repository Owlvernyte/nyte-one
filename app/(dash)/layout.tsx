import DashboardLayout from '@/components/DashboardLayout'
import React, { PropsWithChildren } from 'react'

function DashLayout({ children }: PropsWithChildren) {
    return <DashboardLayout>{children}</DashboardLayout>
}

export default DashLayout
