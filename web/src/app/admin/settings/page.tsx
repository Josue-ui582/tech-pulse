"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Card, Tabs, Input, Button, Upload, 
  Switch, Divider, Typography, message, 
  Avatar, Form 
} from "antd";
import { 
  UserOutlined, LockOutlined, BellOutlined, 
  CameraOutlined, SaveOutlined, 
  MailFilled
} from "@ant-design/icons";
import { getUser } from "@/utils/auth";
import Loading from "../dashboard/loading";
import { updateAdminPasswordSettings, updateAdminProfileSettings } from "@/services/api";
import { User, SettingsProfileFormValues, SettingsPasswordFormValues } from "@/types/globalTypes";


const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

const { Title, Text, Paragraph } = Typography;

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [form] = Form.useForm();

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

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);

      form.setFieldsValue({
        name: userData?.name,
        email: userData?.email,
        bio: userData?.bio || "",
        profilePictureUrl: userData?.profileImage ? [{
            uid: '-1',
            name: 'Photo de profil actuelle',
            status: 'done',
            url: `${SERVER_URL}/${userData.profileImage}`,
        }] : [],
      });
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <Loading />
    );
  }


  const onProfileFinish = async (values: SettingsProfileFormValues) => {
  setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("bio", values.bio);

      const fileItem = values.profilePictureUrl?.[0];

      if (fileItem?.originFileObj) {
        formData.append("profileImage", fileItem.originFileObj);
      }

      await updateAdminProfileSettings(formData);

      message.success("Profil mis à jour avec succès !");
    } catch (err) {
      message.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const onPasswordFinish = async (values: SettingsPasswordFormValues) => {
    setLoading(true);
    
    try {
      if (values.newPassword !== values.confirmNewPassword) {
        message.error("Les mots de passe ne correspondent pas");
        return;
      }

      await updateAdminPasswordSettings({ newPassword: values.confirmNewPassword });
      message.success("Mot de passe mis à jour !");
    } catch (err) {
      message.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const tabItems = [
    {
      key: "1",
      label: (<span><UserOutlined />Profil</span>),
      children: (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Form form={form} layout="vertical" onFinish={onProfileFinish} className="max-w-2xl">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex flex-col items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
                        <div className="relative group cursor-pointer">
                            <Avatar 
                                size={120} 
                                icon={<UserOutlined />} 
                                className="shadow-xl"
                                src={user?.profileImage ? `${SERVER_URL}/${user.profileImage}` : undefined}
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <CameraOutlined className="text-white text-2xl" />
                            </div>
                        </div>

                        <Form.Item
                            name="profilePictureUrl"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e.fileList}
                            >
                            <Upload>
                                <Button type="dashed" size="small">
                                Changer la photo
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Text type="secondary" className="text-[10px] text-center">JPG, PNG ou GIF. <br/> Max 2Mo.</Text>
                    </div>

                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <Form.Item label="Nom complet" name="name">
                                <Input prefix={<UserOutlined className="text-slate-400" />} className="rounded-xl h-11" />
                            </Form.Item>
                            <Form.Item label="Adresse Email" name="email">
                                <Input prefix={<MailFilled className="text-slate-400" />} className="rounded-xl h-11 bg-slate-50" />
                            </Form.Item>
                        </div>
                        <Form.Item label="Biographie courte" name="bio">
                            <Input.TextArea rows={4} placeholder="Parlez-nous de vous..." className="rounded-xl" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />} className="h-11 rounded-xl bg-blue-600 px-8 font-bold">
                            Enregistrer le profil
                        </Button>
                    </div>
                </div>
            </Form>
        </motion.div>
      ),
    },
    {
      key: "2",
      label: (<span><LockOutlined />Sécurité</span>),
      children: (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <Title level={4} className="mb-6">Changer le mot de passe</Title>
          <Form layout="vertical" form={form} onFinish={onPasswordFinish}>
            <Form.Item label="Nouveau mot de passe" name="newPassword" rules={[{ required: true, message: "Veuillez entrer un nouveau mot de passe" }]}>
              <Input.Password className="rounded-xl h-11" />
            </Form.Item>
            <Form.Item label="Confirmer le nouveau mot de passe" name="confirmNewPassword" rules={[{ required: true, message: "Veuillez confirmer votre nouveau mot de passe" }]}>
              <Input.Password className="rounded-xl h-11" />
            </Form.Item>
            <Button type="primary" className="h-11 rounded-xl bg-slate-900 border-none px-8" htmlType="submit">
              Mettre à jour le mot de passe
            </Button>
          </Form>
          <Divider className="my-8" />
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <Title level={5} className="text-amber-800!">Double Authentification (2FA)</Title>
            <Paragraph className="text-amber-700/80 text-sm">Ajoutez une couche de sécurité supplémentaire à votre compte admin.</Paragraph>
            <Button danger ghost className="rounded-lg">Activer maintenant</Button>
          </div>
        </motion.div>
      ),
    },
    {
      key: "3",
      label: (<span><BellOutlined />Notifications</span>),
      children: (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <Text className="block font-bold">Nouveaux articles</Text>
              <Text type="secondary">Être notifié quand un journaliste soumet un article.</Text>
            </div>
            <Switch defaultChecked />
          </div>
          <Divider className="my-0" />
          <div className="flex justify-between items-center">
            <div>
              <Text className="block font-bold">Commentaires</Text>
              <Text type="secondary">Notifications pour les nouveaux commentaires à modérer.</Text>
            </div>
            <Switch defaultChecked />
          </div>
          <Divider className="my-0" />
          <div className="flex justify-between items-center">
            <div>
              <Text className="block font-bold">Rapports Système</Text>
              <Text type="secondary">Alertes de performance et erreurs serveur.</Text>
            </div>
            <Switch />
          </div>
        </motion.div>
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