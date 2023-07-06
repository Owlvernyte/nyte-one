import { authOptions } from '@/lib/auth'
import { getUserUrls } from '@/lib/services/url-shortener.service'
import { getServerSession } from 'next-auth'
import React from 'react'
import { DataTable } from './data-table'
import { ShortenedUrl, columns } from './columns'
import CreateUrlForm from './create-url-form'
import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'

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
        <div>
            <CreateUrlForm userId={session.user.id} />
            <Separator className='mt-4' />
            <DataTable columns={columns} data={convertedData} />
        </div>
    )
}

export default UrlShortener
