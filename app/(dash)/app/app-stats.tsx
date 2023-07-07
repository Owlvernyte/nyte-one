import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { countUser } from '@/lib/services/app.service'
import React from 'react'

async function AppStats() {
    const appUsers = await countUser()
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Users
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {appUsers ?? 'Unknown'}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AppStats
