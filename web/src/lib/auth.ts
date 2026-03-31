import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "../generated";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy : "jwt"},
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [Google, GitHub],
});