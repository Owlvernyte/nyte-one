import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="border-t-[0.5px] border-t-black/10 dark:border-t-white/10 min-h-fit p-2 flex flex-row justify-between items-center">
            <Button variant={'link'} asChild>
                <Link href="/">From Owlvernyte with love {'<3'}</Link>
            </Button>
            <span>© {new Date().getFullYear()}</span>
        </footer>
    )
}
