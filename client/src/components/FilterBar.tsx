import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sliders, Star } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  selectedDiscipline: string;
  selectedCategory: string;
  selectedDifficulty: string;
  disciplines: string[];
  categories: string[];
  difficulties: string[];
  showFavoritesOnly: boolean;
  onSearchChange: (term: string) => void;
  onDisciplineChange: (discipline: string) => void;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onToggleFavorites: () => void;
  totalFormulas: number;
  filteredCount: number;
}

export default function FilterBar({
  searchTerm,
  selectedDiscipline,
  selectedCategory,
  selectedDifficulty,
  disciplines,
  categories,
  difficulties,
  showFavoritesOnly,
  onSearchChange,
  onDisciplineChange,
  onCategoryChange,
  onDifficultyChange,
  onToggleFavorites,
  totalFormulas,
  filteredCount
}: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Filter className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Filter & Search</h2>
            <p className="text-sm text-gray-600">
              Showing {filteredCount} of {totalFormulas} formulas
            </p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleFavorites}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
            showFavoritesOnly
              ? 'bg-orange-100 text-orange-800 border-2 border-orange-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
          }`}
        >
          <Star className={`h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
          <span>{showFavoritesOnly ? 'Show All' : 'Favorites Only'}</span>
        </motion.button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search formulas, descriptions..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        
        {/* Discipline Filter */}
        <div className="relative">
          <Sliders className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedDiscipline}
            onChange={(e) => onDisciplineChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
          >
            {disciplines.map(discipline => (
              <option key={discipline} value={discipline}>
                {discipline === 'All' ? 'All Disciplines' : discipline}
              </option>
            ))}
          </select>
        </div>
        
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'All' ? 'All Categories' : category}
            </option>
          ))}
        </select>
        
        {/* Difficulty Filter */}
        <select
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
        >
          {difficulties.map(difficulty => (
            <option key={difficulty} value={difficulty}>
              {difficulty === 'All' ? 'All Difficulties' : difficulty}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedDiscipline !== 'All' || selectedCategory !== 'All' || selectedDifficulty !== 'All' || showFavoritesOnly) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 font-medium">Active filters:</span>
            {searchTerm && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedDiscipline !== 'All' && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {selectedDiscipline}
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {selectedCategory}
              </span>
            )}
            {selectedDifficulty !== 'All' && (
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                {selectedDifficulty}
              </span>
            )}
            {showFavoritesOnly && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Favorites Only
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}