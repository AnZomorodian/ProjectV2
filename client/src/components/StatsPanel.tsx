import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calculation } from '../types/formula';
import { TrendingUp, Calculator, Clock, Award } from 'lucide-react';

interface StatsPanelProps {
  calculations: Calculation[];
  totalFormulas: number;
}

export default function StatsPanel({ calculations, totalFormulas }: StatsPanelProps) {
  // Calculate statistics
  const totalCalculations = calculations.length;
  const uniqueFormulas = new Set(calculations.map(c => c.formulaId)).size;
  const avgCalculationsPerDay = calculations.length > 0 ? 
    calculations.length / Math.max(1, Math.ceil((Date.now() - calculations[calculations.length - 1].timestamp.getTime()) / (1000 * 60 * 60 * 24))) : 0;

  // Discipline usage data
  const disciplineData = calculations.reduce((acc, calc) => {
    // This is a simplified mapping - in a real app, you'd store discipline with calculation
    const discipline = calc.formulaName.includes('Electrical') || calc.formulaName.includes('Ohm') || calc.formulaName.includes('Power') ? 'Electrical' :
                     calc.formulaName.includes('Beam') || calc.formulaName.includes('Concrete') ? 'Civil' :
                     calc.formulaName.includes('Reynolds') || calc.formulaName.includes('Gas') ? 'Chemical' : 'Mechanical';
    
    acc[discipline] = (acc[discipline] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(disciplineData).map(([discipline, count]) => ({
    discipline,
    count,
    percentage: ((count / totalCalculations) * 100).toFixed(1)
  }));

  const pieColors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

  // Recent activity (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const activityData = last7Days.map(date => {
    const count = calculations.filter(calc => 
      calc.timestamp.toISOString().split('T')[0] === date
    ).length;
    return {
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      calculations: count
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg">
          <TrendingUp className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Usage Analytics</h2>
          <p className="text-sm text-gray-600">Your calculation statistics and trends</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-900">{totalCalculations}</p>
              <p className="text-sm text-blue-700">Total Calculations</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center space-x-3">
            <Award className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-900">{uniqueFormulas}</p>
              <p className="text-sm text-green-700">Formulas Used</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-purple-900">{((uniqueFormulas / totalFormulas) * 100).toFixed(1)}%</p>
              <p className="text-sm text-purple-700">Coverage</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-2xl font-bold text-orange-900">{avgCalculationsPerDay.toFixed(1)}</p>
              <p className="text-sm text-orange-700">Per Day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      {calculations.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Chart */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity (7 Days)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f9fafb', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="calculations" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Discipline Distribution */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage by Discipline</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ discipline, percentage }) => `${discipline} (${percentage}%)`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {calculations.length === 0 && (
        <div className="text-center py-8">
          <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-500">Start calculating to see your analytics</p>
        </div>
      )}
    </motion.div>
  );
}