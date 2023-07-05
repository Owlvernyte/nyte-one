import { getUrlByQuery, incClickUrlById } from '@/lib/services/url-shortener.service'
import { Metadata as NextMetadata } from 'next'
import React from 'react'

import ogs from 'open-graph-scraper'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'
import { Separator } from '@/components/ui/separator'
import ButtonLinkClick from './button-link-click'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
    params,
}: Props): Promise<NextMetadata> {
    try {
        // read route params
        const id = params.id

        const shortenedUrl = await getUrlByQuery(id)

        if (!shortenedUrl)
            return getDefaultMetadata({
                title: 'Nyte One | This URL is not exist.',
            })

        // fetch url's metadata
        const urlMetadata = await getUrlMetadata(shortenedUrl.url)

        if (shortenedUrl.direct) {
            return {
                title: `${
                    urlMetadata.dcTitle ||
                    urlMetadata.ogTitle ||
                    urlMetadata.twitterTitle ||
                    'Nyte One | Unknown URL'
                }`,
                description: urlMetadata.dcDescription,
                openGraph: {
                    images: urlMetadata.ogImage || [],
                    title: urlMetadata.ogTitle,
                    description: urlMetadata.ogDescription,
                    url: urlMetadata.ogUrl,
                    siteName: urlMetadata.ogSiteName,
                },
                twitter: {
                    images: urlMetadata.twitterImage || [],
                    title: urlMetadata.twitterTitle,
                    description: urlMetadata.twitterDescription,
                    card: 'summary_large_image',
                },
            }
        }

        return getDefaultMetadata({
            title: `Nyte One | ${
                urlMetadata.dcTitle ||
                urlMetadata.ogTitle ||
                urlMetadata.twitterTitle ||
                'Unknown URL'
            }`,
            description: 'Handy url shortener tool by Owlvernyte!',
        })
    } catch (error: any) {
        console.error(error)
        return getDefaultMetadata()
    }
}

async function ToUrl({ params, searchParams }: Props) {
    const shortenedUrl = await getUrlByQuery(params.id)

    if (!shortenedUrl) return 'Not Found'

    // const counted = await incClickUrlById(shortenedUrl.id)

    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col space-y-2 w-96">
                <Button variant={'link'} asChild>
                    <Link href={'/'}>
                        <h1 className="text-4xl font-black py-4 uppercase">
                            Nyte One
                        </h1>
                    </Link>
                </Button>
                <Separator />
                <ButtonLinkClick id={shortenedUrl.id}>
                    <Link href={shortenedUrl.url}>Press here to continue</Link>
                </ButtonLinkClick>
                <Button variant={'secondary'} asChild>
                    <Link href={'/app/url-shortener'}>Shorten a new URL</Link>
                </Button>
                <Separator />
                <div>
                    <h3>Additional URL Information</h3>
                    <ul className="list-none hover:list-disc">
                        <li>ID: {shortenedUrl.shortenedId}</li>
                        <li>Custom ID: {shortenedUrl.customId || 'None'}</li>
                        <li>Clicks: {shortenedUrl.clicks}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ToUrl

async function getUrlMetadata(url: string) {
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

function getDefaultMetadata(props?: NextMetadata): NextMetadata {
    return {
        title: 'Nyte One - Aio Tools Dashboard',
        description: 'Create one on Nyte One | URL Shortener!',
        openGraph: {
            url: 'https://nyte.tk',
            title: 'Nyte One - Aio Tools Dashboard',
            description: 'Create one on Nyte One | URL Shortener!',
            siteName: 'Nyte One',
        },
        twitter: {
            title: 'Nyte One - Aio Tools Dashboard',
            description: 'Create one on Nyte One | URL Shortener!',
            card: 'summary_large_image',
        },
        ...props,
    }
}
