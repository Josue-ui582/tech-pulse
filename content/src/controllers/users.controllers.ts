import { getUsersService } from "../services/users.services.js"
import type { Request, Response } from "express";



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