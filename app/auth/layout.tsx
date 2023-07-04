import React, { PropsWithChildren } from 'react'

function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className={'h-screen flex items-center justify-center'}>
            {children}
        </div>
    )
}

export default AuthLayout
