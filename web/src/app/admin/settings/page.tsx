"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Card, Tabs, Typography 
} from "antd";
import { 
  UserOutlined, LockOutlined, BellOutlined
} from "@ant-design/icons";
import { getUser } from "@/utils/auth";
import { UpdateAdminProfileSettings } from "@/features/admin/setting/components/UpdateAdminProfil";
import { UpdateAdminPasswordSettings } from "@/features/admin/setting/components/UpdateAdminPassword";
import { ActiveNotification } from "@/features/admin/setting/components/ActiveNotification";


const { Title, Text } = Typography;

export default function SettingsPage() {
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


  const tabItems = [
    {
      key: "1",
      label: (<span><UserOutlined />Profil</span>),
      children: (
        <UpdateAdminProfileSettings />
      ),
    },
    {
      key: "2",
      label: (<span><LockOutlined />Sécurité</span>),
      children: (
        <UpdateAdminPasswordSettings loading={loading} setLoading={setLoading} />
      ),
    },
    {
      key: "3",
      label: (<span><BellOutlined />Notifications</span>),
      children: (
        <ActiveNotification />
      ),
    }
  ];

  return (
    <div className="space-y-6">
      <header>
        <Title level={2} className="font-black! text-slate-900! mb-1">Réglages</Title>
        <Text className="text-slate-400">Gérez votre compte et les préférences de la plateforme.</Text>
      </header>

      <Card className="shadow-sm border-gray-100 rounded-4xl overflow-hidden p-2">
        <Tabs 
          defaultActiveKey="1" 
          items={tabItems} 
          className="admin-settings-tabs"
          size="large"
          tabBarStyle={{ marginBottom: 32, paddingLeft: 16 }}
        />
      </Card>

      <style jsx global>{`
        .admin-settings-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #2563eb !important;
          font-weight: 700 !important;
        }
        .admin-settings-tabs .ant-tabs-ink-bar {
          background: #2563eb !important;
          height: 3px !important;
          border-radius: 3px 3px 0 0;
        }
        .ant-form-item-label label {
          font-weight: 600 !important;
          color: #64748b !important;
        }
      `}</style>
    </div>
  );
}