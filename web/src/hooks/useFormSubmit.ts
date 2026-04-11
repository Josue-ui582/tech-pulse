import { useState, useCallback } from 'react';
import { FormInstance } from 'antd';
import { message } from 'antd';

interface FormSubmitOptions<T> {
  schema?: any;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  resetOnSuccess?: boolean;
}

/**
 * Hook personnalisé pour gérer la soumission de formulaires avec validation
 * @param form - Instance du formulaire Ant Design
 * @param submitFunction - Fonction de soumission asynchrone
 * @param options - Options de configuration
 * @returns État et fonction de soumission { loading, error, handleSubmit }
 */
export function useFormSubmit<T = any>(
  form: FormInstance,
  submitFunction: (values: T) => Promise<void>,
  options: FormSubmitOptions<T> = {}
) {
  const {
    schema,
    onSuccess,
    onError,
    successMessage = 'Opération réussie !',
    resetOnSuccess = false,
  } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (values: T) => {
    setLoading(true);
    setError(null);

    try {
      // Validation avec schéma si fourni
      let cleanedValues = values;
      if (schema) {
        cleanedValues = await schema.validate(values, { abortEarly: false }).catch((err: any) => {
          if (err.inner) {
            const errorFields = err.inner.map((error: any) => ({
              name: error.path,
              errors: [error.message],
            }));
            form.setFields(errorFields);
          }
          throw new Error('Veuillez corriger les erreurs dans le formulaire.');
        });
      }

      // Soumission
      await submitFunction(cleanedValues);

      // Succès
      message.success(successMessage);
      if (resetOnSuccess) {
        form.resetFields();
      }
      onSuccess?.(cleanedValues);

    } catch (err: any) {
      const errorMessage = err.message || 'Une erreur est survenue';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [form, submitFunction, schema, onSuccess, onError, successMessage, resetOnSuccess]);

  return {
    loading,
    error,
    handleSubmit,
  };
}