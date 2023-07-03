import { authOptions } from '@/lib/auth'
import { getUserUrls } from '@/lib/services/url-shortener.service'
import { getServerSession } from 'next-auth'
import React from 'react'

async function UrlShortener() {
    const session = await getServerSession(authOptions)
    const userUrls = await getUserUrls(session?.user.id!)

    return (
        <div>
            <div>create a shortened url</div>
            <div>
                {userUrls.map((v, i) => (
                    <div key={v.id}>
                        <p>Id: {v.shortenedId}</p>
                        <p>Url: {v.url}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UrlShortener
