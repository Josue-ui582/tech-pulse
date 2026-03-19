import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Format d'email invalide")
    .required("L'email est obligatoire"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit faire au moins 8 caractères")
    .required("Le mot de passe est obligatoire"),
});

export const registerSchema = loginSchema.shape({
  firstName: yup
    .string()
    .min(2, "Prénom trop court")
    .required("Prénom obligatoire"),
  lastName: yup
    .string()
    .min(2, "Nom trop court")
    .required("Nom obligatoire"),
});