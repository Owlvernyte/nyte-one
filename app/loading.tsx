import { Loader } from 'lucide-react'
import React from 'react'

function loading() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Loader className="mr-2 h-4 w-4 animate-spin" /> Loading...
        </div>
    )
}

export default loading
