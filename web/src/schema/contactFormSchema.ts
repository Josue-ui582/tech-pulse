import * as yup from "yup";

export const contactFormSchema = yup.object({
  name: yup
    .string()
    .min(8, "Le nom doit faire au moins 8 caractères")
    .required("Le nom est obligatoire"),
  email: yup
    .string()
    .email("Format d'email invalide")
    .required("L'email est obligatoire"),
  subject: yup
    .string()
    .min(8, "Le sujet doit faire au moins 8 caractères")
    .required("Le sujet est obligatoire"),
  message: yup
    .string()
    .min(10, "Le message doit faire au moins 10 caractères")
    .required("Le message est obligatoire"),
});