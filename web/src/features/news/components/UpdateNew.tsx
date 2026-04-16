"use client"

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Upload, Spin } from 'antd';
import { updateNews, getNewsById } from '@/services/api.news';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { useAsyncData, useFormSubmit } from '@/hooks';

interface UpdateNewsFormProps {
  newsId: string;
  onSuccess?: () => void;
}

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

const UpdateNewsForm: React.FC<UpdateNewsFormProps> = ({ newsId, onSuccess }) => {
  const [form] = Form.useForm();

  const { data: news, loading: fetching } = useAsyncData(
    () => getNewsById(newsId),
    [newsId],
    {
      onSuccess: (news) => {
        form.setFieldsValue({
          title: news.title,
          description: news.description,
          category: news.category,
          imageUrl: news.imageUrl ? [{
            uid: '-1',
            name: 'Image actuelle',
            status: 'done',
            url: `${SERVER_URL}/${news.imageUrl}`, 
          }] : [],
        });
      },
      onError: () => {
        message.error("Impossible de charger les données de l'article");
      }
    }
  );

  const submitUpdate = async (values: any) => {
    const fileItem = values.imageUrl?.[0];
    const newFile = fileItem?.originFileObj;

    await updateNews(newsId, {
      title: values.title,
      description: values.description,
      category: values.category,
      image: newFile
    });
  };

  const { loading, handleSubmit } = useFormSubmit(
    form,
    submitUpdate,
    {
      onSuccess: () => {
        message.success("Article mis à jour avec succès !");
        onSuccess?.();
      },
      onError: (error) => {
        message.error(error.message || "Erreur lors de la mise à jour");
      },
      successMessage: "Article mis à jour avec succès !",
    }
  );

  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  if (fetching) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-4">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
        <p className="text-gray-400 animate-pulse">Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-2">
      <h2 className="text-2xl font-black mb-6 text-center italic uppercase tracking-tight">
        Modifier l'Article
      </h2>
      
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item 
          name="title" 
          label={<span className="font-bold">Titre</span>} 
          rules={[{ required: true, message: 'Le titre est requis' }]}
        >
          <Input size="large" className="rounded-xl h-12" placeholder="Titre de l'article" />
        </Form.Item>

        <Form.Item 
          name="category" 
          label={<span className="font-bold">Catégorie</span>} 
          rules={[{ required: true }]}
        >
          <Select size="large" className="rounded-xl h-12">
            <Select.Option value="Tech">Tech</Select.Option>
            <Select.Option value="AI">AI</Select.Option>
            <Select.Option value="Dev">Dev</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item 
          name="imageUrl" 
          label={<span className="font-bold">Image de couverture</span>}
          valuePropName="fileList" 
          getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
          extra="Laissez tel quel pour conserver l'image actuelle."
        >
          <Upload 
            maxCount={1} 
            beforeUpload={() => false}
            listType="picture"
            className="w-full"
          >
            <Button icon={<UploadOutlined />} className="w-full h-14 rounded-xl border-dashed border-2">
              Remplacer l'image
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item 
          name="description" 
          label={<span className="font-bold">Contenu</span>} 
          rules={[{ required: true, message: 'Le contenu est requis' }]}
        >
          <Input.TextArea rows={6} className="rounded-xl p-4" placeholder="Description détaillée..." />
        </Form.Item>

        <Button 
          type="primary" 
          htmlType="submit" 
          block 
          loading={loading}
          className="h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black text-lg shadow-xl shadow-indigo-100 mt-4"
        >
          ENREGISTRER LES MODIFICATIONS
        </Button>
      </Form>
    </div>
  );
};

export default UpdateNewsForm;