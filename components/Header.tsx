import React from 'react'
import { ModeToggle } from './ModeToggle'
import SidebarToggleButton from './SidebarButton'
import NavBar from './NavBar'
import { Button } from './ui/button'
import Link from 'next/link'
import UserNav from './UserNav'
import HomeButton from './HomeButton'
import MobileNav from './MobileNav'

function Header() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl border-y-[0.5px] border-y-black/10 dark:border-y-white/10 min-h-fit py-2 px-4 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-center space-x-2">
                <MobileNav/>
                <HomeButton />
                <NavBar />
            </div>
            <div className="ml-auto flex items-center space-x-4">
                <ModeToggle />
                <UserNav />
            </div>
        </header>
    )
}

export default Header
