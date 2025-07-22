import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Search, Copy, Check, X, Calculator, Ruler, Globe, Thermometer, Clock, ChevronDown, ChevronRight } from 'lucide-react';

interface QuickReferenceProps {
  onClose: () => void;
}

export default function QuickReference({ onClose }: QuickReferenceProps) {
  const [copied, setCopied] = useState('');
  const [expandedSection, setExpandedSection] = useState('units');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const quickFormulas = [
    { name: 'Area of Circle', formula: 'A = πr²', vars: 'r = radius' },
    { name: 'Pythagorean Theorem', formula: 'c² = a² + b²', vars: 'c = hypotenuse, a,b = legs' },
    { name: 'Ohm\'s Law', formula: 'V = I × R', vars: 'V = voltage, I = current, R = resistance' },
    { name: 'Force', formula: 'F = m × a', vars: 'F = force, m = mass, a = acceleration' },
    { name: 'Power', formula: 'P = V × I', vars: 'P = power, V = voltage, I = current' },
    { name: 'Pressure', formula: 'P = F / A', vars: 'P = pressure, F = force, A = area' },
    { name: 'Density', formula: 'ρ = m / V', vars: 'ρ = density, m = mass, V = volume' },
    { name: 'Speed', formula: 'v = d / t', vars: 'v = speed, d = distance, t = time' }
  ];

  const unitConversions = {
    length: [
      { from: '1 meter', to: '100 cm, 1000 mm, 3.28 ft, 39.37 in' },
      { from: '1 inch', to: '2.54 cm, 25.4 mm' },
      { from: '1 foot', to: '12 in, 30.48 cm, 0.3048 m' },
      { from: '1 yard', to: '3 ft, 36 in, 0.9144 m' },
      { from: '1 mile', to: '5280 ft, 1760 yd, 1.609 km' }
    ],
    area: [
      { from: '1 m²', to: '10.76 ft², 1550 in², 10,000 cm²' },
      { from: '1 ft²', to: '144 in², 0.0929 m²' },
      { from: '1 acre', to: '43,560 ft², 4047 m²' },
      { from: '1 hectare', to: '10,000 m², 2.47 acres' }
    ],
    volume: [
      { from: '1 liter', to: '1000 cm³, 0.001 m³, 0.264 gal, 1.057 qt' },
      { from: '1 gallon (US)', to: '3.785 L, 4 qt, 8 pt, 128 fl oz' },
      { from: '1 m³', to: '1000 L, 35.31 ft³, 264.2 gal' },
      { from: '1 ft³', to: '28.32 L, 7.48 gal' }
    ],
    mass: [
      { from: '1 kg', to: '1000 g, 2.205 lb, 35.27 oz' },
      { from: '1 pound', to: '16 oz, 0.4536 kg, 453.6 g' },
      { from: '1 ton (metric)', to: '1000 kg, 2205 lb' },
      { from: '1 ton (US)', to: '2000 lb, 907.2 kg' }
    ],
    force: [
      { from: '1 Newton', to: '0.225 lbf, 100,000 dyne' },
      { from: '1 lbf', to: '4.448 N, 16 ozf' },
      { from: '1 kip', to: '1000 lbf, 4448 N' }
    ],
    pressure: [
      { from: '1 Pa', to: '1 N/m², 0.000145 psi' },
      { from: '1 psi', to: '6895 Pa, 6.895 kPa' },
      { from: '1 bar', to: '100,000 Pa, 14.5 psi, 0.987 atm' },
      { from: '1 atm', to: '101,325 Pa, 14.7 psi, 1.013 bar' }
    ],
    energy: [
      { from: '1 Joule', to: '1 N·m, 0.239 cal, 9.48×10⁻⁴ BTU' },
      { from: '1 kWh', to: '3.6×10⁶ J, 3412 BTU' },
      { from: '1 BTU', to: '1055 J, 252 cal' },
      { from: '1 calorie', to: '4.184 J, 3.97×10⁻³ BTU' }
    ],
    temperature: [
      { from: 'Celsius to Fahrenheit', to: 'F = (C × 9/5) + 32' },
      { from: 'Fahrenheit to Celsius', to: 'C = (F - 32) × 5/9' },
      { from: 'Celsius to Kelvin', to: 'K = C + 273.15' },
      { from: 'Kelvin to Celsius', to: 'C = K - 273.15' }
    ]
  };

  const constants = [
    { name: 'π (Pi)', value: '3.14159265359', description: 'Ratio of circumference to diameter' },
    { name: 'e (Euler\'s number)', value: '2.71828182846', description: 'Natural logarithm base' },
    { name: 'g (Gravity)', value: '9.80665 m/s²', description: 'Standard acceleration due to gravity' },
    { name: 'c (Speed of light)', value: '299,792,458 m/s', description: 'Speed of light in vacuum' },
    { name: 'h (Planck constant)', value: '6.626×10⁻³⁴ J·s', description: 'Quantum of electromagnetic action' },
    { name: 'k (Boltzmann)', value: '1.381×10⁻²³ J/K', description: 'Relates energy to temperature' },
    { name: 'R (Gas constant)', value: '8.314 J/(mol·K)', description: 'Universal gas constant' },
    { name: 'σ (Stefan-Boltzmann)', value: '5.670×10⁻⁸ W/(m²·K⁴)', description: 'Black-body radiation constant' }
  ];

  const mathematicalFormulas = [
    { category: 'Algebra', formulas: [
      'Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a',
      'Distance Formula: d = √((x₂-x₁)² + (y₂-y₁)²)',
      'Slope: m = (y₂-y₁) / (x₂-x₁)'
    ]},
    { category: 'Trigonometry', formulas: [
      'sin²θ + cos²θ = 1',
      'Law of Cosines: c² = a² + b² - 2ab cos(C)',
      'Law of Sines: a/sin(A) = b/sin(B) = c/sin(C)'
    ]},
    { category: 'Calculus', formulas: [
      'Chain Rule: (f(g(x)))′ = f′(g(x)) · g′(x)',
      'Integration by Parts: ∫u dv = uv - ∫v du',
      'Fundamental Theorem: ∫ₐᵇ f′(x)dx = f(b) - f(a)'
    ]}
  ];

  const filteredFormulas = quickFormulas.filter(formula =>
    formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formula.formula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sections = [
    { id: 'formulas', label: 'Quick Formulas', icon: Calculator },
    { id: 'units', label: 'Unit Conversions', icon: Ruler },
    { id: 'constants', label: 'Physical Constants', icon: Globe },
    { id: 'math', label: 'Mathematical Formulas', icon: Thermometer }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex"
      >
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <h2 className="text-lg font-bold">Quick Reference</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setExpandedSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  expandedSection === section.id 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <section.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {expandedSection === 'formulas' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Quick Formulas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFormulas.map((formula, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{formula.name}</h4>
                      <button
                        onClick={() => handleCopy(formula.formula, `formula-${index}`)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {copied === `formula-${index}` ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="font-mono text-lg bg-gray-50 p-2 rounded mb-2">
                      {formula.formula}
                    </div>
                    <div className="text-xs text-gray-600">{formula.vars}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {expandedSection === 'units' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Unit Conversions</h3>
              
              {Object.entries(unitConversions).map(([category, conversions]) => (
                <div key={category} className="space-y-3">
                  <h4 className="text-lg font-semibold capitalize text-gray-800 border-b border-gray-200 pb-2">
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {conversions.map((conversion, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{conversion.from}</div>
                          <div className="text-sm text-gray-600">{conversion.to}</div>
                        </div>
                        <button
                          onClick={() => handleCopy(`${conversion.from} = ${conversion.to}`, `unit-${category}-${index}`)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {copied === `unit-${category}-${index}` ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {expandedSection === 'constants' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Physical Constants</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {constants.map((constant, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{constant.name}</h4>
                          <span className="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {constant.value}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{constant.description}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(constant.value, `constant-${index}`)}
                        className="ml-4 text-gray-400 hover:text-gray-600"
                      >
                        {copied === `constant-${index}` ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {expandedSection === 'math' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Mathematical Formulas</h3>
              
              {mathematicalFormulas.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    {section.category}
                  </h4>
                  <div className="space-y-2">
                    {section.formulas.map((formula, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                        <div className="font-mono text-sm">{formula}</div>
                        <button
                          onClick={() => handleCopy(formula, `math-${sectionIndex}-${index}`)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {copied === `math-${sectionIndex}-${index}` ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}