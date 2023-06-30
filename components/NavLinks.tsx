'use client'

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type NavLink = {
    href: string
    title: string
}

function NavLinks({ navLinks }: { navLinks: NavLink[] }) {
    const pathname = usePathname()

    return (
        <ul>
            {navLinks.map((v, i) => {
                const isCurrent =  v.href === '/' + pathname.split('/').slice(1).pop()
                return (
                    <li key={v.href + '_' + i}>
                        <Button
                            variant={
                                isCurrent
                                    ? 'secondary'
                                    : 'ghost'
                            }
                            size={'sm'}
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href={v.href}>{v.title}</Link>
                        </Button>
                    </li>
                )
            })}
        </ul>
    )
}

export default NavLinks
