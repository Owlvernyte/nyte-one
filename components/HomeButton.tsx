import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function HomeButton() {
    return (
        <Button className="w-fit h-fit p-0 m-0" variant={'link'} asChild>
            <Link href={'/'}>
                <p className="text-2xl font-bold uppercase">Nyte One</p>
            </Link>
        </Button>
    )
}

export default HomeButton
