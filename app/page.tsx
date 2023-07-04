import { ProfileButton } from '@/components/buttons.component'
import { User } from '@/components/user.component'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import {
    LoginButton,
    LogoutButton,
    RegisterButton,
} from './auth/signin/auth-buttons'
import { Button } from '@/components/ui/button'

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div>
            <Button asChild>
                <Link href={'/app'}>app</Link>
            </Button>

            <div>
                {/* <Button asChild>
                    <Link href={'/auth/signin'}>Signin</Link>
                </Button> */}
                <LoginButton />
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
