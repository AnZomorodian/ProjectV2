import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculation } from '../types/formula';
import { History, Trash2, Calendar, Download, Search, Filter, Eye, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface CalculationHistoryProps {
  calculations: Calculation[];
  onClearHistory: () => void;
}

export default function CalculationHistory({ calculations, onClearHistory }: CalculationHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'formula' | 'result'>('date');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCalculations = calculations
    .filter(calc => 
      calc.formulaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (calc.notes && calc.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.timestamp.getTime() - a.timestamp.getTime();
        case 'formula':
          return a.formulaName.localeCompare(b.formulaName);
        case 'result':
          return b.result - a.result;
        default:
          return 0;
      }
    });

  const exportHistory = () => {
    const data = {
      calculations: filteredCalculations,
      exportDate: new Date().toISOString(),
      totalCalculations: filteredCalculations.length
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculation_history_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('History exported successfully!');
  };

  const copyCalculation = (calc: Calculation) => {
    const text = `${calc.formulaName}\nInputs: ${JSON.stringify(calc.inputs)}\nResult: ${calc.result}\nDate: ${calc.timestamp.toLocaleString()}`;
    navigator.clipboard.writeText(text);
    toast.success('Calculation copied to clipboard!');
  };

  if (calculations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
      >
        <div className="text-center">
          <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <History className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Calculations Yet</h2>
          <p className="text-gray-500">Start calculating formulas to build your history</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <History className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Calculation History</h2>
              <p className="text-sm text-gray-600">{calculations.length} total calculations</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={exportHistory}
              className="text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-1 text-sm bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button
              onClick={onClearHistory}
              className="text-red-600 hover:text-red-700 transition-colors flex items-center space-x-1 text-sm bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search calculations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'formula' | 'result')}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
            >
              <option value="date">Sort by Date</option>
              <option value="formula">Sort by Formula</option>
              <option value="result">Sort by Result</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Calculations List */}
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {filteredCalculations.map((calc, index) => (
              <motion.div
                key={calc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{calc.formulaName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{calc.timestamp.toLocaleDateString()}</span>
                          <span>{calc.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyCalculation(calc)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setExpandedId(expandedId === calc.id ? null : calc.id)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-600 mb-2">RESULT</p>
                      <div className="text-xl font-bold text-blue-900">
                        {calc.result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {calc.result.toExponential(3)}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-blue-600 mb-2">INPUTS</p>
                      <div className="space-y-1">
                        {Object.entries(calc.inputs).slice(0, 2).map(([symbol, value]) => (
                          <div key={symbol} className="flex justify-between text-sm">
                            <span className="font-mono font-medium">{symbol}:</span>
                            <span>{value.toLocaleString()}</span>
                          </div>
                        ))}
                        {Object.keys(calc.inputs).length > 2 && (
                          <div className="text-xs text-blue-600">
                            +{Object.keys(calc.inputs).length - 2} more inputs
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {calc.notes && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs font-medium text-yellow-800 mb-1">NOTES</p>
                      <p className="text-sm text-yellow-700">{calc.notes}</p>
                    </div>
                  )}
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedId === calc.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 bg-gray-50 p-4"
                    >
                      <h4 className="font-medium text-gray-900 mb-3">Complete Input Values</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(calc.inputs).map(([symbol, value]) => (
                          <div key={symbol} className="bg-white p-2 rounded border">
                            <div className="font-mono font-semibold text-blue-600">{symbol}</div>
                            <div className="text-sm text-gray-900">{value.toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCalculations.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-500">No calculations found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}