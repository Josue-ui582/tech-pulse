"use client"

import { useState } from 'react';
import { Form, Input, Button, Select, message, Card, Upload } from 'antd';
import { CreateNewsForms } from '@/services/api.news';
import { UploadOutlined } from '@ant-design/icons';
import { newsSchema } from '@/schema/news.schema';
import { useFormSubmit } from '@/hooks';

const CreateNewsForm = ({ onSucess }: { onSucess: () => void }) => {
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();

  const submitNews = async (values: any) => {
    const fileItem = values.imageUrl?.[0]; 
    const fileToUpload = fileItem?.originFileObj;

    if (!fileToUpload) {
      throw new Error("Fichier image introuvable. Veuillez réessayer.");
    }

    await CreateNewsForms(values.title, values.description, values.category, fileToUpload);
  };

  const { loading, handleSubmit } = useFormSubmit(
    form,
    submitNews,
    {
      schema: newsSchema,
      onSuccess: () => {
        form.resetFields();
        onSucess();
      },
      onError: (error) => setError(error.message),
      successMessage: "Article publié avec succès !",
      resetOnSuccess: true,
    }
  );

  const onFinish = (values: any) => {
    setError(null);
    handleSubmit(values);
  };



  return (
    <div className="max-w-2xl mx-auto">
      <Card className="rounded-3xl border-none bg-white/80 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-8 text-center">Créer un nouvel article</h2>

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
                <Select.Option value="AI">AI</Select.Option>
                <Select.Option value="Dev">Dev</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item 
            name="imageUrl" 
            label="Image de l'article"
            valuePropName="fileList" 
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
            rules={[{ required: true, message: "Veuillez sélectionner une image" }]}
          >
            <Upload 
              maxCount={1} 
              beforeUpload={() => false}
              listType="picture"
              className="w-full"
            >
              <Button icon={<UploadOutlined />} className="w-full h-12 rounded-xl">
                Sélectionner hero1.jpg
              </Button>
            </Upload>
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