import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Save, Eye, Code, Zap } from 'lucide-react';
import { Formula, Variable } from '../types/formula';
import toast from 'react-hot-toast';

interface FormulaBuilderProps {
  onSaveFormula: (formula: Formula) => void;
}

export default function FormulaBuilder({ onSaveFormula }: FormulaBuilderProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [formula, setFormula] = useState('');
  const [category, setCategory] = useState('Custom');
  const [discipline, setDiscipline] = useState('General');
  const [units, setUnits] = useState('');
  const [difficulty, setDifficulty] = useState<'Basic' | 'Intermediate' | 'Advanced'>('Basic');
  const [variables, setVariables] = useState<Variable[]>([]);
  const [tags, setTags] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const addVariable = () => {
    setVariables([...variables, {
      symbol: '',
      name: '',
      unit: '',
      description: ''
    }]);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const updateVariable = (index: number, field: keyof Variable, value: string | number) => {
    const updated = [...variables];
    updated[index] = { ...updated[index], [field]: value };
    setVariables(updated);
  };

  const validateFormula = (): boolean => {
    if (!name.trim()) {
      toast.error('Formula name is required');
      return false;
    }
    if (!formula.trim()) {
      toast.error('Formula expression is required');
      return false;
    }
    if (variables.length === 0) {
      toast.error('At least one variable is required');
      return false;
    }
    if (variables.some(v => !v.symbol.trim() || !v.name.trim())) {
      toast.error('All variables must have symbol and name');
      return false;
    }
    return true;
  };

  const saveFormula = () => {
    if (!validateFormula()) return;

    const newFormula: Formula = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'Custom formula',
      formula: formula.trim(),
      variables: variables.filter(v => v.symbol.trim()),
      category,
      discipline,
      units: units.trim(),
      difficulty,
      tags: tags.split(',').map(t => t.trim()).filter(t => t)
    };

    onSaveFormula(newFormula);
    toast.success('Custom formula saved successfully!');
    
    // Reset form
    setName('');
    setDescription('');
    setFormula('');
    setVariables([]);
    setTags('');
    setUnits('');
  };

  const previewFormula: Formula = {
    id: 'preview',
    name: name || 'Preview Formula',
    description: description || 'Formula preview',
    formula: formula || 'Enter formula...',
    variables,
    category,
    discipline,
    units,
    difficulty,
    tags: tags.split(',').map(t => t.trim()).filter(t => t)
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Code className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Formula Builder</h2>
            <p className="text-sm text-gray-600">Create custom engineering formulas</p>
          </div>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Eye className="h-4 w-4" />
          <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Formula Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Custom Stress Formula"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this formula calculates..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Formula Expression *</label>
              <input
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="e.g., σ = F / A"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Structural Analysis"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discipline</label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="General">General</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Civil">Civil</option>
                  <option value="Chemical">Chemical</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Result Units</label>
                <input
                  type="text"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  placeholder="e.g., Pa, N, m"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'Basic' | 'Intermediate' | 'Advanced')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., stress, material, strength"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Variables */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Variables</h3>
              <button
                onClick={addVariable}
                className="flex items-center space-x-2 px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Variable</span>
              </button>
            </div>

            {variables.map((variable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Variable {index + 1}</span>
                  <button
                    onClick={() => removeVariable(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={variable.symbol}
                    onChange={(e) => updateVariable(index, 'symbol', e.target.value)}
                    placeholder="Symbol (e.g., σ, F)"
                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                  />
                  <input
                    type="text"
                    value={variable.name}
                    onChange={(e) => updateVariable(index, 'name', e.target.value)}
                    placeholder="Name (e.g., Stress)"
                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={variable.unit}
                    onChange={(e) => updateVariable(index, 'unit', e.target.value)}
                    placeholder="Unit (e.g., Pa, N)"
                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={variable.description || ''}
                    onChange={(e) => updateVariable(index, 'description', e.target.value)}
                    placeholder="Description (optional)"
                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </motion.div>
            ))}

            {variables.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No variables added yet. Click "Add Variable" to start.</p>
              </div>
            )}
          </div>

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveFormula}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <Save className="h-5 w-5" />
            <span>Save Custom Formula</span>
          </motion.button>
        </div>

        {/* Preview */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
            <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{previewFormula.name}</h4>
                  <p className="text-sm text-gray-600">{previewFormula.description}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm font-medium text-gray-700 mb-2">Formula:</p>
                  <div className="text-xl font-mono text-center bg-blue-50 p-3 rounded border-2 border-dashed border-blue-300">
                    {previewFormula.formula}
                  </div>
                </div>

                {variables.length > 0 && (
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-sm font-medium text-gray-700 mb-2">Variables:</p>
                    <div className="space-y-2">
                      {variables.map((variable, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="font-mono font-semibold text-blue-600">{variable.symbol}:</span>
                          <span>{variable.name}</span>
                          <span className="text-gray-500">({variable.unit})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {previewFormula.discipline}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {previewFormula.difficulty}
                  </span>
                  {previewFormula.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}