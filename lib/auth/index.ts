import { type Adapter } from 'next-auth/adapters';
import prisma from '@/lib/db/prismaClient';
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord"
// import { env } from "@/env.mjs"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: "jwt",
    },
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string
        })
    ],
};
