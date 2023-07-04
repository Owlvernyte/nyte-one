'use server'

import { shortenUrl } from '@/lib/services/url-shortener.service'
import { FormSchema } from './create-url-form'
import { toast } from '@/components/ui/use-toast'
import * as z from 'zod'

export async function shortening(data: z.infer<typeof FormSchema>) {
    const result = await shortenUrl(data)

    console.log(result)

    toast({
        title: 'Created',
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                    {JSON.stringify(result, null, 2)}
                </code>
            </pre>
        ),
    })
}
