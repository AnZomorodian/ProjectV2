import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formula, Calculation } from '../types/formula';
import { X, Save, History, Play, RotateCcw, Copy, Download, Lightbulb, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { EngineeringCalculator } from '../utils/calculator';

interface CalculatorProps {
  formula: Formula | null;
  onClose: () => void;
  onSaveCalculation: (calculation: Omit<Calculation, 'id' | 'timestamp'>) => void;
}

export default function Calculator({ formula, onClose, onSaveCalculation }: CalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [showExample, setShowExample] = useState(false);
  const [calculationSteps, setCalculationSteps] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [accuracy, setAccuracy] = useState<number>(1.0);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (formula) {
      // Pre-fill with default values or example values
      const defaultInputs: Record<string, number> = {};
      formula.variables.forEach(variable => {
        if (variable.value !== undefined) {
          defaultInputs[variable.symbol] = variable.value;
        }
      });
      setInputs(defaultInputs);
      setResult(null);
      setNotes('');
      setCalculationSteps([]);
      setWarnings([]);
      setAccuracy(1.0);
    }
  }, [formula]);

  if (!formula) return null;

  const handleInputChange = (symbol: string, value: string) => {
    const numValue = parseFloat(value);
    setInputs(prev => ({
      ...prev,
      [symbol]: isNaN(numValue) ? 0 : numValue
    }));
  };

  const validateInputs = () => {
    for (const variable of formula.variables) {
      const value = inputs[variable.symbol];
      if (value === undefined || value === 0) {
        if (variable.value === undefined) { // Skip if it has a default value
          toast.error(`Please enter a value for ${variable.name}`);
          return false;
        }
      }
      if (variable.min !== undefined && value < variable.min) {
        toast.error(`${variable.name} must be at least ${variable.min}`);
        return false;
      }
      if (variable.max !== undefined && value > variable.max) {
        toast.error(`${variable.name} must be at most ${variable.max}`);
        return false;
      }
    }
    return true;
  };

  const calculateResult = () => {
    if (!validateInputs()) return;

    setIsCalculating(true);
    try {
      const calculationResult = EngineeringCalculator.calculate(formula, inputs);
      
      setResult(calculationResult.result);
      setCalculationSteps(calculationResult.steps);
      setWarnings(calculationResult.warnings);
      setAccuracy(calculationResult.accuracy);
      
      toast.success('Calculation completed successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error(error instanceof Error ? error.message : 'Error in calculation. Please check your inputs.');
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSave = () => {
    if (result !== null) {
      onSaveCalculation({
        formulaId: formula.id,
        formulaName: formula.name,
        inputs: { ...inputs },
        result,
        notes
      });
      toast.success('Calculation saved to history!');
    }
  };

  const loadExample = () => {
    if (formula.examples && formula.examples.length > 0) {
      const example = formula.examples[0];
      setInputs(example.inputs);
      setShowExample(true);
      toast.success('Example loaded!');
    }
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toString());
      toast.success('Result copied to clipboard!');
    }
  };

  const exportCalculation = () => {
    if (result !== null) {
      const data = {
        formula: formula.name,
        inputs,
        result,
        steps: calculationSteps,
        timestamp: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formula.name.replace(/\s+/g, '_')}_calculation.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Calculation exported!');
    }
  };

  const resetCalculator = () => {
    setInputs({});
    setResult(null);
    setNotes('');
    setCalculationSteps([]);
    setWarnings([]);
    setAccuracy(1.0);
    setShowExample(false);
  };

  const allInputsFilled = formula.variables.every(variable => 
    variable.value !== undefined || (inputs[variable.symbol] !== undefined && inputs[variable.symbol] !== 0)
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
        >
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{formula.name}</h2>
                <p className="text-gray-600">{formula.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {formula.discipline}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {formula.difficulty}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Formula Display */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Formula</span>
              </h3>
              <div className="text-2xl font-mono text-center bg-white p-4 rounded-lg border-2 border-dashed border-blue-300 text-blue-900 shadow-sm">
                {formula.formula}
              </div>
              {formula.units && (
                <p className="text-blue-700 font-medium mt-2 text-center">
                  Result in: <span className="font-bold">{formula.units}</span>
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              {formula.examples && formula.examples.length > 0 && (
                <button
                  onClick={loadExample}
                  className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>Load Example</span>
                </button>
              )}
              <button
                onClick={resetCalculator}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>

            {/* Example Display */}
            {showExample && formula.examples && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
              >
                <h4 className="font-semibold text-green-900 mb-2">Example: {formula.examples[0].title}</h4>
                <p className="text-green-700 text-sm">{formula.examples[0].description}</p>
              </motion.div>
            )}

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {formula.variables.map((variable) => (
                <motion.div
                  key={variable.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-3"
                >
                  <label className="block text-sm font-semibold text-gray-700">
                    <span className="font-mono text-lg text-blue-600 mr-2">{variable.symbol}</span>
                    {variable.name}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={inputs[variable.symbol] || variable.value || ''}
                    placeholder={variable.value ? `Default: ${variable.value}` : `Enter value`}
                    disabled={variable.value !== undefined}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      variable.value !== undefined ? 'bg-gray-50 border-gray-200' : 'border-gray-300'
                    }`}
                    onChange={(e) => handleInputChange(variable.symbol, e.target.value)}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Unit: <span className="font-medium">{variable.unit}</span></span>
                    {(variable.min !== undefined || variable.max !== undefined) && (
                      <span>
                        Range: {variable.min ?? '∞'} - {variable.max ?? '∞'}
                      </span>
                    )}
                  </div>
                  {variable.description && (
                    <p className="text-xs text-gray-600 italic">{variable.description}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Calculate Button */}
            <div className="flex space-x-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={calculateResult}
                disabled={!allInputsFilled}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 relative ${
                  allInputsFilled
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Calculating...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Calculate Result</span>
                  </>
                )}
              </motion.button>
              
              {result !== null && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Save className="h-5 w-5" />
                  <span>Save</span>
                </motion.button>
              )}
            </div>

            {/* Result Display */}
            {result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-6 relative overflow-hidden"
              >
                {/* Accuracy Indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                    accuracy >= 0.9 ? 'bg-green-100 text-green-800' :
                    accuracy >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    <CheckCircle className="h-3 w-3" />
                    <span>{(accuracy * 100).toFixed(0)}% Accuracy</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <History className="h-6 w-6 text-green-600" />
                    <h3 className="font-bold text-green-900 text-xl">Calculation Result</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={copyResult}
                      className="text-green-600 hover:text-green-700 p-2 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={exportCalculation}
                      className="text-green-600 hover:text-green-700 p-2 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-green-700 font-medium mb-2">Final Result:</p>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="text-3xl font-bold text-green-900 mb-1">
                        {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                      </div>
                      <div className="text-lg text-green-700 mb-1">
                        {result.toExponential(4)}
                      </div>
                      {formula.units && (
                        <p className="text-green-600 font-medium">{formula.units}</p>
                      )}
                    </div>
                  </div>
                  
                  {calculationSteps.length > 0 && (
                    <div>
                      <p className="text-green-700 font-medium mb-2">Calculation Steps:</p>
                      <div className="bg-white p-4 rounded-lg border border-green-200 space-y-1">
                        {calculationSteps.map((step, index) => (
                          <div key={index} className="text-sm font-mono text-gray-700">
                            {index + 1}. {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Warnings Display */}
            {warnings.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-900">Calculation Warnings</h4>
                </div>
                <ul className="space-y-1">
                  {warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-yellow-800 flex items-start space-x-2">
                      <span className="text-yellow-600 mt-0.5">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Notes Section */}
            {result !== null && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calculation Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this calculation..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows={3}
                />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}