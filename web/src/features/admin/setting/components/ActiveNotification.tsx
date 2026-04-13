import { motion } from "framer-motion"
import { Switch } from "antd"
import Text from "antd/es/typography/Text"

export const ActiveNotification = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <Text className="block font-bold">Rapports Système</Text>
              <Text type="secondary">Alertes de performance et erreurs serveur.</Text>
            </div>
            <Switch />
          </div>
        </motion.div>
    )
}