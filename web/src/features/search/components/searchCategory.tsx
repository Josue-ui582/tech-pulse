"use client"

import { useSearchParams, useRouter } from 'next/navigation';

const filtre = ["Tech", "AI", "Dev"];

export const SearchCategory = () => {
    const router = useRouter();
    const params = useSearchParams();
    const currentCategory = params.get("category");

    const handleChange = (category: string) => {
        const query = new URLSearchParams(params.toString());
        query.set("category", category);
        router.push(`/?${query.toString()}`);
    }

    const getStyle = (f: string) => {
    const isActive = currentCategory === f;
    if (isActive) {
      switch (f) {
        case "Tech": return "bg-rose-100 text-rose-700 border-rose-200 shadow-sm";
        case "AI": return "bg-amber-100 text-amber-700 border-amber-200 shadow-sm";
        default: return "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm";
      }
    }
    return "bg-transparent text-slate-500 hover:bg-slate-100 border-transparent";
  };
    return (
        <div className="inline-flex items-center p-1.5 bg-slate-50 border border-slate-200 rounded-2xl gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 hidden sm:block">
                Catégorie
            </span>

            <div className="flex items-center gap-1">
                {filtre.map((f) => (
                <button
                    key={f}
                    onClick={() => handleChange(f)}
                    className={`
                    relative px-4 py-2 rounded-xl text-xs font-bold capitalize 
                    transition-all duration-200 ease-out border
                    flex items-center gap-2 cursor-pointer
                    ${getStyle(f)}
                    `}
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                    f === "high" ? "bg-rose-500" : f === "medium" ? "bg-amber-500" : "bg-emerald-500"
                    }`} />
                    
                    {f}

                    {currentCategory === f && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-current rounded-full opacity-50" />
                    )}
                </button>
                ))}
            </div>

            {currentCategory && (
                <button 
                onClick={() => router.push('/')}
                className="ml-1 p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                title="Effacer le filtre"
                >
                X
                </button>
            )}
        </div>
    )
}