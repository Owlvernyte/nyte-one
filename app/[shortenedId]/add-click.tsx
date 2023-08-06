'use server'

import { incClickUrlById } from '@/lib/services/url-shortener.service'

export async function addClick(id: string, clicks: number = 1) {
    const result = await incClickUrlById(id, clicks)

    return result
}
