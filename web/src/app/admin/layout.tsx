import AdminLayoutClient from "@/components/layout/AdminLayoutClient";


export const metadata = {
  title: "Admin Dashboard | Tech Pulse",
  description: "Gérez les utilisateurs, les paramètres et les rapports de votre application avec notre tableau de bord d'administration intuitif.",
  keywords: ["admin dashboard", "gestion des utilisateurs", "paramètres d'administration", "rapports d'administration", "Tech Pulse"],
  authors: [{ name: "Tech Pulse Team" }],
  creator: "Tech Pulse",
  
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://techpulse.com/admin",
    siteName: "Tech Pulse Admin",
    title: "Admin Dashboard - Tech Pulse",
    description: "Gérez votre application avec notre tableau de bord d'administration puissant et facile à utiliser.",
    images: [
      {
        url: "/admin-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Admin Dashboard Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Pulse | Admin Dashboard",
    description: "Gérez votre application avec notre tableau de bord d'administration puissant et facile à utiliser.",
    images: ["/admin-og-image.jpg"],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}