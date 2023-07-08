'use server'

import {
    shortenUrl,
    updateUrlByShortenedId,
} from '@/lib/services/url-shortener.service'
import { FormSchema } from './create-url-form'
import * as z from 'zod'

export async function shortening(data: z.infer<typeof FormSchema>) {
    const result = await shortenUrl(data)
    return result
}

export async function toggleDirect(id: string, value: boolean) {
    const result = await updateUrlByShortenedId(id, { direct: !value })
    return result
}
