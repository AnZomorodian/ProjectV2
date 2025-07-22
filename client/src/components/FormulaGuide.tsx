import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Star, TrendingUp, Clock, Filter, X, ChevronRight, FileText, Calculator, Lightbulb } from 'lucide-react';
import { Formula } from '../types/formula';
import { formulas, disciplines } from '../data/formulas';

interface FormulaGuideProps {
  onClose: () => void;
  onSelectFormula: (formula: Formula) => void;
}

export default function FormulaGuide({ onClose, onSelectFormula }: FormulaGuideProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredFormulas = formulas.filter(formula => {
    const matchesSearch = formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formula.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiscipline = selectedDiscipline === 'All' || formula.discipline === selectedDiscipline;
    return matchesSearch && matchesDiscipline;
  });

  const popularFormulas = formulas.filter(f => ['stress-formula', 'ohms-law', 'beam-deflection', 'ideal-gas-law'].includes(f.id));
  const recentFormulas = formulas.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex"
      >
        {/* Left Sidebar */}
        <div className="w-80 bg-gray-50 border-r">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6" />
                <h2 className="text-xl font-bold">Formula Guide</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
              <input
                type="text"
                placeholder="Search formulas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discipline</label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="All">All Disciplines</option>
                {disciplines.map(discipline => (
                  <option key={discipline} value={discipline}>{discipline}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="px-4 pb-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              Popular Formulas
            </h3>
            {popularFormulas.slice(0, 3).map(formula => (
              <button
                key={formula.id}
                onClick={() => setSelectedFormula(formula)}
                className="w-full text-left p-2 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900">{formula.name}</div>
                <div className="text-xs text-gray-500">{formula.discipline}</div>
              </button>
            ))}
            
            <h3 className="text-sm font-semibold text-gray-700 flex items-center pt-4">
              <Clock className="h-4 w-4 mr-2 text-blue-500" />
              Recently Added
            </h3>
            {recentFormulas.slice(0, 3).map(formula => (
              <button
                key={formula.id}
                onClick={() => setSelectedFormula(formula)}
                className="w-full text-left p-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900">{formula.name}</div>
                <div className="text-xs text-gray-500">{formula.discipline}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedFormula ? (
            /* Formula Detail View */
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setSelectedFormula(null)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  <span>Back to formulas</span>
                </button>
                <button
                  onClick={() => onSelectFormula(selectedFormula)}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Use Formula</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Formula Header */}
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedFormula.difficulty === 'Basic' ? 'bg-green-100 text-green-800' :
                      selectedFormula.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedFormula.difficulty}
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {selectedFormula.discipline}
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedFormula.name}</h1>
                  <p className="text-lg text-gray-600">{selectedFormula.description}</p>
                </div>

                {/* Formula */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                    Formula
                  </h3>
                  <div className="text-2xl font-mono bg-white p-4 rounded-lg border-2 border-indigo-200 text-center">
                    {selectedFormula.formula}
                  </div>
                </div>

                {/* Variables */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Variables
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedFormula.variables.map((variable, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-lg font-bold text-indigo-600">{variable.symbol}</span>
                          <span className="text-sm text-gray-500">{variable.unit}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{variable.name}</div>
                        {variable.description && (
                          <div className="text-xs text-gray-600 mt-1">{variable.description}</div>
                        )}
                        {(variable.min !== undefined || variable.max !== undefined) && (
                          <div className="text-xs text-gray-500 mt-1">
                            Range: {variable.min ?? '−∞'} to {variable.max ?? '∞'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                {selectedFormula.examples && selectedFormula.examples.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                      Examples
                    </h3>
                    <div className="space-y-4">
                      {selectedFormula.examples.map((example, index) => (
                        <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{example.title}</h4>
                          <p className="text-sm text-gray-700 mb-3">{example.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="font-medium text-gray-700 mb-1">Inputs:</div>
                              {Object.entries(example.inputs).map(([key, value]) => (
                                <div key={key} className="text-gray-600">{key} = {value}</div>
                              ))}
                            </div>
                            <div>
                              <div className="font-medium text-gray-700 mb-1">Expected Result:</div>
                              <div className="text-gray-600 font-mono">{example.expectedResult}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* References */}
                {selectedFormula.references && selectedFormula.references.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">References</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedFormula.references.map((ref, index) => (
                        <li key={index} className="text-sm">{ref}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFormula.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Formula List View */
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Browse Formulas ({filteredFormulas.length})
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <div className="grid grid-cols-2 gap-1 w-4 h-4">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <div className="space-y-1 w-4 h-4">
                      <div className="bg-current h-1 rounded"></div>
                      <div className="bg-current h-1 rounded"></div>
                      <div className="bg-current h-1 rounded"></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
                {filteredFormulas.map((formula) => (
                  <motion.div
                    key={formula.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                      viewMode === 'list' ? 'flex items-center justify-between' : ''
                    }`}
                    onClick={() => setSelectedFormula(formula)}
                  >
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          formula.difficulty === 'Basic' ? 'bg-green-100 text-green-800' :
                          formula.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {formula.difficulty}
                        </div>
                        <div className="text-xs text-gray-500">{formula.discipline}</div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{formula.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{formula.description}</p>
                      {viewMode === 'grid' && (
                        <div className="text-xs font-mono bg-gray-50 p-2 rounded">
                          {formula.formula}
                        </div>
                      )}
                    </div>
                    {viewMode === 'list' && (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </motion.div>
                ))}
              </div>

              {filteredFormulas.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No formulas found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or filters</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}