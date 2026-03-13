import { Router } from "express";
const router = Router();
import { getNewsController } from "../controllers/news.controlers.js";

/**
 * @openapi
 * /api/news:
 *   get:
 *     summary: Récupère la liste des news
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Tech, AI, Dev]
 *         description: Filtrer par catégorie
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   title: { type: string }
 *                   category: { type: string }
 *                   viewsCount: { type: integer }
 */
export default router.get("/", getNewsController);