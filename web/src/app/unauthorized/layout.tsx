'use client';

import React from 'react';

export default function UnauthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] antialiased selection:bg-indigo-100 selection:text-indigo-900">
      <div className="relative flex min-h-screen flex-col">
        <header className="absolute top-0 left-0 w-full p-8 z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-2 group cursor-default">
            <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-sm group-hover:bg-indigo-600 transition-colors duration-300">
              T
            </div>
            <span className="text-lg font-bold tracking-tighter text-slate-900">
              TechPulse
            </span>
          </div>
        </header>

        <div className="flex-1">
          {children}
        </div>

        <footer className="absolute bottom-0 w-full p-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                Sécurité Système • Accès Refusé
            </p>
        </footer>
      </div>
    </div>
  );
}