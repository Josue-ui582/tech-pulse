import * as yup from "yup";

export const updatePassword = yup.object({
  newPassword: yup
    .string()
    .min(8, "Le mot de passe doit faire au moins 8 caractères")
    .required("Le nouveau mot de passe est obligatoire"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Les mots de passe doivent correspondre')
    .required('Veuillez confirmer votre nouveau mot de passe'),
});