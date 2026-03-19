import prisma from "../lib/pisma.js"



export const getUsersService = async () => {
    return await prisma.users.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true
        }
    });
}