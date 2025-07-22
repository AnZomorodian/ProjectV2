import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import FormulaCard from './components/FormulaCard';
import Calculator from './components/Calculator';
import FilterBar from './components/FilterBar';
import CalculationHistory from './components/CalculationHistory';
import StatsPanel from './components/StatsPanel';
import QuickActions from './components/QuickActions';
import UnitConverter from './components/UnitConverter';
import FormulaBuilder from './components/FormulaBuilder';
import Footer from './components/Footer';
import HelpModal from './components/HelpModal';
import { Formula, Calculation } from './types/formula';
import { formulas, disciplines, categories, difficulties } from './data/formulas';
import { Search, Zap, ArrowRightLeft, Code, BarChart3 } from 'lucide-react';

function App() {
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentView, setCurrentView] = useState<'formulas' | 'history' | 'stats' | 'converter' | 'builder'>('formulas');
  const [customFormulas, setCustomFormulas] = useState<Formula[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Combine built-in and custom formulas
  const allFormulas = [...formulas, ...customFormulas];

  const filteredFormulas = useMemo(() => {
    return allFormulas.filter(formula => {
      const matchesSearch = formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           formula.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           formula.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDiscipline = selectedDiscipline === 'All' || formula.discipline === selectedDiscipline;
      const matchesCategory = selectedCategory === 'All' || formula.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || formula.difficulty === selectedDifficulty;
      const matchesFavorites = !showFavoritesOnly || favorites.has(formula.id);
      
      return matchesSearch && matchesDiscipline && matchesCategory && matchesDifficulty && matchesFavorites;
    });
  }, [searchTerm, selectedDiscipline, selectedCategory, selectedDifficulty, showFavoritesOnly, favorites, allFormulas]);

  const handleCalculate = (formula: Formula) => {
    setSelectedFormula(formula);
  };

  const handleSaveCalculation = (calculation: Omit<Calculation, 'id' | 'timestamp'>) => {
    const newCalculation: Calculation = {
      ...calculation,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setCalculations(prev => [newCalculation, ...prev]);
  };

  const handleToggleFavorite = (formulaId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(formulaId)) {
        newFavorites.delete(formulaId);
      } else {
        newFavorites.add(formulaId);
      }
      return newFavorites;
    });
  };

  const handleClearHistory = () => {
    setCalculations([]);
  };

  const handleSaveCustomFormula = (formula: Formula) => {
    setCustomFormulas(prev => [...prev, formula]);
  };

  const handleShowHelp = () => {
    setShowHelpModal(true);
  };

  const handleExportData = () => {
    const data = {
      calculations,
      favorites: Array.from(favorites),
      customFormulas,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `engineering_calculator_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
        }}
      />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
            {[
              { id: 'formulas', label: 'Formulas', icon: Search },
              { id: 'history', label: 'History', icon: Zap },
              { id: 'stats', label: 'Analytics', icon: BarChart3 },
              { id: 'converter', label: 'Unit Converter', icon: ArrowRightLeft },
              { id: 'builder', label: 'Formula Builder', icon: Code }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                  currentView === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions
          onShowHelp={handleShowHelp}
          onExportData={handleExportData}
          onShowSettings={() => {}}
        />

        {/* Content based on current view */}
        {currentView === 'formulas' && (
          <>
            <FilterBar
              searchTerm={searchTerm}
              selectedDiscipline={selectedDiscipline}
              selectedCategory={selectedCategory}
              selectedDifficulty={selectedDifficulty}
              disciplines={disciplines}
              categories={categories}
              difficulties={difficulties}
              showFavoritesOnly={showFavoritesOnly}
              onSearchChange={setSearchTerm}
              onDisciplineChange={setSelectedDiscipline}
              onCategoryChange={setSelectedCategory}
              onDifficultyChange={setSelectedDifficulty}
              onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
              totalFormulas={allFormulas.length}
              filteredCount={filteredFormulas.length}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Engineering Formulas
                  <span className="ml-2 text-lg font-normal text-gray-600">
                    ({filteredFormulas.length} of {allFormulas.length})
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormulas.map((formula, index) => {
                  const usageCount = calculations.filter(c => c.formulaId === formula.id).length;
                  const lastUsed = calculations.find(c => c.formulaId === formula.id)?.timestamp;
                  const isPopular = usageCount >= 3;
                  
                  return (
                  <FormulaCard
                    key={formula.id}
                    formula={formula}
                    onCalculate={handleCalculate}
                    isFavorite={favorites.has(formula.id)}
                    onToggleFavorite={handleToggleFavorite}
                    index={index}
                    usageCount={usageCount}
                    lastUsed={lastUsed}
                    isPopular={isPopular}
                  />
                  );
                })}
              </div>

              {filteredFormulas.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No formulas found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedDiscipline('All');
                      setSelectedCategory('All');
                      setSelectedDifficulty('All');
                      setShowFavoritesOnly(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}

        {currentView === 'history' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <CalculationHistory
              calculations={calculations}
              onClearHistory={handleClearHistory}
            />
          </motion.div>
        )}

        {currentView === 'stats' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <StatsPanel
              calculations={calculations}
              totalFormulas={allFormulas.length}
            />
          </motion.div>
        )}

        {currentView === 'converter' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <UnitConverter />
          </motion.div>
        )}

        {currentView === 'builder' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FormulaBuilder onSaveFormula={handleSaveCustomFormula} />
          </motion.div>
        )}
      </main>

      <Footer />

      <Calculator
        formula={selectedFormula}
        onClose={() => setSelectedFormula(null)}
        onSaveCalculation={handleSaveCalculation}
      />

      <HelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  );
}

export default App;