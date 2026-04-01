import { prisma } from "../lib/pisma.js";
import bcrypt from "bcrypt"


export const getUsersService = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    });
}

export const createUsersService = async (name: string, email: string,  password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    })
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email }
    })
}