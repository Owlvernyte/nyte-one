export type NavLink = {
    title: string
    href: string
    description?: string
}

export const navLinks: NavLink[] = [
    // {
    //     title: 'Dashboard',
    //     href: '/app',
    // },
]

export const appsNavLink: NavLink[] = [
    {
        title: 'URL Shortener',
        href: '/app/url-shortener',
        description: 'A modern url shortener.',
    },
    {
        title: 'QR Maker',
        href: '/app/qr-maker',
        description: 'Make your own beautiful QR Code.',
    },
]
