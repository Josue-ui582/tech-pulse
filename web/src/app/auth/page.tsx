'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Divider, message } from 'antd';
import { 
  GoogleOutlined, 
  TwitterOutlined, 
  FacebookOutlined, 
  MailOutlined, 
  LockOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import { loginSchema, registerSchema } from '@/src/schema/auth.schema';
import { authService } from '@/src/services/api';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const yupSync = (schema: any) => ({
    async validator({ field }: any, value: any) {
      await schema.validateAt(field, form.getFieldsValue());
    },
  });

  const onFinish = async (values: any) => {
    setLoading(true);
    
    try {
      if (isLogin) {
        const data = await authService.login({
          email: values.email,
          password: values.password
        });
        
        message.success("Connexion réussie !");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        message.success(`Bienvenue, ${data.user.firstName} !`);

        if (data.user.role === "admin") {
          router.push("/admin/dashboard")
        }else{
          router.push("/auth")
        }
        
      } else {
        await authService.register(values);
        
        message.success("Compte créé avec succès ! Connectez-vous.");
        setIsLogin(true);
        form.resetFields(['password']);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white p-8 md:p-12 rounded-4xl shadow-2xl shadow-blue-100 border border-gray-50">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {isLogin ? 'Connexion' : 'Créer un compte'}
        </h1>
        <p className="text-gray-500 mt-2">
          {isLogin ? 'Accédez à votre tableau de bord' : 'Rejoignez notre communauté dès aujourd\'hui'}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Button className="h-12 flex items-center justify-center rounded-xl hover:border-red-500 hover:text-red-500" icon={<GoogleOutlined />} />
        <Button className="h-12 flex items-center justify-center rounded-xl hover:border-blue-400 hover:text-blue-400" icon={<TwitterOutlined />} />
        <Button className="h-12 flex items-center justify-center rounded-xl hover:border-blue-800 hover:text-blue-800" icon={<FacebookOutlined />} />
      </div>

      <Divider className="text-gray-400 text-xs uppercase tracking-widest">Ou continuer avec</Divider>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="space-y-1"
      >
        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="firstName" rules={[yupSync(registerSchema)]}>
              <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Prénom" className="rounded-xl h-11" />
            </Form.Item>
            <Form.Item name="lastName" rules={[yupSync(registerSchema)]}>
              <Input placeholder="Nom" className="rounded-xl h-11" />
            </Form.Item>
          </div>
        )}

        <Form.Item name="email" rules={[yupSync(isLogin ? loginSchema : registerSchema)]}>
          <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Email Professionnel" className="rounded-xl h-11" />
        </Form.Item>

        <Form.Item name="password" rules={[yupSync(isLogin ? loginSchema : registerSchema)]}>
          <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Mot de passe" className="rounded-xl h-11" />
        </Form.Item>

        {isLogin && (
          <div className="text-right mb-4">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Mot de passe oublié ?</a>
          </div>
        )}

        <Button 
          type="primary" 
          htmlType="submit" 
          block 
          loading={loading}
          className="h-12 bg-linear-to-r from-blue-600 to-indigo-600 border-none rounded-xl text-md font-bold shadow-lg shadow-blue-200 mt-4"
        >
          {isLogin ? 'Se connecter' : 'Commencer maintenant'}
        </Button>
      </Form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          {isLogin ? "Vous n'avez pas de compte ?" : "Vous faites déjà partie de l'équipe ?"}
          <button 
            onClick={() => { setIsLogin(!isLogin); form.resetFields(); }}
            className="ml-2 text-blue-600 font-bold hover:text-indigo-600 transition-colors cursor-pointer"
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
}