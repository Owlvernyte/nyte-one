import { Button } from '@/components/ui/button'
import { getProviders } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { LoginButton } from '../auth-buttons'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

async function SignIn({ params, searchParams }: Props) {

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
                </div>
            </CardContent>
        </Card>
    )
}

export default SignIn
