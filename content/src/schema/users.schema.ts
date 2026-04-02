import z, { email, type input } from "zod"

export const createUserSchema = z.object({
    name: z.string().min(5, "Votre nom doit contenir au moins 5 caractères"),
    email: z.string().email("Format d'email invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères")
});

export type CreateUsersInput = z.infer<typeof createUserSchema>;