import { getUrlByQuery } from '@/lib/services/url-shortener.service'
import { Metadata } from 'next'
import React from 'react'
import ogs from 'open-graph-scraper'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // read route params
    const id = params.id

    const shortenedUrl = await getUrlByQuery(id)

    if (!shortenedUrl)
        return {
            title: 'Nyte One | This Url does not exist',
            description: 'Create one on Nyte One | URL Shortener!',
        }

    // fetch url's metadata
    const urlMetadata = await getUrlMetadata(shortenedUrl.url)

    if (shortenedUrl.direct) {
        return {
            title: urlMetadata.dcTitle,
            description: urlMetadata.dcDescription,
            openGraph: {
                images: urlMetadata.ogImage || [],
                title: urlMetadata.ogTitle,
                description: urlMetadata.ogDescription,
                url: urlMetadata.ogUrl,
                siteName: urlMetadata.ogSiteName,
                // type: urlMetadata.ogType as
                //     | 'website'
                //     | 'article'
                //     | 'book'
                //     | 'profile'
                //     | 'music.song'
                //     | 'music.album'
                //     | 'music.playlist'
                //     | 'music.radio_station'
                //     | 'video.movie'
                //     | 'video.episode'
                //     | 'video.tv_show'
                //     | 'video.other'
                //     | undefined,
            },
            twitter: {
                images: urlMetadata.twitterImage || [],
                title: urlMetadata.twitterTitle,
                description: urlMetadata.twitterDescription,
                card: urlMetadata.twitterCard as
                    | 'summary'
                    | 'summary_large_image'
                    | 'player'
                    | 'app'
                    | undefined,
                site: urlMetadata.twitterSite,
                siteId: urlMetadata.twitterSiteId,
            },
        }
    }

    return {
        title: `Nyte One | ${urlMetadata.dcTitle}`,
        description: 'Handy url shortener tool by Owlvernyte!',
    }
}

async function ToUrl({ params, searchParams }: Props) {
    const shortenedUrl = await getUrlByQuery(params.id)
    return (
        <div>
            {params.id} {shortenedUrl?.url}
        </div>
    )
}

export default ToUrl

async function getUrlMetadata(url: string) {
    const userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'

    const fetched = await fetch(url)
    const parsedHtml = await fetched.text()

    const data = await ogs({
        html: parsedHtml,
        url: fetched.url,
    })

    const { error, html, result, response } = data

    if (error) {
        console.error(data)
        throw new Error('[UTIL/metadataGetter] There is an error occurred')
    }

    return result
}
