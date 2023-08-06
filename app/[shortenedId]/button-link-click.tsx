'use client'

import { Button } from '@/components/ui/button'
import React, { PropsWithChildren } from 'react'
import { addClick } from './add-click'

function ButtonLinkClick({ id, children }: PropsWithChildren & { id: string }) {
    return (
        <Button onClick={() => addClick(id)} asChild>
            {children}
        </Button>
    )
}

export default ButtonLinkClick
