"use client"

import React, { useRef, useState } from 'react';
import { Form, Input, Button, Select, message, Card } from 'antd';
import { Category } from '@/src/types/news';
import { newsSchema } from '@/src/schema/news.schema';
import { CreateNewsForms } from '@/src/services/api';
import * as yup from "yup";

const CreateNewsForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    setError(null);

    try {
      await newsSchema.validate(values);

      await CreateNewsForms(
        values.title, 
        values.description || "", 
        values.category as Category
      );

      message.success("Article publié avec succès !");
      form.resetFields();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue lors de la création.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card className="shadow-2xl rounded-3xl border-none bg-white/80 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Créer un nouvel article</h2>

        {error && (
          <div className="p-3 mb-6 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold">
            ⚠️ {error}
          </div>
        )}
        
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={onFinish} 
          initialValues={{ category: 'Tech' }}
        >
          <Form.Item name="title" label="Titre">
            <Input size="large" placeholder="Ex: L'ascension de l'IA générative" className="rounded-xl" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="category" label="Catégorie">
              <Select size="large" className="rounded-xl">
                <Select.Option value="Tech">Tech</Select.Option>
                <Select.Option value="IA">IA</Select.Option>
                <Select.Option value="Dev">Dev</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="imageUrl" label="URL de l'image">
            <Input type="file" size="large" className="rounded-xl" />
          </Form.Item>

          <Form.Item name="description" label="Contenu de l'article">
            <Input.TextArea rows={6} placeholder="Rédigez ici..." className="rounded-xl" />
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            size="large" 
            loading={loading}
            className="h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-lg shadow-lg"
          >
            Publier maintenant
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default CreateNewsForm;