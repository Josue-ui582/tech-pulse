import z, { email, type input } from "zod"

export const createUserSchema = z.object({
    firstName: z.string().min(3, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(3, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Format d'email invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères")
});

export type CreateUsersInput = z.infer<typeof createUserSchema>;