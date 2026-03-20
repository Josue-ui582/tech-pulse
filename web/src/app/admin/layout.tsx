'use client';
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Badge } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import Loading from './dashboard/loading';

const { Header, Content, Sider } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null)

    const menuItems = [
        { key: '/admin/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: '/admin/news', icon: <FileTextOutlined />, label: 'Articles' },
        { key: '/admin/users', icon: <UserOutlined />, label: 'Équipe' },
        { key: '/admin/settings', icon: <SettingOutlined />, label: 'Réglages' },
    ];

    const handleLogout = () => {
        localStorage.clear();
        router.push('/auth');
    };

    useEffect(() => {
      const userString = localStorage.getItem("user");
      if (userString) {
        setUser(JSON.parse(userString))
      }
    }, []);

    if(!user) return <Loading />

  return (
    <Layout className="min-h-screen bg-[#F8FAFC]">
      <Sider
        width={260}
        theme="light"
        className="hidden lg:block border-r border-gray-100 sticky top-0 h-screen"
      >
        <div className="h-20 flex items-center px-8 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
            N
          </div>
          <span className="ml-3 font-black text-gray-800 tracking-tight text-lg">NEWS ADMIN</span>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems.map(item => ({
            ...item,
            onClick: () => router.push(item.key)
          }))}
          className="border-none px-4 space-y-2"
        />
      </Sider>

      <Layout className="bg-transparent">
        <Header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 h-16 flex justify-between items-center border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-800 lg:hidden">Admin {user.firstName}</h1>
          <div className="hidden lg:block text-gray-400 text-sm font-medium">Bienvenue, {user.firstName} {user.lastName} 👋</div>

          <div className="flex items-center gap-5">
            <Badge dot color="blue">
              <BellOutlined className="text-xl text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
            </Badge>
            
            <Dropdown 
              menu={{ items: [{ key: 'logout', label: 'Déconnexion', icon: <LogoutOutlined />, danger: true, onClick: handleLogout }] }}
              placement="bottomRight"
              arrow
            >
              <div className="flex items-center gap-3 p-1 pr-3bg-gray-50 rounded-full cursor-pointer transition-all border border-gray-100">
                <Avatar src="https://api.dicebear.com" className="bg-blue-100 shadow-sm" />
                <div className="hidden sm:flex flex-col leading-none">
                  <span className="text-sm font-bold text-gray-100">{user.firstName} Admin</span>
                  <span className="text-[10px] text-gray-400 lowercase font-bold tracking-tighter">Propriétaire</span>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="p-4 sm:p-8 mb-20 lg:mb-0">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </Content>

        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-6 py-3 flex justify-between items-center z-1000 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => router.push(item.key)}
              className={`flex flex-col items-center gap-1 transition-all ${
                pathname === item.key ? 'text-blue-600 scale-110' : 'text-gray-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </nav>
      </Layout>

      <style jsx global>{`
        .ant-menu-item {
          border-radius: 12px !important;
          margin-block: 4px !important;
        }
        .ant-menu-item-selected {
          background-color: #EFF6FF !important;
          color: #2563EB !important;
        }
        .ant-menu-item-selected .anticon {
          color: #2563EB !important;
        }
      `}</style>
    </Layout>
  );
}