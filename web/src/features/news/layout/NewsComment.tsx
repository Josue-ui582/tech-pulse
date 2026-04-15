"use client";

import { useState } from "react";
import { Input, Button, Avatar, message, Divider, Space, Popconfirm } from "antd";
import { UserOutlined, SendOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/formatDate";
import { useAsyncData } from "@/hooks";
import { addComment, deleteComment, getComments, updateComment } from "@/services/api.comments";
import { CommentType } from "@/types/globalTypes";
import { useAuth } from "@/hooks/useAuth";

const { TextArea } = Input;

interface NewsCommentsProps {
  slug: string;
}

export default function NewsComments({ slug }: NewsCommentsProps) {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const { user } = useAuth();
  const { data: comments, refetch, loading } = useAsyncData(
    () => getComments(slug),
    [slug],
    {
      onError: (error) => {
        message.error("Impossible de charger les commentaires");
      }
    }
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleSubmit = async () => {
    if (!value.trim()) return;
    setSubmitting(true);

    try {
      await addComment(slug, value);
      message.success("Commentaire ajouté !");
      setValue("");
      refetch();
    } catch (error: any) {
      message.error(error.message || "Erreur lors de l'envoi");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (commentId: string) => {
  if (!editText.trim()) return;
  
  try {
    await updateComment(commentId, editText);
    message.success("Commentaire mis à jour");
    setEditingId(null);
    refetch();
  } catch (error: any) {
    message.error("Erreur lors de la mise à jour");
  }
};

const handleDelete = async (commentId: string) => {
  try {
    await deleteComment(commentId);
    message.success("Commentaire supprimé");
    refetch();
  } catch (error: any) {
    message.error("Erreur lors de la suppression : " + error.message);
  }
};


  return (
    <div className="mt-12 rounded-4xl p-8 shadow-sm border border-slate-50">
      <h3 className="text-2xl font-bold mb-8">
        Commentaires <span className="text-sm ml-2">
          ({comments?.length || 0})
        </span>
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
              className="rounded-lg h-10 px-6"
            >
              Publier
            </Button>
          </div>
        </div>
      </div>

      <Divider className="border-slate-100" />

      <div className="space-y-6">
        {comments && comments.length > 0 ? (
          comments.map((item: CommentType) => (
            <div key={item.id} className="group flex gap-4 p-4 rounded-2xl transition-colors">
              <Avatar icon={<UserOutlined />} className="bg-slate-200" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold">{user?.name}</span>
                  
                  <Space size="middle">
                    <span className="text-xs text-slate-400 italic">{formatDate(item.createdAt)}</span>
                    {
                      item.authorId === user?.id &&
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          type="text" 
                          size="small" 
                          icon={<EditOutlined className="text-indigo-5" />} 
                          onClick={() => { setEditingId(item.id); setEditText(item.content); }}
                        />
                        <Popconfirm
                          title="Supprimer le commentaire ?"
                          description="Cette action est irréversible."
                          onConfirm={() => handleDelete(item.id)}
                          okText="Supprimer"
                          cancelText="Annuler"
                          okButtonProps={{ danger: true }}
                        >
                          <Button type="text" size="small" icon={<DeleteOutlined className="text-rose-500" />} />
                        </Popconfirm>
                      </div>
                    }
                  </Space>
                </div>

                {editingId === item.id && item.authorId === user?.id ? (
                  <div className="mt-2">
                    <TextArea 
                      value={editText} 
                      onChange={(e) => setEditText(e.target.value)}
                      autoSize
                      className="rounded-lg mb-2"
                    />
                    <Space>
                      <Button size="small" type="primary" onClick={() => handleUpdate(item.id)}>Sauvegarder</Button>
                      <Button size="small" onClick={() => setEditingId(null)}>Annuler</Button>
                    </Space>
                  </div>
                ) : (
                  <p className="leading-relaxed">{item.content}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-400 italic">
            Soyez le premier à commenter cet article !
          </div>
        )}
      </div>
    </div>
  );
}