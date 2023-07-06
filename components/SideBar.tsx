import React from 'react'
import { Separator } from './ui/separator'
import NavLinks, { NavLink } from './NavLinks'
import Link from 'next/link'
import { Button } from './ui/button'

export const navLinks: NavLink[] = [
    {
        title: 'Url Shortener',
        href: '/app/url-shortener',
    },
    {
        title: 'Auto danh gia hutech',
        href: '/auto-danh-gia-hutech',
    },
    {
        title: 'Dashboard',
        href: '/app',
    },
    {
        title: 'Profile',
        href: '/profile',
    },
]

function SideBar({ children }: { children?: React.ReactNode }) {
    return (
        <div className="lg:w-96 md:w-56 w-48 min-w-fit border-r-[0.5px] border-r-black/10 dark:border-r-white/10 flex flex-col space-y-2 p-2 h-full">
            <Button variant={'link'} asChild>
                <Link href={'/'}>
                    <p className="w-full text-center text-2xl font-bold py-4 uppercase">
                        Nyte One
                    </p>
                </Link>
            </Button>

            <Separator />
            <NavLinks navLinks={navLinks} />
            {children}
        </div>
    )
}

export default SideBar
