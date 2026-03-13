import { Router } from "express";
import { createNewsController, getNewsController } from "../controllers/news.controlers.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

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

router.get("/", getNewsController);

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: string
 *       enum: [Tech, AI, Dev]
 *     News:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         title:
 *           type: string
 *           example: "L'essor de l'IA en 2024"
 *         description:
 *           type: string
 *           example: "Analyse des nouveaux modèles de langage."
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         imageUrl:
 *           type: string
 *           nullable: true
 *           example: "uploads/17154321_mon_image.png"
 *         viewsCount:
 *           type: integer
 *           example: 150
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-03-20T14:30:00Z"
 */

/**
 * @openapi
 * /api/news:
 *   get:
 *     summary: Liste des articles avec ou sans filtrage
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           $ref: '#/components/schemas/Category'
 *         description: Filtrer les articles par catégorie (optionnel)
 *     responses:
 *       200:
 *         description: Liste des articles récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       500:
 *         description: Erreur serveur
 *
 *   post:
 *     summary: Créer un nouvel article (Multipart/Form-Data)
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 $ref: '#/components/schemas/Category'
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Fichier image (jpg, jpeg, png)
 *     responses:
 *       201:
 *         description: Article créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       400:
 *         description: Données invalides ou format de fichier incorrect
 */
router.post("/", upload.single('image'), createNewsController);

export default router;