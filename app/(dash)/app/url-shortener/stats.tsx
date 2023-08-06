import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    countClicks,
    countUrls,
    countUserClicks,
    countUserUrls,
} from '@/lib/services/url-shortener.service'
import React from 'react'

async function Stats({ userId }: { userId: string }) {
    const userTotal = await countUserUrls(userId)
    const total = await countUrls()
    const userClicks = await countUserClicks(userId)
    const clicks = await countClicks()

    return (
        <div className="grid gap-1 md:gap-4 grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs md:text-sm font-medium">
                        Total Shortened URLs
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-2 w-2 md:h-4 md:w-4 text-muted-foreground"
                    >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-md md:text-2xl font-bold">
                        {total ?? 'Unknown'}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs md:text-sm font-medium">
                        Your URLs
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-2 w-2 md:h-4 md:w-4 text-muted-foreground"
                    >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-md md:text-2xl font-bold">
                        {userTotal ?? 'Unknown'}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs md:text-sm font-medium">
                        Total URL Clicks
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-2 w-2 md:h-4 md:w-4 text-muted-foreground"
                    >
                        <path d="m9 9 5 12 1.774-5.226L21 14 9 9z" />
                        <path d="m16.071 16.071 4.243 4.243" />
                        <path d="m7.188 2.239.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656-2.12 2.122" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-md md:text-2xl font-bold">
                        {clicks ?? 'Unknown'}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs md:text-sm font-medium">
                        Your URL Clicks
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-2 w-2 md:h-4 md:w-4 text-muted-foreground"
                    >
                        <path d="m9 9 5 12 1.774-5.226L21 14 9 9z" />
                        <path d="m16.071 16.071 4.243 4.243" />
                        <path d="m7.188 2.239.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656-2.12 2.122" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-md md:text-2xl font-bold">
                        {userClicks ?? 'Unknown'}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Stats
