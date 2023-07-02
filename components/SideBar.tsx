import React from 'react'
import { Separator } from './ui/separator'
import NavLinks, { NavLink } from './NavLinks'

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
        title: 'Dashboard',
        href: '/dash',
    },
    {
        title: 'Profile',
        href: '/profile',
    },
]

function SideBar({ children }: { children?: React.ReactNode }) {
    return (
        <div className="lg:w-96 md:w-56 w-48 min-w-fit border-r-[0.5px] border-r-black/10 dark:border-r-white/10 flex flex-col space-y-2 p-2">
            <p className="w-full text-center text-2xl font-bold py-4 uppercase">
                Nyte One
            </p>
            <Separator />
            <NavLinks navLinks={navLinks} />
            {children}
        </div>
    )
}

export default SideBar
