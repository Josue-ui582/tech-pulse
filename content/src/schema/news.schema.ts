import { z } from 'zod';
import { Category } from '../generated/client.js';

export const CreateNewsSchema = z.object({
  title: z.string().min(15, "Le titre doit faire au moins 15 caractères"),
  description: z.string().min(100, "La description est trop courte, elle doit faire 100 caractères"),
  category: z.nativeEnum(Category, {
    error: () => ({ message: "Catégorie invalide (Tech, AI ou Dev attendu)" }),
  }),
  imageUrl: z.string().optional().nullable(),
});

export type CreateNewsInput = z.infer<typeof CreateNewsSchema>;