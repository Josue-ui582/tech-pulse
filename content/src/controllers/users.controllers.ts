import { createUsersService, getUsersService } from "../services/users.services.js"
import type { Request, Response } from "express";
import { createUserSchema } from "../schema/users.schema.js";



export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsersService();
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Une erreur interne est survenue lors de la récupération des utilisateurs",
            error: error instanceof Error ? error.message : "Erreur inconnue"
        })
    }
}


export const createUsersController = async (req: Request, res: Response) => {
    const validation = createUserSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            success: false,
            messga: "Donnée de formulaire invalide",
            errors: validation.error.format()
        })
    }

    const { firstName, lastName, email, password } = validation.data;
    try {
        const newUsers = await createUsersService(firstName, lastName, email, password);
        return res.status(201).json({
            success: true,
            data: newUsers
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erreur lors de la création de l'utilisateur",
            error: error instanceof Error ? error.message : "Erreur inconnue"
        })
    }
}