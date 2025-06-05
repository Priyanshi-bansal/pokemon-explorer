"use client"

import { useState, useMemo, useEffect } from "react"
import PokemonCard from "./pokemon-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PokemonList({ initialPokemon }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 20

  const filteredPokemon = useMemo(() => {
    return initialPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [initialPokemon, searchTerm])

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Calculate pagination values
  const totalItems = filteredPokemon.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems)
  const currentItems = filteredPokemon.slice(startIndex, endIndex)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5 // Show at most 5 page numbers

    if (totalPages <= maxPagesToShow) {
      // If we have 5 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first page
      pageNumbers.push(1)

      // Calculate start and end of page numbers to show
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = 4
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pageNumbers.push("...")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pageNumbers.push("...")
      }

      // Always include last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  // Handle page change
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // Scroll to top of the list
      window.scrollTo({
        top: document.getElementById("pokemon-grid").offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  // Listen for search updates from the search bar
  useEffect(() => {
    const handleSearch = (event) => {
      setSearchTerm(event.detail.searchTerm)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("pokemonSearch", handleSearch)
      return () => window.removeEventListener("pokemonSearch", handleSearch)
    }
  }, [])

  return (
    <div>
      {searchTerm && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {filteredPokemon.length > 0
              ? `Found ${filteredPokemon.length} Pokémon matching "${searchTerm}"`
              : `No Pokémon found matching "${searchTerm}"`}
          </p>
        </div>
      )}

      {filteredPokemon.length === 0 && searchTerm ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Pokémon Found</h3>
          <p className="text-gray-600 mb-6">
            We could not find any Pokémon matching {searchTerm}. Try searching for a different name! 
          </p>
          <div className="text-sm text-gray-500">
            <p>💡 Try searching for: Pikachu, Charizard, Blastoise, Venusaur...</p>
          </div>
        </div>
      ) : (
        <>
          <div
            id="pokemon-grid"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {currentItems.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center">
              <div className="text-sm text-gray-600 mb-4">
                Showing {startIndex + 1}-{endIndex} of {totalItems} Pokémon
              </div>
              <div className="flex items-center space-x-2">
                {/* Previous Page Button */}
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  } border shadow-sm transition-colors duration-200`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <div key={index}>
                      {page === "..." ? (
                        <span className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
                      ) : (
                        <button
                          onClick={() => changePage(page)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentPage === page
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-md"
                              : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border"
                          } transition-colors duration-200`}
                          aria-label={`Page ${page}`}
                          aria-current={currentPage === page ? "page" : undefined}
                        >
                          {page}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Next Page Button */}
                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  } border shadow-sm transition-colors duration-200`}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Jump to page (for many pages) */}
              {totalPages > 10 && (
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Jump to page:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value)
                      if (!isNaN(value)) {
                        changePage(Math.min(Math.max(1, value), totalPages))
                      }
                    }}
                    className="w-16 h-8 border rounded-md text-center text-sm"
                  />
                  <span className="text-sm text-gray-600">of {totalPages}</span>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}