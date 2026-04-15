"use client";

import { useState } from "react";
import { Input, Button, List, Avatar, message, Divider } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/formatDate";

const { TextArea } = Input;

interface NewsCommentsProps {
  slug: string;
}

export default function NewsComments({ slug }: NewsCommentsProps) {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  
  // Simulation de données - À remplacer par votre hook useAsyncData plus tard
  const [comments, setComments] = useState<any[]>([]);

  const handleSubmit = async () => {
    if (!value.trim()) return;

    setSubmitting(true);

    try {
      // Appel à votre service API (à créer dans services/api.ts)
      // await addComment(newsId, value);
      
      message.success("Commentaire ajouté !");
      setValue("");
      // Rafraîchir la liste ici
    } catch (error) {
      message.error("Erreur lors de l'envoi");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 bg-white rounded-4xl p-8 shadow-sm border border-slate-50">
      <h3 className="text-2xl font-bold text-slate-900 mb-8">
        Commentaires <span className="text-indigo-500 text-sm ml-2">({comments.length})</span>
      </h3>

      <div className="flex gap-4 mb-10">
        <Avatar size="large" icon={<UserOutlined />} className="bg-indigo-100 text-indigo-600" />
        <div className="flex-1">
          <TextArea
            rows={3}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="Partagez votre avis sur cet article..."
            className="rounded-xl border-slate-200 hover:border-indigo-400 focus:border-indigo-500 shadow-sm"
          />
          <div className="flex justify-end mt-3">
            <Button
              htmlType="submit"
              loading={submitting}
              onClick={handleSubmit}
              type="primary"
              icon={<SendOutlined />}
              className="bg-indigo-600 rounded-lg h-10 px-6"
            >
              Publier
            </Button>
          </div>
        </div>
      </div>

      <Divider className="border-slate-100" />

      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={comments}
        locale={{ emptyText: "Soyez le premier à commenter cet article !" }}
        renderItem={(item) => (
          <li className="mb-6 list-none">
            <div className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <Avatar icon={<UserOutlined />} className="bg-slate-200" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800">Utilisateur</span>
                  <span className="text-xs text-slate-400 italic">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{item.content}</p>
              </div>
            </div>
          </li>
        )}
      />
    </div>
  );
}