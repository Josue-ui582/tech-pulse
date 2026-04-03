import { GlobalOutlined, SafetyCertificateOutlined, RocketOutlined } from "@ant-design/icons";

export const previw = [
    { 
        title: "Curation IA", 
        desc: "Nos algorithmes filtrent l'essentiel pour vous éviter la surcharge d'info.", 
        icon: "🤖" 
    },
    { 
        title: "Expérience Zen", 
        desc: "Zéro publicité, zéro pop-up. Juste du contenu pur et une typographie soignée.", 
        icon: "✨" 
    },
    { 
        title: "Temps réel", 
        desc: "Soyez alerté des dernières sorties majeures en moins de 5 minutes.", 
        icon: "⚡" 
    }
];

export const featuredNews = [
  { 
    id: 1, 
    title: "L'ascension de l'IA générative", 
    category: "AI", 
    date: "2 min ago",
    image: "/ai.avif" 
  },
  { 
    id: 2, 
    title: "React 19 : Ce qu'il faut savoir", 
    category: "Dev", 
    date: "1 hour ago",
    image: "/react.avif"
  },
  { 
    id: 3, 
    title: "Le futur des interfaces spatiales", 
    category: "Tech", 
    date: "3 hours ago",
    image: "/tech.avif"
  },
];

export const aboutPreview = [
  { 
    icon: <GlobalOutlined />,
    title: "Portée Mondiale", 
    desc: "Couverture instantanée des événements aux quatre coins du globe." 
  },
  { 
    icon: <SafetyCertificateOutlined />, 
    title: "Vérification", 
    desc: "Chaque information est sourcée et vérifiée avant publication." 
  },
  { 
    icon: <RocketOutlined />, 
    title: "Innovation", 
    desc: "Une expérience utilisateur pensée pour la lecture numérique moderne." 
  }
]