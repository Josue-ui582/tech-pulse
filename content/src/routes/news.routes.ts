import { Router } from "express";
import { createNewsController, deleteNewController, getNewsController, incrementViewsController, updatedNewsController } from "../controllers/news.controlers.js";
import { upload } from "../middleware/multer.middleware.js";
import { authorize } from "../middleware/auth.middleware.js";
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
router.post("/", upload.single('image'), authorize('admin'), createNewsController);

/**
 * @openapi
 * /api/news/{id}/view:
 *   patch:
 *     summary: Incrémente le compteur de vues d'un article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Compteur mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: Article introuvable
 */
router.patch("/:id/view", incrementViewsController);

/**
 * @openapi
 * /api/news/{id}:
 *   patch:
 *     summary: Met à jour un article de news existant
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unique de l'article (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Nouveau titre de l'article"
 *               description:
 *                 type: string
 *                 example: "Contenu mis à jour de la news..."
 *               category:
 *                 type: string
 *                 enum: [Tech, AI, Dev]
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 example: "https://exemple.com"
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       400:
 *         description: Données de requête invalides
 *       404:
 *         description: Article introuvable (ID inexistant)
 *       500:
 *         description: Erreur serveur interne
 */
router.patch("/:id", updatedNewsController);

/**
 * @openapi
 * /api/news/{id}:
 *   delete:
 *     summary: Supprime définitivement un article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article à supprimer
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       404:
 *         description: Article introuvable
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", deleteNewController);


export default router;