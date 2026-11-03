import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import { prisma } from "./prisma"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({

  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [
    GitHub
  ],

})
