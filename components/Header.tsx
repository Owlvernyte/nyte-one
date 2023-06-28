import React from 'react'
import { ModeToggle } from './ModeToggle'
import SidebarToggleButton from './SidebarButton'

function Header() {
    return (
        <header className="border-b-[0.5px] border-b-black/10 dark:border-b-white/10 min-h-fit p-2 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-center space-x-2">
                <SidebarToggleButton />
                <div>Logo</div>
            </div>
            <div>
                <ModeToggle />
            </div>
        </header>
    )
}

export default Header
