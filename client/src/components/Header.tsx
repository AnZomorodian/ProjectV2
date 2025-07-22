import React from 'react';
import { Calculator, Zap, Wrench, Award, TrendingUp, Sparkles, Shield, Gauge } from 'lucide-react';

interface HeaderProps {
  onLogoClick?: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M40 40c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4zM20 20c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4zM60 20c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4zM20 60c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4zM60 60c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center space-x-5">
            <button 
              onClick={onLogoClick}
              className="relative group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-3xl"
            >
              {/* Main logo container with enhanced design */}
              <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-4 rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative z-10">
                  <Calculator className="h-12 w-12 drop-shadow-2xl text-white transform group-hover:rotate-12 transition-transform duration-300" />
                </div>
                {/* Floating elements around the logo */}
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1.5 animate-pulse">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -bottom-1 -left-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-1 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <Zap className="h-3 w-3 text-white" />
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
            </button>
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                Solvix
              </h1>
              <p className="text-cyan-200 text-lg font-bold tracking-wider uppercase">
                Advanced Engineering Solutions
              </p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 glass-effect dark-glass-effect px-5 py-3 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/30 transition-all duration-200">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span className="font-semibold text-white">Professional Grade</span>
            </div>
            <div className="flex items-center space-x-2 glass-effect dark-glass-effect px-5 py-3 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/30 transition-all duration-200">
              <Wrench className="h-5 w-5 text-blue-400" />
              <span className="font-semibold text-white">Multi-Discipline</span>
            </div>
            <div className="flex items-center space-x-2 glass-effect dark-glass-effect px-5 py-3 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/30 transition-all duration-200">
              <Gauge className="h-5 w-5 text-green-400" />
              <span className="font-semibold text-white">Real-time Analysis</span>
            </div>
          </div>
          
          {/* Mobile indicators */}
          <div className="flex lg:hidden items-center space-x-1">
            <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></div>
            <div className="bg-blue-500 w-2 h-2 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
      
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
    </header>
  );
}