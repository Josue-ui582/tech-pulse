"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [buttonText, setButtonText] = useState("Accéder à mon compte");

  useEffect(() => {
    if (pathname === "/news") {
      setButtonText("Déconnexion");
      return;
    }

    setButtonText(user ? "Déconnexion" : "Accéder à mon compte");
  }, [pathname, user]);

  const handleClick = async () => {
    if (user) {
      await logout();
    }
    router.replace("/auth");
  };

  return(
    <nav className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.replace("/")}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            Tech Pulse
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">TechPulse</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/features">Fonctionnalités</Link>
          <Link href="/news">Actualités</Link>
          <Link href="/about">À propos</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <button 
          className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm cursor-pointer" 
          onClick={handleClick}
        >
          {buttonText}
        </button>

      </div>
    </nav>
  )
};