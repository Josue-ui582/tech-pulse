import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Tech Pulse | Authentification",
    template: "%s | Tech Pulse"
  },
  description: "Créer un compte ou se connecter pour accéder à votre tableau de bord personnalisé sur Tech Pulse ou accéder aux news en temps réel.",
  keywords: ["authentification", "connexion", "inscription", "tableau de bord", "news en temps réel", "Tech Pulse"],
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

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center p-12 text-white">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Bienvenue sur notre plateforme de partage d'actualité Tech</h1>
          <p className="text-lg opacity-80">
            Gérez vos news et vos utilisateurs avec une interface moderne et intuitive.
          </p>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-110">
          {children}
        </div>
      </div>
    </div>
  );
}