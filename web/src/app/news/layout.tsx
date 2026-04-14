import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Tech Pulse | Actualités Tech",
    template: "%s | Tech Pulse"
  },
  description: "Restez informé des dernières actualités tech et de l'innovation en temps réel sur Tech Pulse.",
  keywords: ["actualités tech", "innovation", "technologie", "Tech Pulse"],
  authors: [{ name: "Tech Pulse Team" }],
  creator: "Tech Pulse",
  
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://techpulse.com",
    siteName: "Tech Pulse",
    title: "Tech Pulse - Le coeur de l'innovation technologique",
    description: "Le portail de référence pour rester à la pointe de la technologie.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tech Pulse Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Pulse | Actualités Tech",
    description: "L'essentiel de l'innovation tech condensé pour vous.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}