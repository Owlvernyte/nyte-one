import { ModeToggle } from '@/components/ModeToggle'
import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
} from '@/components/buttons.component'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { User } from '@/components/user.component'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Home() {
    const session = await getServerSession(authOptions)
    console.log(session)

    return (
        <div>
            <Link href={'/dash'}>app</Link>

            <div>
                <Button asChild>
                    <Link href={'/auth/signin'}>Signin</Link>
                </Button>
                <RegisterButton />
                <LogoutButton />
                <ProfileButton />

                <h1>Server Session</h1>
                <p className="break-all">{JSON.stringify(session)}</p>

                <User />
            </div>
        </div>
    )
}
