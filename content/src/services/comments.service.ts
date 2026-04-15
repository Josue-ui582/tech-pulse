import { prisma } from "../lib/pisma.js"


export const addCommentService = async (newId: string, comment: string) => {
    return await prisma.comments.create({
        data: {
            content: comment,
            newsId: newId
        }
    })
}

export const updateCommentService = async (commentId: string, newContent: string) => {
    return await prisma.comments.update({
        where: { 
            id: commentId 
        },
        data: {
            content: newContent
        }
    })
}