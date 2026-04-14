import { previw } from "@/data/preview";

export const Features = () => (
  <section id="features" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {previw.map((item, i) => (
          <div key={i} className="group p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all">
            <div className="text-4xl mb-6">{item.icon}</div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);