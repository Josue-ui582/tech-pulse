"use client"

import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Card, Upload } from 'antd';
import { CreateNewsForms } from '@/src/services/api';
import { UploadOutlined } from '@ant-design/icons';

interface CreateNewsFormProps {
  onSuccess?: () => void;
  fetchNews?: () => void
}

const CreateNewsForm = ({ onSuccess, fetchNews } : CreateNewsFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    setError(null);

    try {
      const fileItem = values.imageUrl?.[0]; 
      const fileToUpload = fileItem?.originFileObj;

      if (!fileToUpload) {
        throw new Error("Fichier image introuvable. Veuillez réessayer.");
      }

      await CreateNewsForms(
        values.title,
        values.description,
        values.category,
        fileToUpload
      );

      message.success("Article publié avec succès !");
      form.resetFields();
      if (onSuccess) onSuccess();
      if (fetchNews) fetchNews();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-transparent p-2">
        <h2 className="text-2xl font-black text-slate-900 mb-6 text-center italic uppercase tracking-tight">
          Nouvelle Publication
        </h2>

        {error && (
          <div className="p-4 mb-6 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium animate-shake">
            ⚠️ {error}
          </div>
        )}
        
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={onFinish} 
          initialValues={{ category: 'Tech' }}
          requiredMark={false}
        >
          <Form.Item 
            name="title" 
            label={<span className="font-bold text-gray-700">Titre de l'article</span>}
            rules={[{ required: true, message: 'Le titre est obligatoire' }]}
          >
            <Input size="large" placeholder="Ex: L'IA transforme le dev..." className="rounded-xl h-12" />
          </Form.Item>

          <Form.Item 
            name="category" 
            label={<span className="font-bold text-gray-700">Catégorie</span>}
          >
            <Select size="large" className="rounded-xl h-12">
              <Select.Option value="Tech">Tech</Select.Option>
              <Select.Option value="AI">AI</Select.Option>
              <Select.Option value="Dev">Dev</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item 
            name="imageUrl" 
            label={<span className="font-bold text-gray-700">Image de couverture</span>}
            valuePropName="fileList" 
            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            rules={[{ required: true, message: "L'image est requise" }]}
          >
            <Upload 
              maxCount={1} 
              beforeUpload={() => false}
              listType="picture"
              className="w-full"
            >
              <Button icon={<UploadOutlined />} className="w-full h-14 rounded-xl border-dashed border-2 hover:border-blue-500">
                Cliquez pour choisir un fichier
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item 
            name="description" 
            label={<span className="font-bold text-gray-700">Contenu</span>}
            rules={[{ required: true, message: 'Le contenu ne peut pas être vide' }]}
          >
            <Input.TextArea rows={5} placeholder="Rédigez l'essentiel ici..." className="rounded-xl p-4" />
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            loading={loading}
            className="h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-lg shadow-xl shadow-blue-100 mt-4"
          >
            PUBLIER L'ARTICLE
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateNewsForm;