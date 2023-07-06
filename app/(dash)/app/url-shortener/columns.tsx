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
import QuickTooltip from '@/components/QuickTooltip'
import { QRCanvas } from 'qrcanvas-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ShortenedUrl = {
    id: string
    shortenedId: string
    customId?: string | null
    url: string
    direct: string
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
            return (
                <Button className="px-0" variant={'link'} asChild>
                    <Link target="_blank" href={`/to/${shortenedId}`}>
                        {shortenedId}
                    </Link>
                </Button>
            )
        },
    },
    {
        accessorKey: 'customId',
        header: 'Custom ID',
        cell: ({ row }) => {
            const customId = row.getValue('customId') as string
            return (
                customId && (
                    <Button className="px-0" variant={'link'} asChild>
                        <Link target="_blank" href={`/to/${customId}`}>
                            {customId}
                        </Link>
                    </Button>
                )
            )
        },
    },
    {
        accessorKey: 'url',
        header: 'URL',
        cell: ({ row }) => {
            const url = row.getValue('url') as string
            return (
                <Button className="px-0" variant={'link'} asChild>
                    <Link href={url} target="_blank">
                        {url}
                    </Link>
                </Button>
            )
        },
    },
    {
        accessorKey: 'direct',
        header: () => {
            return (
                <div className="text-center items-center justify-center font-medium">
                    Direct
                </div>
            )
        },
        cell: ({ row }) => {
            const direct = row.getValue('direct') as string
            return (
                <div className="flex text-center items-center justify-center font-medium">
                    <QuickTooltip
                        content={`Direct redirect ${
                            direct === 'true' ? 'enabled' : 'disabled'
                        }`}
                    >
                        {direct === 'true' ? <Check /> : <X />}
                    </QuickTooltip>
                </div>
            )
        },
    },
    {
        accessorKey: 'clicks',
        header: ({ column }) => {
            return (
                <div className="text-center text-medium">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Clicks
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-center text-medium">
                    {row.getValue('clicks')}
                </div>
            )
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <Dialog>
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
                            <DialogTrigger asChild>
                                <DropdownMenuItem>QR Code</DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader className={'p-4'}>
                            <QRCanvas
                                options={{
                                    cellSize: 16,
                                    padding: 16,
                                    data: `https://nyte.tk/to/${
                                        row.getValue('customId') ||
                                        row.getValue('shortenedId') ||
                                        ''
                                    }`,
                                }}
                            />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )
        },
    },
]
