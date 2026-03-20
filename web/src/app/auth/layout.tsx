export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center p-12 text-white">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Bienvenue sur notre plateforme de partage d'actualité Tech</h1>
          <p className="text-lg opacity-80">
            Gérez vos news et vos utilisateurs avec une interface moderne et intuitive.
          </p>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-110">
          {children}
        </div>
      </div>
    </div>
  );
}