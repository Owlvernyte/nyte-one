'use client'

import React from 'react'
import { Button } from './ui/button'
import { PanelLeft, PanelLeftClose } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import useSidebar from '@/lib/hooks/useSidebar'

function SidebarToggleButton() {
    const { sidebarValue, toggle } = useSidebar()

    return (
        <Tooltip>
            <TooltipTrigger>
                <Button
                    size={'icon'}
                    variant={'ghost'}
                    onClick={() => {
                        toggle()
                    }}
                >
                    {sidebarValue ? <PanelLeftClose /> : <PanelLeft />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{sidebarValue ? 'Close sidebar' : 'Open sidebar'}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default SidebarToggleButton
