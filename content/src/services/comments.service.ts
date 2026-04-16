import { prisma } from "../lib/pisma.js"


export const addCommentService = async (newId: string, comment: string, userId: string) => {
    return await prisma.comments.create({
        data: {
            content: comment,
            newsId: newId,
            authorId: userId
        }
    })
}

export const updateCommentService = async (commentId: string, newContent: string, userId: string) => {
    const comment = await prisma.comments.findUnique({
        where: {
            id: commentId
        }
    });

    if (!comment) {
        throw new Error("Commentaire introuvable")
    }

    if (comment.authorId !== userId) {
        throw new Error("Non autorisé, vous ne pouvez pas mettre ce commentaire à jour")
    }
    return await prisma.comments.update({
        where: { 
            id: commentId
        },
        data: {
            content: newContent
        }
    })
}

export const deleteCommentService = async (commentId: string, userId: string) => {
    const comment = await prisma.comments.findUnique({
        where: {
            id: commentId
        }
    });

    if (!comment) {
        throw new Error("Commentaire introuvable")
    }

    if (comment?.authorId !== userId) {
        throw new Error("Non autorisé, vous ne pouvez pas supprimer ce commentaire");
    }
    return await prisma.comments.delete({
        where: { 
            id: commentId,
            authorId: userId
         }
    })
}

export const getCommentsByNewsService = async (newsId: string) => {
    return await prisma.comments.findMany({
        where: { newsId: newsId },
        orderBy: { createdAt: 'desc' },
        include: {
            author: {
                select: {
                    name: true
                }
        }   }
    });
};