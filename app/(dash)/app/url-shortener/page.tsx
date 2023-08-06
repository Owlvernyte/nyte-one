import { authOptions } from '@/lib/auth'
import { getUserUrls } from '@/lib/services/url-shortener.service'
import { getServerSession } from 'next-auth'
import React from 'react'
import { DataTable } from './data-table'
import { ShortenedUrl, columns } from './columns'
import CreateUrlForm from './create-url-form'
import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'
import Stats from './stats'
import LinkList from './link-list'

export const metadata: Metadata = {
    title: 'Nyte One | URL Shortener',
}

async function UrlShortener() {
    const session = await getServerSession(authOptions)
    const userUrls = await getUserUrls(session?.user.id!)
    const convertedData = await userUrls.map((v) => {
        const direct = `${v.direct}`
        return {
            ...v,
            direct,
        } satisfies ShortenedUrl
    })

    if (!session?.user.id) return 'Unauthorized'

    return (
        <div className="flex flex-col space-y-4 max-w-screen">
            <div>
                <Stats userId={session.user.id} />
            </div>
            <div>
                <CreateUrlForm userId={session.user.id} />
            </div>
            <div className="hidden sm:flex">
                <Separator />
            </div>
            <div className="hidden md:block w-full">
                <DataTable columns={columns} data={convertedData} />
            </div>
            <div className="block md:hidden w-full">
                <LinkList data={convertedData} />
            </div>
        </div>
    )
}

export default UrlShortener
