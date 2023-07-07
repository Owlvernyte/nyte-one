import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { appsNavLink } from '@/lib/data/navLinks'
import Link from 'next/link'
import React from 'react'
import AppStats from './app-stats'

function Tools() {
    return (
        <div className="grid gap-4">
            <AppStats />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {appsNavLink.map((v, i) => {
                    return (
                        <div
                            key={`app_${i}_${v}`}
                            className="hover:shadow-lg rounded-lg"
                        >
                            <Link href={v.href}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{v.title}</CardTitle>
                                        <CardDescription>
                                            {v.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Tools
