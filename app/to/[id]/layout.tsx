import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

function UrlLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col h-full">
            <header className="border-b-[0.5px] border-b-black/10 dark:border-b-white/10 min-h-fit p-2 flex flex-row justify-between items-center">
                <div className="flex flex-row items-center justify-center space-x-2">
                    <Button variant={'link'} asChild>
                        <Link href="/">
                            <h1 className="text-xl font-black py-4 uppercase">
                                Nyte One
                            </h1>
                        </Link>
                    </Button>
                </div>
                <div>
                    <ModeToggle />
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t-[0.5px] border-t-black/10 dark:border-t-white/10 min-h-fit p-2 flex flex-row justify-between items-center">
                <Button variant={'link'} asChild>
                    <Link href="/">From Owlvernyte with love {'<3'}</Link>
                </Button>
                <span>© {new Date().getFullYear()}</span>
            </footer>
        </div>
    )
}

export default UrlLayout
