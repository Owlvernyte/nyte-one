'use client'

import { ProfileButton } from '@/components/buttons.component'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function Home() {
    return (
        <div className="min-h-screen h-full flex flex-col">
            <Header />
            <div className="flex-1 p-2 flex flex-col justify-center items-center">
                <Button asChild>
                    <Link href={'/app'}>Getting started</Link>
                </Button>
            </div>
            <Footer />
        </div>
    )
}
