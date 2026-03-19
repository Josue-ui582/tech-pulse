
import { Router } from "express";
import { getUsers } from "../controllers/users.controllers.js";
const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         firstName:
 *           type: string
 *           example: "Jean"
 *         lastName:
 *           type: string
 *           example: "Dupont"
 *         email:
 *           type: string
 *           format: email
 *           example: "jean.dupont@example.com"
 *         role:
 *           type: string
 *           example: "admin"
 *         # Le mot de passe est généralement exclu des schémas de réponse pour la sécurité
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Erreur serveur interne
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Une erreur interne est survenue"
 *                 error:
 *                   type: string
 */
router.get("/", getUsers);


export default router;