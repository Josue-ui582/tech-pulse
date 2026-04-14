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
      <div className="flex items-center p-2 gap-3 transition-all group">
        <Badge dot status="processing" offset={[-2, 32]} color="#10b981">
          <Avatar 
            size={40} 
            src={user?.profileImage ? `${SERVER_URL}/${user.profileImage}` : undefined}
            className="group-hover:scale-105 transition-transform"
            icon={<UserOutlined />}
          />
        </Badge>
        
        <div className="hidden md:flex flex-col items-start leading-tight">
            <p className="font-bold text-sm text-white group-hover:text-black dark:hover:text-black">
                {user?.name}
            </p>

          <Tag className="m-0 border-none bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black lowercase tracking-tighter px-1.5">
            Propriétaire
          </Tag>
        </div>
      </div>
    </Dropdown>
  );
}