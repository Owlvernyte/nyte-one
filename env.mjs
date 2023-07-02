import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        DISCORD_CLIENT_ID: z.string(),
        DISCORD_CLIENT_SECRET: z.string(),
        NEXTAUTH_URL: z.string(),
        NEXTAUTH_SECRET: z.string(),
        // OPEN_AI_API_KEY: z.string().min(1),
    },
    client: {
        // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
    },
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
        DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        // OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
        // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    },
    // For Next.js >= 13.4.4, you only need to destructure client variables:
    // experimental__runtimeEnv: {
    //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    // }
})
