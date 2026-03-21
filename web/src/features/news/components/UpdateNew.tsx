"use client"

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Card, Upload } from 'antd';
import { updateNews, getNewsById } from '@/src/services/api';
import { UploadOutlined } from '@ant-design/icons';

interface UpdateNewsFormProps {
  newsId: string;
}

const SERVER_URL = "http://localhost:3001";

const UpdateNewsForm: React.FC<UpdateNewsFormProps> = ({ newsId }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNewsById(newsId);
        const news = response;

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
        message.error("Impossible de charger l'article");
      } finally {
        setFetching(false);
      }
    };

    fetchNews();
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
    } catch (err: any) {
      message.error(err.message || "Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card loading={fetching} className="rounded-3xl border-none bg-white/80 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Modifier l'article</h2>
        
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Titre" rules={[{ required: true }]}>
            <Input size="large" className="rounded-xl" />
          </Form.Item>

          <Form.Item name="category" label="Catégorie" rules={[{ required: true }]}>
            <Select size="large" className="rounded-xl">
              <Select.Option value="Tech">Tech</Select.Option>
              <Select.Option value="AI">AI</Select.Option>
              <Select.Option value="Dev">Dev</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item 
            name="imageUrl" 
            label="Image de l'article"
            valuePropName="fileList" 
            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
          >
            <Upload 
              maxCount={1} 
              beforeUpload={() => false}
              listType="picture"
            >
              <Button icon={<UploadOutlined />} className="w-full h-12 rounded-xl">
                Changer l'image (optionnel)
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item name="description" label="Contenu" rules={[{ required: true }]}>
            <Input.TextArea rows={6} className="rounded-xl" />
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            size="large" 
            loading={loading}
            className="h-14 rounded-xl bg-indigo-600 font-bold"
          >
            Enregistrer les modifications
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateNewsForm;