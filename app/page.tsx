import { ModeToggle } from '@/components/ModeToggle'
import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
} from '@/components/buttons.component'
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
        <main >
            <Link href={'/dash'}>app</Link>

            <div >
                <LoginButton />
                <RegisterButton />
                <LogoutButton />
                <ProfileButton />

                <h1>Server Session</h1>
                <pre>{JSON.stringify(session)}</pre>

                <User />
            </div>
        </main>
    )
}
