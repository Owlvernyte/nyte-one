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
        <nav className="lg:w-80 md:w-72 sm:w-64 w-full min-w-fit sm:border-r-[0.5px] sm:border-r-black/10 sm:dark:border-r-white/10 flex flex-col space-y-2 p-2">
            <div className="flex flex-col items-center sm:items-start w-full">
                <Button className="w-fit" variant={'link'} asChild>
                    <Link href={'/'}>
                        <p className="text-2xl font-bold py-4 uppercase">
                            Nyte One
                        </p>
                    </Link>
                </Button>
            </div>

            <Separator />
            <div className="flex flex-col space-y-2 overflow-auto">
                <NavLinks navLinks={navLinks} />
                {children}
            </div>
        </nav>
    )
}

export default SideBar
