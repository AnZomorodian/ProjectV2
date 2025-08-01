import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { SettingsProvider, useSettings } from './context/SettingsContext';
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
import SettingsPage from './components/SettingsPage';
import ShareResults from './components/ShareResults';
import FormulaGuide from './components/FormulaGuide';
import QuickReference from './components/QuickReference';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Documentation from './components/Documentation';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import { Formula, Calculation } from './types/formula';
import { formulas, allFormulas, disciplines, categories, difficulties } from './data/formulas';
import { Search, Zap, ArrowRightLeft, Code, BarChart3, BookOpen, Settings, Share2, User, LogIn } from 'lucide-react';
// @ts-ignore
import userDB from './data/user.js';
// @ts-ignore
import totalDB from './data/total.js';

function AppContent() {
  const { settings } = useSettings();
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentView, setCurrentView] = useState<'formulas' | 'history' | 'stats' | 'converter' | 'builder' | 'guide' | 'quick'>('formulas');
  const [customFormulas, setCustomFormulas] = useState<Formula[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFormulaGuide, setShowFormulaGuide] = useState(false);
  const [showQuickReference, setShowQuickReference] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [calculationToShare, setCalculationToShare] = useState<Calculation | null>(null);
  
  // Authentication states
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Check for existing user on app load
  useEffect(() => {
    const existingUser = userDB.getCurrentUser();
    if (existingUser) {
      setCurrentUser(existingUser);
      setIsFirstVisit(false);
      // Load user's favorites and calculations
      const userStats = userDB.getUserStats();
      if (userStats && existingUser.profile?.favoriteFormulas) {
        setFavorites(new Set(existingUser.profile.favoriteFormulas));
      }
    } else {
      // Show auth modal for first-time visitors
      const hasVisitedBefore = localStorage.getItem('solvix_has_visited');
      if (!hasVisitedBefore) {
        setShowAuthModal(true);
        localStorage.setItem('solvix_has_visited', 'true');
      } else {
        setIsFirstVisit(false);
      }
    }
  }, []);

  // Authentication handlers
  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    setIsFirstVisit(false);
    if (user.profile?.favoriteFormulas) {
      setFavorites(new Set(user.profile.favoriteFormulas));
    }
  };

  const handleSignOut = () => {
    userDB.signOut();
    setCurrentUser(null);
    setFavorites(new Set());
    setCalculations([]);
    totalDB.recordUserActivity(currentUser?.id, 'signout');
  };

  // Combine built-in and custom formulas
  const combinedFormulas = [...allFormulas, ...customFormulas];

  const filteredFormulas = useMemo(() => {
    return combinedFormulas.filter(formula => {
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
    
    // Save to user database if logged in
    if (currentUser) {
      userDB.addCalculation(newCalculation);
      totalDB.recordCalculation(calculation.formulaId, calculation.formulaName, currentUser.id);
    } else {
      totalDB.recordCalculation(calculation.formulaId, calculation.formulaName);
    }
  };

  const handleToggleFavorite = (formulaId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(formulaId)) {
        newFavorites.delete(formulaId);
      } else {
        newFavorites.add(formulaId);
      }
      
      // Save to user database if logged in
      if (currentUser) {
        userDB.toggleFavoriteFormula(formulaId);
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

  const handleShowSettings = () => {
    setShowSettingsModal(true);
  };

  const handleShareCalculation = (calculation: Calculation) => {
    setCalculationToShare(calculation);
    setShowShareModal(true);
  };

  const handleShowFormulaGuide = () => {
    setShowFormulaGuide(true);
  };

  const handleShowQuickReference = () => {
    setShowQuickReference(true);
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
    <div className="min-h-screen gradient-mesh relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 animated-mesh opacity-20"></div>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="floating-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: 'var(--primary-color)',
            animationDelay: `${Math.random() * 4}s`
          }}
        />
      ))}
      
      {/* Glowing orbs */}
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>
      <div className="glow-orb glow-orb-3"></div>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: 'var(--border-radius)',
            padding: '16px',
          },
        }}
      />
      <div className="relative z-10">
        <Header 
          onLogoClick={() => {
            // Close all modals when logo is clicked
            setShowHelpModal(false);
            setShowSettingsModal(false);
            setShowShareModal(false);
            setShowFormulaGuide(false);
            setShowQuickReference(false);
            setShowPrivacyPolicy(false);
            setShowTermsOfService(false);
            setShowDocumentation(false);
            // Return to formulas view
            setCurrentView('formulas');
          }}
          currentUser={currentUser}
          onShowAuth={() => setShowAuthModal(true)}
          onSignOut={handleSignOut}
          onShowProfile={() => setShowUserProfile(true)}
        />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Navigation Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="glass-card rounded-2xl p-2 shadow-xl border border-white/20 card-shadow overflow-x-auto hover-lift">
            <div className="flex items-center space-x-1 min-w-fit">
              {[
                { id: 'formulas', label: 'Formulas', icon: Search, color: 'from-blue-500 to-blue-600' },
                { id: 'history', label: 'History', icon: Zap, color: 'from-yellow-500 to-orange-500' },
                { id: 'stats', label: 'Analytics', icon: BarChart3, color: 'from-green-500 to-emerald-500' },
                { id: 'converter', label: 'Unit Converter', icon: ArrowRightLeft, color: 'from-purple-500 to-violet-500' },
                { id: 'builder', label: 'Formula Builder', icon: Code, color: 'from-red-500 to-pink-500' },
                { id: 'guide', label: 'Guide', icon: BookOpen, color: 'from-cyan-500 to-blue-500' },
                { id: 'quick', label: 'Quick Ref', icon: Settings, color: 'from-indigo-500 to-purple-500' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentView(tab.id as any);
                    // Close all modals when switching tabs
                    setShowHelpModal(false);
                    setShowSettingsModal(false);
                    setShowShareModal(false);
                    setShowFormulaGuide(false);
                    setShowQuickReference(false);
                    setShowPrivacyPolicy(false);
                    setShowTermsOfService(false);
                    setShowDocumentation(false);
                  }}
                  className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 group overflow-hidden ripple hover-lift ${
                    currentView === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105 text-glow`
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-md'
                  }`}
                >
                  {currentView === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"></div>
                  )}
                  <tab.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                    currentView === tab.id ? 'drop-shadow-sm' : ''
                  }`} />
                  <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                  {currentView === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions
          onShowHelp={handleShowHelp}
          onExportData={handleExportData}
          onShowSettings={handleShowSettings}
        />

        {/* Content based on current view */}
        {currentView === 'formulas' && (
          <>
            {!currentUser ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 glass-card rounded-2xl"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Access to professional engineering formulas requires a user account. Please sign in or create an account to continue.
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In to Access Formulas</span>
                </button>
              </motion.div>
            ) : (
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
                  totalFormulas={combinedFormulas.length}
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
                    ({filteredFormulas.length} of {combinedFormulas.length})
                  </span>
                </h2>
              </div>

              <div className={`grid grid-cols-1 ${
                settings.gridCols === 2 ? 'md:grid-cols-2' : 
                settings.gridCols === 3 ? 'md:grid-cols-2 lg:grid-cols-3' :
                'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              } gap-6`}>
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
              onShareCalculation={handleShareCalculation}
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
              totalFormulas={combinedFormulas.length}
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

        {currentView === 'guide' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="h-24 w-24 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Formula Guide</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore our comprehensive collection of engineering formulas with detailed explanations, examples, and applications.
            </p>
            <button
              onClick={handleShowFormulaGuide}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Open Formula Guide
            </button>
          </motion.div>
        )}

        {currentView === 'quick' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Settings className="h-24 w-24 text-purple-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Reference</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Access quick formulas, unit conversions, physical constants, and mathematical references all in one place.
            </p>
            <button
              onClick={handleShowQuickReference}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Open Quick Reference
            </button>
          </motion.div>
        )}
      </main>

        <Footer
          onShowPrivacyPolicy={() => setShowPrivacyPolicy(true)}
          onShowTermsOfService={() => setShowTermsOfService(true)}
          onShowDocumentation={() => setShowDocumentation(true)}
        />
      </div>

      <Calculator
        formula={selectedFormula}
        onClose={() => setSelectedFormula(null)}
        onSaveCalculation={handleSaveCalculation}
      />

      <HelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />

      {showSettingsModal && (
        <SettingsPage onClose={() => setShowSettingsModal(false)} />
      )}

      {showShareModal && calculationToShare && (
        <ShareResults
          calculation={calculationToShare}
          onClose={() => {
            setShowShareModal(false);
            setCalculationToShare(null);
          }}
        />
      )}

      {showFormulaGuide && (
        <FormulaGuide
          onClose={() => setShowFormulaGuide(false)}
          onSelectFormula={(formula) => {
            setSelectedFormula(formula);
            setShowFormulaGuide(false);
          }}
        />
      )}

      {showQuickReference && (
        <QuickReference onClose={() => setShowQuickReference(false)} />
      )}

      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-6xl max-h-[95vh] overflow-y-auto">
            <PrivacyPolicy onBack={() => setShowPrivacyPolicy(false)} />
          </div>
        </div>
      )}

      {showTermsOfService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-6xl max-h-[95vh] overflow-y-auto">
            <TermsOfService onBack={() => setShowTermsOfService(false)} />
          </div>
        </div>
      )}

      {showDocumentation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-6xl max-h-[95vh] overflow-y-auto">
            <Documentation onBack={() => setShowDocumentation(false)} />
          </div>
        </div>
      )}

      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
        {showUserProfile && (
          <UserProfile
            isOpen={showUserProfile}
            onClose={() => setShowUserProfile(false)}
            currentUser={currentUser}
            onUserUpdate={setCurrentUser}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;