'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Divider, message } from 'antd';
import { MailOutlined, LockOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import { verify2FA } from '@/services/api.2fa';
import { authService } from '@/services/api.user';
import { AuthForm } from '@/types/globalTypes';
import { loginSchema, registerSchema } from '@/schema/auth.schema';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { loading, refreshUser } = useAuth();
  const [show2FA, setShow2FA] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: AuthForm) => {
    if(loading) return;
    
    try {
      if (isLogin) {
        if (show2FA) {
          if (!values.twoFactorCode) {
            throw new Error("Code 2FA requis");
          }

          const verify = await verify2FA(values.twoFactorCode.toString());

          if (verify?.error) {
            throw new Error("Code 2FA invalide");
          }

          await refreshUser();
          messageApi.success("Connexion réussie !");
          router.replace("/admin/dashboard");
          return;
        }

        const cleanedValues = await loginSchema.validate(values, { abortEarly: false });
        const result = await authService.login(cleanedValues);

        if (result?.error) {
          throw new Error("Identifiants invalides");
        }

        if (result.requires2FA) {
          setShow2FA(true);
          messageApi.info("Veuillez entrer votre code 2FA");
        } else {
          await refreshUser();
          form.resetFields();
          messageApi.success("Connexion réussie !");
          router.replace(result.user.role === "admin" ? "/admin/dashboard" : "/news");
        }
      }
    } catch (error: any) {
      message.error(error.message || "Une erreur est survenue");
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
      
      {contextHolder}
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
        {show2FA ? (
          <div className="animate-in fade-in duration-500">
            <p className="text-center text-gray-500 mb-4">Entrez le code généré par votre application.</p>
            <Form.Item 
              name="twoFactorCode" 
              rules={[{ required: true, message: 'Le code est requis' }, { len: 6, message: '6 chiffres' }]}
            >
              <Input 
                prefix={<LockOutlined className="text-gray-300" />} 
                placeholder="Code 000000" 
                className="rounded-xl h-12 text-center text-2xl tracking-[1em] font-bold"
                maxLength={6}
              />
            </Form.Item>
            
            <Button 
              type="primary" htmlType="submit" block loading={loading}
              className="h-14 bg-green-600 hover:bg-green-700 border-none rounded-2xl text-lg font-black mt-4 uppercase"
            >
              Vérifier le code
            </Button>

            <button 
              type="button"
              onClick={() => setShow2FA(false)}
              className="w-full text-center mt-4 text-gray-400 text-sm hover:underline"
            >
              Retour au login
            </button>
          </div>
        ) : (
          <>
            {!isLogin && (
              <Form.Item name="name" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} placeholder="Nom complet" className="rounded-xl h-12" />
              </Form.Item>
            )}

            <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
              <Input prefix={<MailOutlined />} placeholder="Email" className="rounded-xl h-12" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Mot de passe" className="rounded-xl h-12" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block loading={loading} className="h-14 rounded-2xl mt-6 uppercase">
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
            </Button>
          </>
        )}
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