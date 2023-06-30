
import { ModeToggle } from '@/components/ModeToggle'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <main>
            <Link href={'/dash'}>app</Link>
        </main>
    )
}
