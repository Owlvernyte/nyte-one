'use client'

import { Prisma } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { ArrowUpDown, Check, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { X } from 'lucide-react'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ShortenedUrl = {
    id: string
    shortenedId: string
    customId?: string | null
    url: string
    direct: string
    views: number
    clicks: number
}

export const columns: ColumnDef<ShortenedUrl>[] = [
    {
        accessorKey: 'shortenedId',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const shortenedId = row.getValue('shortenedId') as string
            return <Link href={`/to/${shortenedId}`}>{shortenedId}</Link>
        },
    },
    {
        accessorKey: 'customId',
        header: 'Custom ID',
        cell: ({ row }) => {
            const customId = row.getValue('customId') as string
            return <Link href={`/to/${customId}`}>{customId}</Link>
        },
    },
    {
        accessorKey: 'url',
        header: 'URL',
        cell: ({ row }) => {
            const url = row.getValue('url') as string
            return (
                <a href={url} target="_blank">
                    {url}
                </a>
            )
        },
    },
    {
        accessorKey: 'direct',
        header: 'Direct',
        cell: ({ row }) => {
            const direct = row.getValue('direct') as string
            return direct === 'true' ? <Check /> : <X />
        },
    },
    {
        accessorKey: 'clicks',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Clicks
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    payment.shortenedId
                                )
                            }
                        >
                            Copy shortened link
                        </DropdownMenuItem>
                        {payment.customId && (
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        payment.customId as string
                                    )
                                }
                            >
                                Copy custom link
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
