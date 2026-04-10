import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Tech Pulse | L'actualité Tech & IA en temps réel",
    template: "%s | Tech Pulse"
  },
  description: "Découvrez les dernières innovations en Intelligence Artificielle, développement web et nouvelles technologies sur Tech Pulse.",
  keywords: ["Tech", "IA", "Actualités", "Développement Web", "Innovation", "Tech Pulse"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-500 selection:text-white`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}