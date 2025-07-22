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
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Settings className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-600">Shortcuts to common tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className="group relative bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
          >
            <div className={`bg-gradient-to-r ${action.color} p-3 rounded-lg mb-3 mx-auto w-fit group-hover:scale-110 transition-transform`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{action.label}</h3>
            <p className="text-xs text-gray-500 leading-tight">{action.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}