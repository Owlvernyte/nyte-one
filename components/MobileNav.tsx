import React, { PropsWithChildren } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'
import HomeButton from './HomeButton'
import { PanelRightClose } from 'lucide-react'
import Link from 'next/link'
import { appsNavLink, navLinks } from '@/lib/data/navLinks'

function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger className="flex sm:hidden" asChild>
                <Button variant="outline" size="icon">
                    <PanelRightClose />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>
                        <HomeButton />
                    </SheetTitle>
                    {/* <SheetDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </SheetDescription> */}
                </SheetHeader>

                <div className="grid gap-4 py-4">
                    <div className="flex flex-col space-y-2">
                        <Heading>Apps</Heading>
                        {appsNavLink.map((v, i) => {
                            return (
                                <Button key={v + '_' + i} variant={"ghost"} className={"justify-start"} asChild>
                                    <Link href={v.href}>{v.title}</Link>
                                </Button>
                            )
                        })}
                        <Heading>Others</Heading>
                        {navLinks.map((v, i) => {
                            return (
                                <Button key={v + '_' + i} variant={"ghost"} className={"justify-start"} asChild>
                                    <Link href={v.href}>{v.title}</Link>
                                </Button>
                            )
                        })}
                    </div>
                </div>
                {/* <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav

function Heading({ children }: PropsWithChildren) {
    return (
        <span className="text-xl font-bold underline underline-offset-8 decoration-2">
            {children}
        </span>
    )
}
