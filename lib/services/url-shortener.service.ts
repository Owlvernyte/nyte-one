import { Prisma } from "@prisma/client";
import prisma from "../db/prismaClient";
import { nanoid } from 'nanoid'

const URLS = prisma.shortenedUrl

export async function getUserUrls(userId: string) {
    const result = await URLS.findMany({
        where: {
            userId
        }
    })

    return result;
}

export async function getUrlById(id: string) {
    const result = await URLS.findUnique({
        where: {
            id
        }
    })

    return result;
}

export async function getUrlByQuery(query: string) {
    const result = await URLS.findFirst({
        where: {
            OR: [
                {
                    id: query
                },
                {
                    customId: query
                },
                {
                    shortenedId: query
                }
            ]
        }
    })

    return result;
}

export type CreateShortenedUrlInput = {
    url: string,
    userId: string,
    customId?: string,
    direct?: boolean
}

export async function shortenUrl({ url, userId, direct = true, customId }: CreateShortenedUrlInput) {
    const checkedUrl = new URL(url)

    if (!checkedUrl) throw new Error("[URL Service/create] url validate failed");

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
    })

    if (!user) throw new Error("[URL Service/create] missing user");

    const shortenedId = nanoid(10)

    let checkedCustomId: string | null = null;

    if (!!customId) {
        if (!new RegExp(/^([A-Za-z0-9_-]){6,}$/gs).test(customId))
            throw new Error("[URL Service/create] invalid custom id ");

        checkedCustomId = customId
    }

    let shortenedUrl: Prisma.ShortenedUrlCreateInput = {
        user: {
            connect: {
                id: userId
            }
        },
        shortenedId,
        customId: checkedCustomId,
        url: checkedUrl.toString(),
        direct
    }

    const createUrl = await URLS.create({
        data: shortenedUrl
    })

    return createUrl
}

export async function deleteUrlById(id: string) {
    const result = await URLS.delete({
        where: {
            id
        }
    })

    return result
}

export async function updateUrlById(id: string, data: Prisma.ShortenedUrlUpdateInput) {
    const result = await URLS.update({
        where: {
            id
        },
        data: data
    })

    return result
}

export async function incViewUrlById(id: string, count: number = 1) {
    const result = await URLS.update({
        where: {
            id
        },
        data: {
            views: {
                increment: count
            }
        }
    })

    return result
}

export async function incClickUrlById(id: string, count: number = 1) {
    const result = await URLS.update({
        where: {
            id
        },
        data: {
            clicks: {
                increment: count
            }
        }
    })

    return result
}
