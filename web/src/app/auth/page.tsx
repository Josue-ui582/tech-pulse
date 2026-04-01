'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Divider, message } from 'antd';
import { MailOutlined, LockOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import { authService } from '@/services/api';
import { AuthForm } from '@/types/news';
import { getUser } from '@/utils/auth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: AuthForm) => {
    setLoading(true);
    
    try {
      const cleanedValues = {
        ...values,
        email: values.email.trim().toLowerCase(),
        name: `${values.firstName} ${values.lastName}`
      };

      if (isLogin) {
        const result = await authService.login(cleanedValues);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        const user = getUser();
        if (user.role === "admin") {
          message.success("Connexion réussie !");
          router.push("/admin/dashboard");
        }else{
          message.success("connexion réussie");
          router.push("/news");
        }
        if (result?.error) {
          throw new Error("Identifiants invalides");
        }
        router.refresh();
        
      } else {
        await authService.register(cleanedValues);
        message.success("Compte créé ! Connectez-vous.");
        setIsLogin(true);
        form.resetFields(['password']);
      }
    } catch (error: any) {
      message.error(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-4xl shadow-2xl shadow-blue-100 border border-gray-50 max-w-md mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase italic">
          {isLogin ? 'Connexion' : 'Rejoindre'}
        </h1>
        <p className="text-gray-400 font-medium mt-2">
          {isLogin ? 'Content de vous revoir !' : 'Créez votre accès admin'}
        </p>
      </div>

      <Divider plain className="text-gray-300 text-[10px] uppercase font-bold tracking-widest">Ou par email</Divider>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="space-y-2"
      >
        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="firstName" rules={[{ required: true, message: 'Requis' }]}>
              <Input prefix={<UserOutlined className="text-gray-300" />} placeholder="Prénom" className="rounded-xl h-12 border-gray-100 bg-gray-50" />
            </Form.Item>
            <Form.Item name="lastName" rules={[{ required: true, message: 'Requis' }]}>
              <Input placeholder="Nom" className="rounded-xl h-12 border-gray-100 bg-gray-50" />
            </Form.Item>
          </div>
        )}

        <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
          <Input prefix={<MailOutlined className="text-gray-300" />} placeholder="Email" className="rounded-xl h-12 border-gray-100 bg-gray-50" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, min: 6 }]}>
          <Input.Password prefix={<LockOutlined className="text-gray-300" />} placeholder="Mot de passe" className="rounded-xl h-12 border-gray-100 bg-gray-50" />
        </Form.Item>

        <Button 
          type="primary" 
          htmlType="submit" 
          block 
          loading={loading}
          className="h-14 bg-blue-600 hover:bg-blue-700 border-none rounded-2xl text-lg font-black shadow-xl shadow-blue-100 mt-6 uppercase tracking-wider"
        >
          {isLogin ? 'Se connecter' : 'Créer mon compte'}
        </Button>
      </Form>

      <div className="mt-10 text-center">
        <button 
          onClick={() => { setIsLogin(!isLogin); form.resetFields(); }}
          className="text-gray-400 font-medium hover:text-blue-600 transition-all text-sm"
        >
          {isLogin ? "Nouveau ici ? " : "Déjà un compte ? "}
          <span className="text-blue-600 font-bold underline decoration-2 underline-offset-4 cursor-pointer">
            {isLogin ? "S'inscrire" : "Se connecter"}
          </span>
        </button>
      </div>
    </div>
  );
}