'use client';
import { Avatar, Badge, Dropdown, Tag, Typography } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined, 
  SafetyCertificateOutlined 
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const { Text } = Typography;

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminAvatar({ user }: { user: any }) {
  const router = useRouter();
  const { logout } = useAuth();

  const items = [
    {
      key: 'profile',
      label: (
        <div className="px-1 py-2 min-w-40">
          <Text strong>{user?.name}</Text>
        </div>
      ),
    },
    { type: 'divider' as const },
    {
      key: 'settings',
      label: 'Paramètres compte',
      icon: <SettingOutlined />,
      onClick: () => router.push('/admin/settings'),
    },
    {
      key: 'security',
      label: 'Sécurité',
      icon: <SafetyCertificateOutlined />,
    },
    { type: 'divider' as const },
    {
      key: 'logout',
      label: 'Déconnexion',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: async () => {
        await logout();
        router.push('/auth');
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={['click']}>
      <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full transition-all cursor-pointer group bg-transparent">
        <Badge dot status="processing" offset={[-2, 32]} color="">
          <Avatar 
            size={40} 
            src={user?.profileImage ? `${SERVER_URL}/${user.profileImage}` : undefined}
            className="bg-blue-100 border-2 border-white shadow-sm group-hover:scale-105 transition-transform"
            icon={<UserOutlined />}
          />
        </Badge>
        
        <div className="hidden md:flex flex-col items-start leading-tight">
            <Text style={{ color: 'blue-500' }} className="font-bold text-sm">
                {user?.name}
            </Text>

          <Tag className="m-0 border-none bg-blue-50 text-[10px] font-black lowercase tracking-tighter px-1.5">
            Propriétaire
          </Tag>
        </div>
      </div>
    </Dropdown>
  );
}