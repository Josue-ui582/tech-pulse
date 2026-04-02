'use client';
import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Input, Card, Modal, message, Tooltip, Typography } from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  SearchOutlined, EyeOutlined, MoreOutlined 
} from '@ant-design/icons';
import CreateNewsForm from '@/features/news/components/CreateNew';
import { deleteNew, getNews } from '@/services/api';
import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import UpdateNewsForm from '@/features/news/components/UpdateNew';
import { getUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;


export default function NewsAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const userData = await getUser();

    if(!userData) {
      router.replace("/auth");
      return;
    }

    if (userData.role !== "admin") {
      router.push("/unauthorized");
    }
  }
  checkAuth();
  }, []);

  const fetchNews = useCallback(async (search?: string) => {
    
    setLoading(true);
    try {
      const response = await getNews(undefined, search);
      setNews(response.data || response);
    } catch (error: any) {
      message.error(error.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, [status]);

  console.log("News dans le composant:", news);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNews(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText, fetchNews]);

  const columns = [
    {
      title: 'Article',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div className="flex items-center gap-4">
          <Image 
            src={record.imageUrl ? `${SERVER_URL}/${record.imageUrl}` : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
            className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-100 hidden sm:block" 
            alt="news"
            width="50"
            height="50"
            unoptimized={true}
          />
          <div className="flex flex-col max-w-50 md:max-w-xs">
            <Text strong className="truncate text-gray-800">{text}</Text>
            <Text type="secondary" className="text-xs italic">{formatDate(record.publishedAt)}</Text>
          </div>
        </div>
      ),
    },
    { 
      title: 'Catégorie', 
      dataIndex: 'category', 
      key: 'category',
      responsive: ['md'],
      render: (cat: string) => (
        <Tag className="rounded-full px-3 border-none bg-blue-50 text-blue-600 font-medium">
          {cat}
        </Tag>
      )
    },
    { 
      title: 'Performance', 
      dataIndex: 'viewsCount', 
      key: 'views',
      render: (record: any) => (
        <div className="flex items-center gap-1 text-gray-500">
          <EyeOutlined className="text-xs" />
          <span className="font-semibold">{record}</span>
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'action',
      align: 'right' as const,
      render: (record: any) => (
        <Space size="small">
          <Tooltip title="Modifier">
            <Button 
              type="text" 
              className="hover:bg-blue-50 text-blue-500 rounded-lg" 
              icon={<EditOutlined />}
              onClick={() => {
              setSelectedNewsId(record.id);
              setIsUpdateModalOpen(true);
            }} 
            />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Button 
              type="text" 
              danger 
              className="hover:bg-red-50 rounded-lg" 
              icon={<DeleteOutlined />} 
              onClick={() => confirmDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];


  const confirmDelete = (id: string) => {
    Modal.confirm({
      title: <span className="text-lg font-bold">Confirmer la suppression ?</span>,
      icon: <DeleteOutlined className="text-red-500" />,
      content: 'Cet article disparaîtra définitivement de la plateforme.',
      okText: 'Supprimer',
      okType: 'danger',
      cancelText: 'Annuler',
      centered: true,
      okButtonProps: { className: "rounded-lg" },
      cancelButtonProps: { className: "rounded-lg" },
      onOk: async () => {
        try {
        await deleteNew(id);
        message.success('Article supprimé');
        fetchNews();
      } catch (err) {
        message.error("Erreur lors de la suppression");
      }
      },
    });
  };

  return (
    <>
        <div className="max-w-350 mx-auto space-y-8 animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Title level={2} className="m-0! font-black! tracking-tight text-gray-900">Articles</Title>
              <Text type="secondary">Gérez et publiez vos contenus en toute simplicité</Text>
            </div>
            <Button 
              type="primary"
              icon={<PlusOutlined />} 
              size="large"
              className="h-12 px-6 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-100 font-bold border-none"
              onClick={() => setIsModalOpen(true)}
            >
              Nouvel Article
            </Button>
          </div>

          <Card className="rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
              <Input 
                placeholder="Rechercher par titre..." 
                prefix={<SearchOutlined className="text-gray-400" />} 
                className="h-11 max-w-md rounded-xl bg-gray-50 border-none focus:bg-white transition-all"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="flex gap-2">
                <Button icon={<MoreOutlined />} className="rounded-xl h-11" />
              </div>
            </div>

            <Table 
              columns={columns} 
              dataSource={news}
              pagination={{ 
                pageSize: 6,
                className: "pr-4",
                showSizeChanger: false
              }} 
              loading={loading}
              rowKey="id"
              scroll={{ x: 'max-content' }}
              className="modern-table"
            />
          </Card>

          <Modal 
            open={isModalOpen} 
            onCancel={() => setIsModalOpen(false)} 
            footer={null}
            width={700}
            centered
            destroyOnHidden
            className="rounded-3xl overflow-hidden"
          >
            <CreateNewsForm onSucess={() => {
            setIsModalOpen(false);
            fetchNews();
          }}/>
          </Modal>

          <Modal
            open={isUpdateModalOpen}
            onCancel={() => setIsUpdateModalOpen(false)}
            footer={null}
            destroyOnHidden
            centered
            width={700}
          >
            {selectedNewsId && <UpdateNewsForm
              newsId={selectedNewsId}
              onSuccess={() => {
                setIsUpdateModalOpen(false);
                fetchNews();
              }}
            />}
          </Modal>

          <style jsx global>{`
            .modern-table .ant-table-thead > tr > th {
              background: transparent !important;
              color: #8c8c8c !important;
              font-weight: 600;
              text-transform: uppercase;
              font-size: 11px;
              letter-spacing: 0.05em;
              border-bottom: 1px solid #f0f0f0;
            }
            .modern-table .ant-table-tbody > tr > td {
              border-bottom: 1px solid #f9f9f9;
              padding: 16px !important;
            }
            .modern-table .ant-table-row:hover {
              background-color: #fafafa !important;
            }
          `}</style>
        </div>
    </>
  );
}