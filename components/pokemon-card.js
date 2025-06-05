"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

function getTypeColor(type) {
  const colors = {
    normal: "from-gray-400 to-gray-500",
    fire: "from-red-400 to-orange-500",
    water: "from-blue-400 to-blue-600",
    electric: "from-yellow-300 to-yellow-500",
    grass: "from-green-400 to-green-600",
    ice: "from-blue-200 to-blue-400",
    fighting: "from-red-600 to-red-800",
    poison: "from-purple-400 to-purple-600",
    ground: "from-yellow-600 to-amber-700",
    flying: "from-indigo-300 to-indigo-500",
    psychic: "from-pink-400 to-pink-600",
    bug: "from-lime-400 to-green-500",
    rock: "from-yellow-700 to-amber-800",
    ghost: "from-purple-600 to-purple-800",
    dragon: "from-indigo-600 to-purple-700",
    dark: "from-gray-700 to-gray-900",
    steel: "from-gray-400 to-gray-600",
    fairy: "from-pink-300 to-pink-500",
  }
  return colors[type] || "from-gray-400 to-gray-500"
}

function getTypeTextColor(type) {
  const darkTextTypes = ["electric", "ice", "fairy"]
  return darkTextTypes.includes(type) ? "text-gray-800" : "text-white"
}

export default function PokemonCard({ pokemon }) {
  const [pokemonDetail, setPokemonDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    async function fetchPokemonDetail() {
      try {
        const response = await fetch(pokemon.url)
        const data = await response.json()
        setPokemonDetail(data)
      } catch (error) {
        console.error("Error fetching Pokemon detail:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonDetail()
  }, [pokemon.url])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="bg-gray-100 p-6">
          <div className="bg-gray-200 w-full h-32 rounded-lg animate-pulse"></div>
        </div>
        <div className="p-6 pt-4">
          <div className="bg-gray-200 h-6 w-3/4 mb-3 rounded animate-pulse"></div>
          <div className="flex gap-2 mb-3">
            <div className="bg-gray-200 h-6 w-16 rounded-full animate-pulse"></div>
            <div className="bg-gray-200 h-6 w-16 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="bg-gray-200 h-3 w-full rounded animate-pulse"></div>
            <div className="bg-gray-200 h-3 w-full rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!pokemonDetail) {
    return null
  }

  const mainImage =
    pokemonDetail.sprites.other["official-artwork"]?.front_default ||
    pokemonDetail.sprites.other.dream_world?.front_default ||
    pokemonDetail.sprites.front_default

  return (
    <Link href={`/pokemon/${pokemonDetail.id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
        {/* Pokemon Image Section */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-300">
          <div className="absolute top-2 right-2 text-xs font-bold text-gray-400">
            #{pokemonDetail.id.toString().padStart(3, "0")}
          </div>
          <div className="relative w-32 h-32 mx-auto">
            {!imageError ? (
              <Image
                src={mainImage || "/placeholder.svg?height=128&width=128"}
                alt={pokemonDetail.name}
                fill
                className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Pokemon Info Section */}
        <div className="p-6 pt-4">
          <h3 className="font-bold text-xl capitalize mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {pokemonDetail.name}
          </h3>

          <div className="flex gap-2 flex-wrap mb-3">
            {pokemonDetail.types.map((type) => (
              <span
                key={type.type.name}
                className={`bg-gradient-to-r ${getTypeColor(type.type.name)} ${getTypeTextColor(type.type.name)} px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-md`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Height:</span>
              <span className="font-semibold">{(pokemonDetail.height / 10).toFixed(1)}m</span>
            </div>
            <div className="flex justify-between">
              <span>Weight:</span>
              <span className="font-semibold">{(pokemonDetail.weight / 10).toFixed(1)}kg</span>
            </div>
          </div>

          {/* Hover indicator */}
          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
              Click to view details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}