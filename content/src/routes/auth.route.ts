import { Router } from "express";
import { loginUserController } from "../controllers/users.controllers.js";

const router = Router();

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Connecter un utilisateur et obtenir un token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "admin@example.com" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 token: { type: string, example: "eyJhbGciOiJIUzI1..." }
 *                 user: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Identifiants incorrects
 */
router.post("/", loginUserController);

export default router;