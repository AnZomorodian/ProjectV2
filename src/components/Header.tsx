import React from 'react';
import { Calculator, Zap, Wrench, Award, TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl shadow-lg">
              <Calculator className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Engineering Calculator Pro
              </h1>
              <p className="text-blue-200 text-sm font-medium">
                Advanced Formula Calculator & Analysis Suite
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Award className="h-4 w-4 text-orange-400" />
              <span className="font-medium">Professional Grade</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Wrench className="h-4 w-4 text-blue-400" />
              <span className="font-medium">Multi-Discipline</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="font-medium">Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}