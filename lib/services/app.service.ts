import { Prisma } from "@prisma/client";
import { prisma } from "../db/prismaClient";

export async function countUser() {
    const result = await prisma.user.count();
    return result;
}
