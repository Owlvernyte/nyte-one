'use server'

import { shortenUrl } from '@/lib/services/url-shortener.service'
import { FormSchema } from './create-url-form'
import * as z from 'zod'

export async function shortening(data: z.infer<typeof FormSchema>) {
    const result = await shortenUrl(data)

    return result
}
