import { prisma } from "../lib/pisma.js"


export const addCommentService = async (newId: string, comment: string) => {
    return await prisma.comments.create({
        data: {
            content: comment,
            newsId: newId
        }
    })
}