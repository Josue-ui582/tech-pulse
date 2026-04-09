import { motion } from "framer-motion"
import { Divider, Switch } from "antd"
import Text from "antd/es/typography/Text"

export const ActiveNotification = () => {
    return (
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
    )
}