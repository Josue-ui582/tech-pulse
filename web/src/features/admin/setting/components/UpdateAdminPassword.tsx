import { motion } from "framer-motion"
import { Typography, Form, Input, Button, Divider, message } from "antd"
import { SettingsPasswordFormValues } from "@/types/globalTypes"
import { updatePassword } from "@/schema/updatePasswordFormSchema"
import { generate2FA, updateAdminPasswordSettings, verify2FA } from "@/services/api"
import Loading from "@/app/admin/dashboard/loading"
import { useState } from "react"

type UpdateAdminPasswordSettingsProps = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const { Title, Paragraph } = Typography

export const UpdateAdminPasswordSettings = ({ loading, setLoading }: UpdateAdminPasswordSettingsProps) => {
    const [form] = Form.useForm()
    const [faForm] = Form.useForm()
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [show2FA, setShow2FA] = useState(false);

    const onPasswordFinish = async (values: SettingsPasswordFormValues) => {
        setLoading(true);
        
        try {
          await updatePassword.validate(values, { abortEarly: false });
    
          await updateAdminPasswordSettings({ newPassword: values.newPassword });
          message.success("Mot de passe mis à jour !");
        } catch (err: any) {
          if (err.inner) {
          err.inner.forEach((e: any) => {
            message.error(e.message);
          });
        } else {
          message.error(err.message || "Une erreur est survenue");
        }
        } finally {
          setLoading(false);
        }
    };

    if(loading) {
        return <Loading />
    }

    const handleGenerate2FA = async () => {
        try {
          const data = await generate2FA();
          setQrCode(data.qrCode);
          setShow2FA(true);
        } catch (err) {
          message.error("Erreur lors de la génération du QR code");
        }
      };
    
      const handleVerify2FA = async (values: { verificationCode: string }) => {
        setLoading(true);
        try {
            await verify2FA(values.verificationCode);
            message.success("2FA activée avec succès !");
            setShow2FA(false);
            faForm.resetFields();
        } catch (err) {
            message.error("Code de vérification invalide");
        } finally {
            setLoading(false);
        }
    };

    
    return (
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

          {!show2FA ? (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <Title level={5} className="text-amber-800!">Double Authentification (2FA)</Title>
              <Paragraph className="text-amber-700/80 text-sm">Ajoutez une couche de sécurité supplémentaire.</Paragraph>
              <Button 
                danger ghost 
                className="rounded-lg" 
                onClick={handleGenerate2FA}
                loading={loading}
              >
                Activer maintenant
                    </Button>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-white rounded-2xl border border-blue-100 shadow-sm"
                >
                    <Title level={5} className="text-blue-800!">Configurer le 2FA</Title>
                    <Paragraph className="text-slate-500 text-sm">Scannez ce code avec Google Authenticator ou Authy.</Paragraph>
                    
                    {qrCode && <div className="bg-white p-2 inline-block border rounded-xl mb-4"><img src={qrCode} alt="QR Code" /></div>}
                    
                    <Form layout="vertical" form={faForm} onFinish={handleVerify2FA}>
                        <Form.Item 
                            label="Code à 6 chiffres" 
                            name="verificationCode" 
                            rules={[{ required: true, len: 6, message: "Entrez les 6 chiffres" }]}
                        >
                            <Input placeholder="000000" className="rounded-xl h-11 text-center text-lg tracking-widest" />
                        </Form.Item>
                        <div className="flex gap-2">
                            <Button type="primary" className="h-11 rounded-xl bg-blue-600 flex-1" htmlType="submit" loading={loading}>
                                Vérifier & Activer
                            </Button>
                            <Button className="h-11 rounded-xl flex-1" onClick={() => setShow2FA(false)}>
                                Annuler
                            </Button>
                        </div>
                    </Form>
                </motion.div>
            )}
        </motion.div>
    );
};