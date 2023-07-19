import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname

    // if (path === "/") {
    //     return NextResponse.next();
    // }

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    if (!session && (path.includes('/app') || path.includes('/profile'))) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
    } else if (session && path.includes('/auth')) {
        return NextResponse.redirect(new URL('/app', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
