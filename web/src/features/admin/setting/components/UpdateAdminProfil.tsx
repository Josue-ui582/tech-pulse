import { Avatar, Button, Form, Input, message, Typography, Upload } from "antd"
import { CameraOutlined, MailFilled, SaveOutlined, UserOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Loading from "@/app/admin/dashboard/loading"
import { useAuth } from "@/hooks/useAuth"
import { SettingsProfileFormValues } from "@/types/globalTypes"
import { updateAdminProfileSettings } from "@/services/api.adminProfile"
import { useFormSubmit } from "@/hooks"

const { Text } = Typography

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const UpdateAdminProfileSettings = () => {
    const [form] = Form.useForm()
    const { user } = useAuth()

    useEffect(() => {
      if (!user) return;

      form.setFieldsValue({
        name: user.name,
        email: user.email,
        bio: user.bio || "",
        profilePictureUrl: user.profileImage ? [{
            uid: '-1',
            name: 'Photo de profil actuelle',
            status: 'done',
            url: `${SERVER_URL}/${user.profileImage}`,
        }] : [],
      });
    }, [user, form]);

    if (!user) {
      return (
        <Loading />
      );
    }

    const submitProfile = async (values: SettingsProfileFormValues) => {
      const formData = new FormData();
    
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("bio", values.bio);
    
      const fileItem = values.profilePictureUrl?.[0];
    
      if (fileItem?.originFileObj) {
        formData.append("profileImage", fileItem.originFileObj);
      }
    
      await updateAdminProfileSettings(formData);
    };

    const { loading, handleSubmit } = useFormSubmit(
      form,
      submitProfile,
      {
        onSuccess: () => {
          message.success("Profil mis à jour avec succès !");
        },
        onError: (error) => {
          message.error("Une erreur est survenue");
        },
        successMessage: "Profil mis à jour avec succès !",
      }
    );

    const onProfileFinish = (values: SettingsProfileFormValues) => {
      handleSubmit(values);
    };
    return(
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
                        <Text type="secondary" className="text-[10px] text-center">JPG, PNG ou GIF, JPEG, AVIF. <br/> Max 2Mo.</Text>
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
    )
}