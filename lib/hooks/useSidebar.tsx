'use client';

import { useStore } from "../store"

const useSidebar = () => {
    return useStore((store) => ({
        sidebarValue: store.sidebar,
        toggle: store.toggleSidebar,
    }))
}

export default useSidebar;
