import { handleReaction } from "@/services/api.reactions";
import { NewsReactionsProps } from "@/types/globalTypes";
import { useState } from "react";
import { Button, Space, message } from "antd";
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from "@ant-design/icons";


export default function NewsReactions({ newsId, initialLikes, initialUnlikes, userHasLiked, userHasUnliked }: NewsReactionsProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [unLikes, setUnlikes] = useState(initialUnlikes);
    const [myReaction, setMyReaction] = useState<"Like" | "Unlike" | null>(
        userHasLiked ? "Like" : userHasUnliked ? "Unlike" : null
    );

    const onReact = async (type: "Like" | "Unlike") => {
        try {
            await handleReaction(newsId, type);
            if (myReaction === type) {
                setMyReaction(null);
                type === "Like" ? setLikes(likes - 1) : setUnlikes(unLikes - 1);
            }else{
                if (myReaction !== null) {
                    myReaction === "Like" ? setLikes(likes - 1) : setUnlikes(unLikes - 1)
                }
                setMyReaction(type);
                type === "Like" ? setLikes(likes + 1) : setUnlikes(unLikes + 1);
            }
        } catch (error) {
            message.error("Veuillez vous connecter pour réagir");
        }
    }

    return (
        <div className="flex justify-center my-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <Space size="large">
                <Space>
                    <Button 
                        type="text"
                        shape="circle"
                        size="large"
                        icon={myReaction === "Like" ? <LikeFilled className="text-indigo-600" /> : <LikeOutlined />}
                        onClick={() => onReact("Like")}
                        className="hover:scale-110 transition-transform"
                    />
                    <span className="font-bold text-slate-700">{likes}</span>
                </Space>

                <Space>
                    <Button 
                        type="text"
                        shape="circle"
                        size="large"
                        icon={myReaction === "Unlike" ? <DislikeFilled className="text-rose-500" /> : <DislikeOutlined />}
                        onClick={() => onReact("Unlike")}
                        className="hover:scale-110 transition-transform"
                    />
                    <span className="font-bold text-slate-700">{unLikes}</span>
                </Space>
            </Space>
        </div>
    );
}