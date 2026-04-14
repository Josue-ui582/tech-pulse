export const Footer = () => (
  <footer className="border-t border-slate-200 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10">
        <div className="max-w-xs">
          <div className="text-2xl font-bold mb-4">TechPulse</div>
          <p className="text-slate-500 text-sm leading-relaxed">
            La plateforme préférée des développeurs pour rester à jour sans perdre de temps.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div>
            <h4 className="font-bold mb-4">Produit</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li>News</li>
              <li>Newsletter</li>
              <li>API</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Société</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li>À propos</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
        © {new Date().getFullYear()} TechPulse Inc. Design épuré pour esprits brillants.
      </div>
    </div>
  </footer>
);