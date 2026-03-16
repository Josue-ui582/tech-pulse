"use client";

import { useState } from "react";
import { News } from "@/src/types/news";
import Card from "antd/es/card/Card";
import { formatDate } from "@/src/utils/formatDate";
import { div } from "framer-motion/client";

const NewsCard = ({ articles }: { articles: News }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card hoverable className="w-75 rounded-xl overflow-hidden">
      <div className="relative w-full pb-[56.25%]">
        <img
          draggable={false}
          alt={articles.title}
          src={
            articles.imageUrl ||
            "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          }
          className="absolute w-full h-full object-cover"
        />
      </div>

      <div className="mt-3">

        <h3 className="text-lg font-bold leading-snug line-clamp-2 mb-2">
          {articles.title}
        </h3>

        <p
          className={`text-sm text-gray-600 mb-2 ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {articles.description}
        </p>

        {articles.description.length > 120 && (
          <div className="flex justify-between">
              <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 text-sm font-medium hover:underline mb-2"
            >
              {expanded ? "Voir moins" : "Voir plus"}
            </button>
            <h4 className="text-sm font-semibold">{articles.category}</h4>
          </div>
        )}

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{formatDate(articles.publishedAt)}</span>
          <span>👁 {articles.viewsCount}</span>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;