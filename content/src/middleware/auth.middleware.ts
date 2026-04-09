import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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

const extractToken = (req: Request): string | null => {
    if (req.cookies?.token) {
        return req.cookies.token;
    }

    return null;
};

export const authorize = (requiredRole?: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = extractToken(req);

        if (!token) {
            return res.status(401).json({
                message: "Accès refusé, Token manquant",
            });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

            req.user = decoded;

            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({
                    message: `Accès interdit. Rôle ${requiredRole} requis.`,
                });
            }

            next();
        } catch (error) {
            return res.status(401).json({
                message: "Token invalide ou expiré.",
            });
        }
    };
};