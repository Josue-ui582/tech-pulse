import 'dotenv/config';
import { createUsersService, getUserByEmail, getUserById, getUsersService, updateUserPasswordService, updateUserService } from "../services/users.services.js"
import type { Request, Response } from "express";
import { createUserSchema } from "../schema/users.schema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { email } from 'zod';

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

    const { name, email, password } = validation.data;
    try {
        const newUsers = await createUsersService(name, email, password);
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

        const isValidePassword = await bcrypt.compare(password, user.password as string);
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

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erreur lors de la connexion",
            error: error instanceof Error ? error.message : "Erreur inconnue"
        });
    }
}

export const meController = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Non authentifié"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };

        const user = await getUserById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio
            }
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token invalide ou expiré"
        });
    }
};

export const logoutController = (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: new Date(0)
    });

    return res.status(200).json({
        success: true,
        message: "Déconnexion réussie"
    });
}

export const updateUserController = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Non authentifié"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
        const userId = decoded.id;

        const { name, email, bio } = req.body;
        const file = req.file;
        let profileImage: string | null = null;

        if (file) {
            profileImage = file.path;
        }

        const updatedUser = await updateUserService(userId, name, email, profileImage, bio);

        return res.status(200).json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:    "Erreur lors de la mise à jour du profil",
            error: error instanceof Error ? error.message : "Erreur inconnue"
        });
    }
}

export const updateUserPasswordController = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Non authentifié"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
        const userId = decoded.id;

        const { newPassword } = req.body;

        await updateUserPasswordService(userId, newPassword);

        return res.status(200).json({
            success: true,
            message: "Mot de passe mis à jour avec succès"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erreur lors de la mise à jour du mot de passe",
            error: error instanceof Error ? error.message : "Erreur inconnue"
        });
    }
}