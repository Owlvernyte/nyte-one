import React from 'react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import Link from 'next/link'

export type NavLink = {
    href: string
    title: string
}

export const navLinks: NavLink[] = [
    {
        title: 'Url Shortener',
        href: '/url-shortener',
    },
    {
        title: 'Auto danh gia hutech',
        href: '/auto-danh-gia-hutech',
    },
    {
        title: 'Url Shortener',
        href: '/url-shortener',
    },
    {
        title: 'Url Shortener',
        href: '/url-shortener',
    },
]

function SideBar({ children }: { children?: React.ReactNode }) {
    return (
        <div className="lg:w-96 md:w-56 w-48 border-r-[0.5px] border-r-black/10 dark:border-r-white/10 flex flex-col space-y-2 p-2">
            <p className="w-full text-center text-2xl font-bold py-4 uppercase">Nyte One</p>
            <Separator />
            <NavLinks navLinks={navLinks} />
            {children}
        </div>
    )
}

export default SideBar

const NavLinks = ({ navLinks }: { navLinks: NavLink[] }) => {
    return (
        <ul>
            {navLinks.map((v, i) => {
                return (
                    <li key={v.href + '_' + i}>
                        <Button variant={'ghost'} size={"sm"} className="w-full justify-start" asChild>
                            <Link href={v.href}>{v.title}</Link>
                        </Button>
                    </li>
                )
            })}
        </ul>
    )
}
