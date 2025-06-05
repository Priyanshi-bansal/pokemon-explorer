import { Suspense } from "react";
import PokemonList from "@/components/pokemon-list";
import SearchBar from "@/components/search-bar";

async function getPokemonList() {
  try {
    // Get all available Pokemon (increased limit to get more Pokemon)
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1000",
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon list");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return [];
  }
}

export default async function HomePage() {
  const pokemonList = await getPokemonList();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Pokémon Explorer
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover and explore your favorite Pokémon
          </p>
          <SearchBar />
        </div>

        <PokemonList initialPokemon={pokemonList} />
      </div>
    </div>
  );
}
