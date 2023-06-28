'use client'

import {
    selectSidebarValue,
    sidebarSlice,
    useDispatch,
    useSelector,
} from '@/lib/redux'
import React from 'react'
import { Button } from './ui/button'
import { PanelLeft, PanelLeftClose } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

function SidebarToggleButton() {
    const dispatch = useDispatch()
    const sidebarValue = useSelector(selectSidebarValue)
    return (
        <Tooltip>
            <TooltipTrigger>
                <Button
                    size={'icon'}
                    variant={'ghost'}
                    onClick={() => {
                        dispatch(sidebarSlice.actions.toggle())
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
