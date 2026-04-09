"use client"

import { logOutUser } from '@/services/api';
import { getUser } from '@/utils/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [buttonText, setButtonText] = useState("Accéder à mon compte");

  const switchButton = async () => {
    switch (pathname) {
      case "/":
        const checkAuth = await getUser();
        setButtonText(checkAuth ? "Déconnexion" : "Accéder à mon compte");
        break;
      case "/news":
        setButtonText("Déconnexion");
        break;
      case "/contact":
      case "/about":
        const checkAuths = await getUser();
        setButtonText(checkAuths ? "Déconnexion" : "Accéder à mon compte");
        break;
      default:
        setButtonText("Accéder à mon compte");
        break;
    }
  };

  useEffect(() => {
    switchButton();
  }, [pathname]);

  const handleClick = async () => {
    switch (pathname) {
      case "/":
       const checkAuth = await getUser();
        if (checkAuth) {
          logOutUser();
        }
        router.replace("/auth");
        break;
      case "/news":
        logOutUser();
        router.replace("/auth");
        break;
      case "/contact":
      case "/about":
        const checkAuths = await getUser();
        if (checkAuths) {
          logOutUser();
        }
        router.replace("/auth");
        break;
      default:
        router.replace("/auth");
        break;
    }
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