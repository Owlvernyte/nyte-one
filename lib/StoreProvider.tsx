'use client';

import React, { PropsWithChildren, useRef } from 'react'
import { Provider, StoreType, initializeStore } from './store'

function StoreProvider({ children, ...props }: PropsWithChildren) {
    const storeRef = useRef<StoreType>()

    if (!storeRef.current) {
        storeRef.current = initializeStore(props)
    }

    return <Provider value={storeRef.current}>{children}</Provider>
}

export default StoreProvider
