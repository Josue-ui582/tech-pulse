import { Router } from "express";
const router = Router();
import { getNewsController } from "../controllers/news.controlers.js";

/**
 * @openapi
 * /api/news:
 *   get:
 *     summary: Récupère la liste des news
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
 *                   description: { type: string }
 *                   category: { type: string, enum: [Tech, AI, Dev] }
 *                   imageUrl: { 
 *                     type: string, 
 *                     example: "/uploads/17154321-news.jpg",
 *                     description: "URL relative de l'image stockée sur le serveur"
 *                   }
 *                   viewsCount: { type: integer }
 *                   publishedAt: { type: string, format: date-time }
 */

export default router.get("/", getNewsController);