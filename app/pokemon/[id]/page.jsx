import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

async function getPokemonDetails(id) {
  try {
    const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (!pokemonRes.ok) return null
    
    const pokemon = await pokemonRes.json()
    const speciesRes = await fetch(pokemon.species.url)
    const species = await speciesRes.json()

    return { pokemon, species }
  } catch (error) {
    console.error("Failed to fetch Pokemon details:", error)
    return null
  }
}

function getTypeColor(type) {
  const colors = {
    normal: "bg-gray-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    poison: "bg-purple-500",
    // Add more types as needed
  }
  return colors[type] || "bg-gray-200"
}

export default async function PokemonDetailPage({ params }) {
    const { id } = params
  const data = await getPokemonDetails(id)
  if (!data) notFound()

  const { pokemon, species } = data
  const description = species.flavor_text_entries
    .find(entry => entry.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-2" size={18} />
          Back to Pokedex
        </Link>

        {/* Main card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header with name and ID */}
          <div className="p-4 border-b">
            <h1 className="text-3xl font-bold capitalize">
              {pokemon.name}
              <span className="text-gray-500 ml-2">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
            </h1>
          </div>

          <div className="p-6">
            <div className="md:flex gap-8">
              {/* Left column - Image and description */}
              <div className="md:w-1/2">
                <div className="bg-gray-100 rounded-lg p-4 mb-6 flex justify-center">
                  <Image
                    src={pokemon.sprites.other["official-artwork"].front_default || 
                         pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={300}
                    height={300}
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-700">
                    {description || "No description available"}
                  </p>
                </div>

                {/* Moves section */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">Moves</h2>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.moves.slice(0, 10).map((move, index) => (
                      <span 
                        key={index}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm capitalize"
                      >
                        {move.move.name.replace("-", " ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - Details */}
              <div className="md:w-1/2">
                {/* Basic info */}
                <div className="bg-blue-100 rounded-lg p-4 mb-6">
                  <h2 className="text-xl font-semibold mb-3">Basic Info</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium">Height</h3>
                      <p>{(pokemon.height / 10).toFixed(1)} m</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Weight</h3>
                      <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Abilities</h3>
                      <div className="space-y-1">
                        {pokemon.abilities.map((ability, index) => (
                          <p key={index} className="capitalize">
                            {ability.ability.name.replace("-", " ")}
                            {ability.is_hidden && " (hidden)"}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Base Experience</h3>
                      <p>{pokemon.base_experience || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Types */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Types</h2>
                  <div className="flex gap-2">
                    {pokemon.types.map((type, index) => (
                      <span
                        key={index}
                        className={`${getTypeColor(type.type.name)} text-white px-4 py-1 rounded-full capitalize`}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">Stats</h2>
                  <div className="space-y-3">
                    {pokemon.stats.map((stat, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="capitalize font-medium">
                            {stat.stat.name.replace("-", " ")}
                          </span>
                          <span>{stat.base_stat}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}