import { ModeToggle } from '@/components/ModeToggle'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Image from 'next/image'

export default function Home() {
    return (
        <main>
            <Tooltip>
                <TooltipTrigger>
                    <ModeToggle />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add to library</p>
                </TooltipContent>
            </Tooltip>
        </main>
    )
}
