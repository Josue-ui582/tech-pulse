import { prisma } from "../lib/pisma.js"


export const toggleReactionService = async (newsId: string, userId: string, type: "Like" | "Unlike") => {
    const existingReaction = await prisma.reaction.findUnique({
        where: {
            userId_newsId: { userId, newsId }
        }
    });

    if (existingReaction && existingReaction.type === type) {
        return await prisma.reaction.delete({
            where: {
                id: existingReaction.id
            }
        })
    };

    return await prisma.reaction.upsert({
        where: { userId_newsId: { userId, newsId } },
        update: { type },
        create: { newsId, userId, type }
    });
}