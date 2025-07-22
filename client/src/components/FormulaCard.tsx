import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Formula } from '../types/formula';
import { Calculator, BookOpen, Star, Zap, Award, Info, TrendingUp, Users, Clock } from 'lucide-react';

interface FormulaCardProps {
  formula: Formula;
  onCalculate: (formula: Formula) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (formulaId: string) => void;
  index: number;
  usageCount?: number;
  lastUsed?: Date;
  isPopular?: boolean;
}

export default function FormulaCard({ 
  formula, 
  onCalculate, 
  isFavorite = false, 
  onToggleFavorite,
  index,
  usageCount = 0,
  lastUsed,
  isPopular = false
}: FormulaCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getDisciplineColor = (discipline: string) => {
    const colors = {
      'Mechanical': 'from-blue-500 to-blue-600',
      'Electrical': 'from-yellow-500 to-orange-500',
      'Civil': 'from-green-500 to-emerald-600',
      'Chemical': 'from-purple-500 to-violet-600'
    };
    return colors[discipline as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic': return <Zap className="h-4 w-4" />;
      case 'Intermediate': return <Award className="h-4 w-4" />;
      case 'Advanced': return <Star className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.02, rotateY: 2 }}
      className={`glass-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border hover-lift ripple ${
        isPopular ? 'border-orange-200 ring-2 ring-orange-100' : 'border-gray-100'
      } relative`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <TrendingUp className="h-3 w-3" />
            <span>Popular</span>
          </div>
        </div>
      )}

      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${getDisciplineColor(formula.discipline)} p-4 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                {formula.discipline}
              </span>
              <span className={`px-2 py-1 border rounded-full text-xs font-medium flex items-center space-x-1 ${getDifficultyColor(formula.difficulty)}`}>
                {getDifficultyIcon(formula.difficulty)}
                <span>{formula.difficulty}</span>
              </span>
            </div>
            <h3 className="text-xl font-bold mb-1">{formula.name}</h3>
            <p className="text-sm opacity-90">{formula.category}</p>
          </div>
          
          {onToggleFavorite && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggleFavorite(formula.id)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite ? 'text-yellow-300 hover:text-yellow-200' : 'text-white/60 hover:text-white'
              }`}
            >
              <Star className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
          )}
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{formula.description}</p>

        {/* Formula Display */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-4 border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Formula</span>
          </div>
          <div className="text-xl font-mono text-center text-gray-900 bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 shadow-sm">
            {formula.formula}
          </div>
          {formula.units && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Result: <span className="font-medium">{formula.units}</span>
            </p>
          )}
        </div>

        {/* Tags */}
        {formula.tags && formula.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {formula.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
              {formula.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  +{formula.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Variables Preview */}
        <div className="mb-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm font-medium text-gray-700 mb-2 hover:text-blue-600 transition-colors flex items-center space-x-1"
          >
            <span>Variables ({formula.variables.length})</span>
            <motion.div
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Info className="h-4 w-4" />
            </motion.div>
          </button>
          
          <motion.div
            initial={false}
            animate={{ height: showDetails ? 'auto' : '60px' }}
            className="overflow-hidden"
          >
            <div className="space-y-2">
              {formula.variables.map((variable, index) => (
                <div key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                  <span className="font-mono font-semibold text-blue-600">{variable.symbol}:</span>
                  <span className="text-gray-700">{variable.name}</span>
                  <span className="text-gray-500 text-xs">({variable.unit})</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Example Preview */}
        {formula.examples && formula.examples.length > 0 && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs font-medium text-green-800 mb-1">Example Application:</p>
            <p className="text-xs text-green-700">{formula.examples[0].title}</p>
          </div>
        )}

        {/* Usage Stats */}
        {(usageCount > 0 || lastUsed) && (
          <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
            {usageCount > 0 && (
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>Used {usageCount} times</span>
              </div>
            )}
            {lastUsed && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Last: {lastUsed.toLocaleDateString()}</span>
              </div>
            )}
          </div>
        )}

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCalculate(formula)}
          className={`w-full bg-gradient-to-r ${getDisciplineColor(formula.discipline)} hover:shadow-lg text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2`}
        >
          <Calculator className="h-5 w-5" />
          <span>Calculate</span>
        </motion.button>
      </div>
    </motion.div>
  );
}