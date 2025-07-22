import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, BookOpen, Download, Share2, Settings, HelpCircle } from 'lucide-react';

interface QuickActionsProps {
  onShowHelp: () => void;
  onExportData: () => void;
  onShowSettings: () => void;
}

export default function QuickActions({ onShowHelp, onExportData, onShowSettings }: QuickActionsProps) {
  const actions = [
    {
      icon: Calculator,
      label: 'Quick Calculate',
      description: 'Jump to most used formula',
      color: 'from-blue-500 to-blue-600',
      onClick: () => {}
    },
    {
      icon: BookOpen,
      label: 'Formula Guide',
      description: 'Browse formula reference',
      color: 'from-green-500 to-green-600',
      onClick: () => {}
    },
    {
      icon: Download,
      label: 'Export Data',
      description: 'Download calculations',
      color: 'from-purple-500 to-purple-600',
      onClick: onExportData
    },
    {
      icon: Share2,
      label: 'Share Results',
      description: 'Share with colleagues',
      color: 'from-orange-500 to-orange-600',
      onClick: () => {}
    },
    {
      icon: Settings,
      label: 'Settings',
      description: 'Customize preferences',
      color: 'from-gray-500 to-gray-600',
      onClick: onShowSettings
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get assistance',
      color: 'from-indigo-500 to-indigo-600',
      onClick: onShowHelp
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 card-shadow"
    >
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
          <Settings className="h-8 w-8 text-white drop-shadow-sm" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-gradient">Quick Actions</h2>
          <p className="text-base text-gray-600 font-medium">Shortcuts to common tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className="group relative glass-effect border-2 border-white/30 hover:border-white/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl focus-ring"
          >
            {/* Hover background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className={`bg-gradient-to-br ${action.color} p-4 rounded-2xl mb-4 mx-auto w-fit group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
              <action.icon className="h-7 w-7 text-white drop-shadow-sm" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-gray-800 transition-colors">{action.label}</h3>
            <p className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">{action.description}</p>
            
            {/* Subtle border gradient on hover */}
            <div className="absolute inset-0 rounded-2xl border-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}