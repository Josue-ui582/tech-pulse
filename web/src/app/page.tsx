import { SearchBar } from "../features/search/components/SearchBar";

export const revalidate = 60;

export default async function HomePage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
          L'actualité Tech, <span className="text-blue-600">réinventée.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Découvrez les dernières innovations avec une expérience de lecture fluide et minimaliste.
        </p>
      </section>

      <div className="mb-10">
        <SearchBar /> 
      </div>
    </main>
  );
}
