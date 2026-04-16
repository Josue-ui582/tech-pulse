"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import { SunOutlined, MoonOutlined} from "@ant-design/icons"

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [buttonText, setButtonText] = useState("Accéder à mon compte");
  const {setTheme, resolvedTheme }= useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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

  if(!mounted) return null;

  return(
    <nav className="fixed top-0 w-full z-50 dark:border-slate-800 dark:bg-slate-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.replace("/")}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            TP
          </div>
          <span className="text-xl font-bold tracking-tight dark:text-white">TechPulse</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <Link href="/features" className="hover:text-indigo-600 dark:hover:text-indigo-400">Fonctionnalités</Link>
          <Link href="/news" className="hover:text-indigo-600 dark:hover:text-indigo-400">Actualités</Link>
          <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">À propos</Link>
          <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</Link>
        </div>

        <div className='flex justify-center items-center gap-4'>
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            {resolvedTheme === 'dark' ? (
              <div className="cursor-pointer border rounded-full border-gray-400 text-lg p-1"><SunOutlined /></div>
                ) : (
              <div className="cursor-pointer border text-black rounded-full border-gray-400 text-lg p-1"><MoonOutlined /></div>
            )}
          </button>
          <button 
            className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm cursor-pointer" 
            onClick={handleClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </nav>
  )
};