import { motion } from "framer-motion"
import { Typography, Form, Input, Button, Divider, message } from "antd"
import { SettingsPasswordFormValues } from "@/types/globalTypes"
import { updatePassword } from "@/schema/updatePasswordFormSchema"
import { updateAdminPasswordSettings } from "@/services/api"
import Loading from "@/app/admin/dashboard/loading"

type UpdateAdminPasswordSettingsProps = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const { Title, Paragraph } = Typography

export const UpdateAdminPasswordSettings = ({ loading, setLoading }: UpdateAdminPasswordSettingsProps) => {
    const [form] = Form.useForm()

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
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <Title level={5} className="text-amber-800!">Double Authentification (2FA)</Title>
            <Paragraph className="text-amber-700/80 text-sm">Ajoutez une couche de sécurité supplémentaire à votre compte admin.</Paragraph>
            <Button danger ghost className="rounded-lg">Activer maintenant</Button>
          </div>
        </motion.div>
    )
}