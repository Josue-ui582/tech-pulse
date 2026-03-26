import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "../generated";

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy : "jwt"},
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [],
});