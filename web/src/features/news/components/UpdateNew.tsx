"use client"

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Upload, Spin } from 'antd';
import { updateNews, getNewsById } from '@/src/services/api';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

interface UpdateNewsFormProps {
  newsId: string;
  onSuccess?: () => void;
}

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

const UpdateNewsForm: React.FC<UpdateNewsFormProps> = ({ newsId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchNewsData = async () => {
      setFetching(true);
      try {
        const news = await getNewsById(newsId);
        
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
      } catch (err) {
        message.error("Impossible de charger les données de l'article");
      } finally {
        setFetching(false);
      }
    };

    if (newsId) fetchNewsData();
  }, [newsId, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const fileItem = values.imageUrl?.[0];
      const newFile = fileItem?.originFileObj;

      await updateNews(newsId, {
        title: values.title,
        description: values.description,
        category: values.category,
        image: newFile
      });

      message.success("Article mis à jour avec succès !");
      
      if (onSuccess) onSuccess();
      
    } catch (err: any) {
      message.error(err.message || "Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
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
      <h2 className="text-2xl font-black text-slate-900 mb-6 text-center italic uppercase tracking-tight">
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
          label={<span className="font-bold text-gray-700">Titre</span>} 
          rules={[{ required: true, message: 'Le titre est requis' }]}
        >
          <Input size="large" className="rounded-xl h-12" placeholder="Titre de l'article" />
        </Form.Item>

        <Form.Item 
          name="category" 
          label={<span className="font-bold text-gray-700">Catégorie</span>} 
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
          label={<span className="font-bold text-gray-700">Image de couverture</span>}
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
          label={<span className="font-bold text-gray-700">Contenu</span>} 
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