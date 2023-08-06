import React from 'react'
import { ShortenedUrl } from './columns'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { TypoLead } from '@/components/typography'
import { Separator } from '@/components/ui/separator'

export default function LinkList({ data }: { data: ShortenedUrl[] }) {
    return (
        <ScrollArea className="h-64 rounded-md border p-2">
            <TypoLead>Your Shortened URLs</TypoLead>
            {data.map((url) => (
                <>
                    <div key={`link_list_${url.id}`}>
                        <Button className="px-0" variant={'link'} asChild>
                            <Link
                                target="_blank"
                                href={`/${url.customId || url.shortenedId}`}
                            >
                                {`(${url.clicks} clicks)`}{' '}
                                {url.customId || url.shortenedId}
                            </Link>
                        </Button>
                    </div>
                    <Separator className='my-2'/>
                </>
            ))}
        </ScrollArea>
    )
}
