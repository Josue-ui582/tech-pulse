import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface TokenPayload {
    id: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET_SECRET as string;

export const authorize = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Accès refusé, Token manquant"
            })
        }

        const token = authHeader.split(' ')[1] as string;

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
            if (decoded.role !== requiredRole) {
                return res.status(403).json({ 
                    message: `Accès interdit. Rôle ${requiredRole} requis.` 
                });
            }

            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({ message: "Token invalide ou expiré." });
        }
    }
}