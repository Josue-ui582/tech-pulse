
import { Form, Input, Button, Row, Col, message, Card } from "antd"
import { SendOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"
import { ValidationError } from "yup"
import { contactFormSchema } from "../../schema/contactFormSchema"

const ContactForm = () => {
  const [form] = Form.useForm()
  const onFinish = async (values: any) => {
    try {
      await contactFormSchema.validate(values, { abortEarly: false })
      // Simulate form submission (e.g., API call)
      console.log("Form values:", values)
      message.success("Votre message a été envoyé avec succès !")
      form.resetFields()
    } catch (err : unknown) {
      if (err instanceof ValidationError) {
        const errorFields = err.inner.map((error : any) => ({
          name: error.path,
          errors: [error.message],
        }))
        form.setFields(errorFields)
      } else {
        message.error("Une erreur est survenue lors de l'envoi du message.")
      }
    }
  }
    return (
    <Col xs={24} lg={14}>
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
        >
            <Card className="rounded-[2.5rem] border-none shadow-2xl p-4 md:p-8">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  size="large"
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item 
                        label="Nom Complet" 
                        name="name"
                        rules={[{ required: true, message: 'Entrez votre nom' }]}
                      >
                        <Input placeholder="John Doe" className="rounded-xl border-slate-100 h-12" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item 
                        label="Adresse Email" 
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Email invalide' }]}
                      >
                        <Input placeholder="john@example.com" className="rounded-xl border-slate-100 h-12" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item 
                    label="Sujet" 
                    name="subject"
                    rules={[{ required: true, message: 'Précisez le sujet' }]}
                  >
                    <Input placeholder="Comment pouvons-nous vous aider ?" className="rounded-xl border-slate-100 h-12" />
                  </Form.Item>

                  <Form.Item 
                    label="Votre Message" 
                    name="message"
                    rules={[{ required: true, message: 'Le message est vide' }]}
                  >
                    <Input.TextArea 
                      rows={5} 
                      placeholder="Décrivez votre demande en détail..." 
                      className="rounded-2xl border-slate-100" 
                    />
                  </Form.Item>

                  <Form.Item className="mb-0">
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      icon={<SendOutlined />}
                      className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700! font-bold text-lg shadow-lg shadow-blue-200"
                    >
                      Envoyer le message
                    </Button>
                  </Form.Item>
                </Form>
            </Card>
            </motion.div>
          </Col>
  )
}

export default ContactForm