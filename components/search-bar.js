"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (value) => {
    setSearchTerm(value)
    // Dispatch custom event to communicate with PokemonList
    window.dispatchEvent(
      new CustomEvent("pokemonSearch", {
        detail: { searchTerm: value },
      }),
    )
  }

  const clearSearch = () => {
    handleSearch("")
  }

  return (
    <div className="relative max-w-lg mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for a Pokémon..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-12 py-4 w-full border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-300"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search suggestions indicator */}
      <div className="absolute top-full left-0 right-0 mt-2 z-10">
        {searchTerm && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Searching for {searchTerm}...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
