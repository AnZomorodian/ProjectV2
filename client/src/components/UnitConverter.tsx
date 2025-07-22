import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Calculator, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

interface UnitConversion {
  category: string;
  units: {
    name: string;
    symbol: string;
    factor: number; // conversion factor to base unit
  }[];
}

const conversions: UnitConversion[] = [
  {
    category: 'Length',
    units: [
      { name: 'Meter', symbol: 'm', factor: 1 },
      { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      { name: 'Kilometer', symbol: 'km', factor: 1000 },
      { name: 'Inch', symbol: 'in', factor: 0.0254 },
      { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { name: 'Yard', symbol: 'yd', factor: 0.9144 }
    ]
  },
  {
    category: 'Area',
    units: [
      { name: 'Square Meter', symbol: 'm²', factor: 1 },
      { name: 'Square Millimeter', symbol: 'mm²', factor: 0.000001 },
      { name: 'Square Centimeter', symbol: 'cm²', factor: 0.0001 },
      { name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
      { name: 'Square Inch', symbol: 'in²', factor: 0.00064516 },
      { name: 'Square Foot', symbol: 'ft²', factor: 0.092903 }
    ]
  },
  {
    category: 'Force',
    units: [
      { name: 'Newton', symbol: 'N', factor: 1 },
      { name: 'Kilonewton', symbol: 'kN', factor: 1000 },
      { name: 'Pound-force', symbol: 'lbf', factor: 4.448 },
      { name: 'Kilogram-force', symbol: 'kgf', factor: 9.807 }
    ]
  },
  {
    category: 'Pressure',
    units: [
      { name: 'Pascal', symbol: 'Pa', factor: 1 },
      { name: 'Kilopascal', symbol: 'kPa', factor: 1000 },
      { name: 'Megapascal', symbol: 'MPa', factor: 1000000 },
      { name: 'Bar', symbol: 'bar', factor: 100000 },
      { name: 'PSI', symbol: 'psi', factor: 6895 },
      { name: 'Atmosphere', symbol: 'atm', factor: 101325 }
    ]
  },
  {
    category: 'Temperature',
    units: [
      { name: 'Celsius', symbol: '°C', factor: 1 },
      { name: 'Fahrenheit', symbol: '°F', factor: 1 },
      { name: 'Kelvin', symbol: 'K', factor: 1 }
    ]
  }
];

export default function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState('Length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const currentCategory = conversions.find(c => c.category === selectedCategory);

  const convertUnits = () => {
    if (!inputValue || !fromUnit || !toUnit || !currentCategory) return;

    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      toast.error('Please enter a valid number');
      return;
    }

    const fromUnitData = currentCategory.units.find(u => u.symbol === fromUnit);
    const toUnitData = currentCategory.units.find(u => u.symbol === toUnit);

    if (!fromUnitData || !toUnitData) return;

    let convertedValue: number;

    // Special handling for temperature
    if (selectedCategory === 'Temperature') {
      convertedValue = convertTemperature(value, fromUnit, toUnit);
    } else {
      // Convert to base unit, then to target unit
      const baseValue = value * fromUnitData.factor;
      convertedValue = baseValue / toUnitData.factor;
    }

    setResult(convertedValue);
    toast.success('Conversion completed!');
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius: number;
    switch (from) {
      case '°C':
        celsius = value;
        break;
      case '°F':
        celsius = (value - 32) * 5/9;
        break;
      case 'K':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target
    switch (to) {
      case '°C':
        return celsius;
      case '°F':
        return celsius * 9/5 + 32;
      case 'K':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result !== null) {
      setInputValue(result.toString());
      setResult(parseFloat(inputValue) || 0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg">
          <ArrowRightLeft className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Unit Converter</h2>
          <p className="text-sm text-gray-600">Convert between engineering units</p>
        </div>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setFromUnit('');
            setToUnit('');
            setResult(null);
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          {conversions.map(category => (
            <option key={category.category} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      {/* Conversion Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* From Unit */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select unit</option>
            {currentCategory?.units.map(unit => (
              <option key={unit.symbol} value={unit.symbol}>
                {unit.name} ({unit.symbol})
              </option>
            ))}
          </select>
          <input
            type="number"
            step="any"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* To Unit */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select unit</option>
            {currentCategory?.units.map(unit => (
              <option key={unit.symbol} value={unit.symbol}>
                {unit.name} ({unit.symbol})
              </option>
            ))}
          </select>
          <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
            {result !== null ? (
              <div>
                <div className="text-2xl font-bold text-purple-900">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
                <div className="text-sm text-gray-600">{toUnit}</div>
              </div>
            ) : (
              <span className="text-gray-400">Result will appear here</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={convertUnits}
          disabled={!inputValue || !fromUnit || !toUnit}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
            inputValue && fromUnit && toUnit
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Calculator className="h-4 w-4" />
          <span>Convert</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={swapUnits}
          disabled={!fromUnit || !toUnit}
          className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}