import React from 'react'
import { ModeToggle } from './ModeToggle'
import SidebarToggleButton from './SidebarButton'
import NavBar from './NavBar'
import { Button } from './ui/button'
import Link from 'next/link'
import UserNav from './UserNav'

function Header() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl border-y-[0.5px] border-y-black/10 dark:border-y-white/10 min-h-fit p-2 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-center space-x-2">
                <Button className="w-fit h-fit p-2" variant={'link'} asChild>
                    <Link href={'/'}>
                        <p className="text-2xl font-bold uppercase">
                            Nyte One
                        </p>
                    </Link>
                </Button>
                <NavBar />
            </div>
            <div className="ml-auto flex items-center space-x-4">
                <ModeToggle />
                <UserNav/>
            </div>
        </header>
    )
}

export default Header
