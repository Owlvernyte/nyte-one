import React, { PropsWithChildren } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type QuickTooltipProps = {
    content: string
}

function QuickTooltip({
    children,
    content,
    ...props
}: PropsWithChildren & QuickTooltipProps) {
    return (
        <Tooltip {...props}>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent>{content}</TooltipContent>
        </Tooltip>
    )
}

export default QuickTooltip
