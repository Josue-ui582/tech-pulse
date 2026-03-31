import 'dotenv/config';
import { createUsersService, getUserByEmail, getUsersService } from "../services/users.services.js"
import type { Request, Response } from "express";
import { createUserSchema } from "../schema/users.schema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET_SECRET as string;

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

export const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                massage: "Email ou mot de passe incorrect"
            })
        }

        const isValidePassword = bcrypt.compare(password, user.password as string);
        if (!isValidePassword) {
            return res.status(401).json({
                success: false,
                message: "Email ou mot de passe incorrect"
            })
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            success: true,
            token: token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erreur lors de la connexion",
            error: error instanceof Error ? error.message : "Erreur inconnue"
        });
    }
}