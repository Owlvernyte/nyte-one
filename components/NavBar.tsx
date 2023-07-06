import React from 'react'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { Button } from './ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import { cn } from '@/lib/utils'

export type NavLink = {
    href: string
    title: string
}

export const navLinks: NavLink[] = [
    {
        title: 'Dashboard',
        href: '/app',
    },
    {
        title: 'Profile',
        href: '/profile',
    },
]

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Waiting Page',
        href: '/app',
        description: 'Waiting for you to pick an app.',
    },
    {
        title: 'URL Shortener',
        href: '/app/url-shortener',
        description: 'A modern url shortener.',
    },
]

function NavBar({ children }: { children?: React.ReactNode }) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Apps</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavLinks navLinks={navLinks} />
                {children}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavBar

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem'

function NavLinks({ navLinks }: { navLinks: NavLink[] }) {
    return (
        <>
            {navLinks.map((v, i) => {
                return (
                    <NavigationMenuItem key={v.href + '_' + i}>
                        <Link href={v.href} legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                {v.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                )
            })}
        </>
    )
}
