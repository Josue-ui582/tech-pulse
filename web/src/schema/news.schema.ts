import * as yup from 'yup';

export const NEWS_CATEGORIES = ["Tech", "AI", "Dev"] as const;

export const newsSchema = yup.object({
  title: yup
    .string()
    .required('Le titre est requis')
    .min(15, 'Le titre trop court'),
  description: yup
    .string()
    .required('La description est requise')
    .min(100, "La description est trop courte"),
  imageUrl: yup
    .mixed()
    .required("Veuillez sélectionner une image"),
  category: yup
    .string()
    .oneOf([...NEWS_CATEGORIES], 'Catégorie invalide')
    .required('Sélectionnez une catégorie'),
});
