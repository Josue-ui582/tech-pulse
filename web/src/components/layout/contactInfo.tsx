import { contactInfos } from '@/data/preview'
import { Card, Col } from 'antd'
import {motion} from 'framer-motion'
import Text from 'antd/es/typography/Text'

const ContactInfo = () => {
  return (
    <Col xs={24} lg={10}>
            <div className="space-y-6">
              {contactInfos.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="rounded-3xl border-none shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center">
                        {info.icon}
                      </div>
                      <div>
                        <Text className="block text-slate-400 text-xs uppercase font-bold tracking-widest">
                          {info.title}
                        </Text>
                        <Text className="block text-slate-900 font-bold text-lg">
                          {info.value}
                        </Text>
                        <Text className="text-slate-400 text-sm">{info.desc}</Text>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Col>
  )
}

export default ContactInfo