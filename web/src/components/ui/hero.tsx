export const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(50%_50%_at_50%_10%,rgba(79,70,229,0.05)_0%,transparent_100%)] -z-10" />
    
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        Le futur de la tech est ici
      </div>
      <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight mb-8">
        L'info tech, <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-500">sans le bruit.</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
        Une curation quotidienne des meilleures actualités tech, IA et développement, présentée dans un design ultra-minimaliste.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-indigo-200 transition-all transform hover:-translate-y-1">
          Commencer la lecture
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
          Voir les catégories
        </button>
      </div>
    </div>
  </section>
);
