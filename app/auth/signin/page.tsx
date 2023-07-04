import { Button } from '@/components/ui/button'
import { getProviders } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { LoginButton } from './auth-buttons'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

async function SignIn() {
    const providers = (await getProviders()) ?? []

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    Sign In to{' '}
                    <Button className='w-fit p-0' variant={'link'} asChild>
                        <Link href="/"><span className="text-2xl">Nyte One</span></Link>
                    </Button>
                </CardTitle>
                <CardDescription>
                    Sign in to access our full features
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-2">
                    <LoginButton provider={'discord'} />
                    {Object.values(providers).map((provider) => (
                        <LoginButton
                            provider={provider.id}
                            key={provider.name}
                        />
                    ))}
                </div>
            </CardContent>
            {/* <CardFooter>
                <Button asChild>
                    <Link href="/">Back to home</Link>
                </Button>
            </CardFooter> */}
        </Card>
    )
}

export default SignIn
