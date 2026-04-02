'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-[#FAFAFA] overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100 rounded-full blur-[120px] opacity-60" />

      <div className="relative z-10 max-w-2xl px-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-indigo-100/50 mb-10 rotate-3 group hover:rotate-0 transition-transform duration-500">
          <span className="text-4xl">🔐</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
          Accès <span className="text-indigo-600">restreint.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-md mx-auto leading-relaxed">
          Il semblerait que vous n'ayez pas les privilèges nécessaires pour accéder à cette section de <span className="font-bold text-slate-800">TechPulse</span>.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => router.back()}
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer"
          >
            Retourner en arrière
          </button>
          
          <Link 
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 cursor-pointer"
          >
            Accueil TechPulse
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200/60">
          <p className="text-sm text-slate-400">
            Vous pensez qu'il s'agit d'une erreur ? <br />
            Contactez votre administrateur ou <a href="mailto:support@techpulse.com" className="text-indigo-500 font-semibold hover:underline">notre support</a>.
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none">
        <span className="text-[15vw] font-black text-slate-200/20 leading-none">403</span>
      </div>
    </main>
  );
}