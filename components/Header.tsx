import React from 'react'
import { ModeToggle } from './ModeToggle'

function Header() {
    return (
        <header className="border-b-[0.5px] border-b-white/30 min-h-fit px-4 py-2 flex flex-row justify-between items-center">
            <div className="container flex flex-row justify-between items-center">
                <div>Logo</div>
                <div>
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header
