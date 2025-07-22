import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Calculator, Zap, Users, MessageCircle, Mail, ExternalLink, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const helpSections = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        'Browse formulas by discipline (Mechanical, Electrical, Civil, Chemical)',
        'Use the search bar to find specific formulas quickly',
        'Filter by difficulty level: Basic, Intermediate, or Advanced',
        'Click on any formula card to open the calculator'
      ]
    },
    {
      title: 'Using the Calculator',
      icon: Calculator,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: [
        'Enter values for all required variables',
        'Use the "Load Example" button to see sample calculations',
        'View step-by-step calculation process',
        'Save calculations to your history for future reference'
      ]
    },
    {
      title: 'Advanced Features',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      items: [
        'Create custom formulas with the Formula Builder',
        'Convert units using the built-in Unit Converter',
        'Export calculation data as JSON files',
        'View usage analytics and statistics'
      ]
    }
  ];

  const faqItems = [
    {
      question: 'How accurate are the calculations?',
      answer: 'All calculations use industry-standard formulas with high-precision mathematics. Each result includes an accuracy indicator and validation warnings when inputs are outside recommended ranges.'
    },
    {
      question: 'Can I save my calculations?',
      answer: 'Yes! Every calculation can be saved to your history with optional notes. You can also export your entire calculation history as a JSON file for backup or sharing.'
    },
    {
      question: 'How do I add custom formulas?',
      answer: 'Use the Formula Builder tab to create custom formulas. Define variables, set units, add descriptions, and save them alongside the built-in formulas.'
    },
    {
      question: 'Are there keyboard shortcuts?',
      answer: 'Yes! Press Enter in any input field to calculate, Escape to close modals, and use Tab to navigate between fields efficiently.'
    }
  ];

  const supportChannels = [
    {
      name: 'Community Discord',
      description: 'Join our engineering community for real-time help',
      icon: MessageCircle,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      action: 'Join Discord'
    },
    {
      name: 'Email Support',
      description: 'Get technical support via email',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: 'Send Email'
    },
    {
      name: 'GitHub Issues',
      description: 'Report bugs or request features',
      icon: ExternalLink,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      action: 'Open GitHub'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Help & Support</h2>
                  <p className="text-blue-100">Everything you need to know about using Engineering Calculator Pro</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Quick Start Guide */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Quick Start Guide</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {helpSections.map((section, index) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${section.bgColor} rounded-xl p-4 border border-gray-200`}
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <section.icon className={`h-5 w-5 ${section.color}`} />
                        <h4 className="font-semibold text-gray-900">{section.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* FAQ Section */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Info className="h-5 w-5 text-green-600" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed ml-6">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Support Channels */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Get Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {supportChannels.map((channel, index) => (
                    <motion.div
                      key={channel.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`${channel.bgColor} rounded-xl p-4 border border-gray-200 cursor-pointer transition-all hover:shadow-md`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <channel.icon className={`h-6 w-6 ${channel.color}`} />
                        <h4 className="font-semibold text-gray-900">{channel.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                      <button className={`text-sm font-medium ${channel.color} hover:underline`}>
                        {channel.action} →
                      </button>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Tips & Tricks */}
              <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span>Pro Tips</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Efficiency Tips:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Use favorites to quickly access frequently used formulas</li>
                      <li>• Export calculations for documentation and reports</li>
                      <li>• Use the unit converter for quick conversions</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Best Practices:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Always check input ranges and warnings</li>
                      <li>• Add notes to calculations for future reference</li>
                      <li>• Verify results with step-by-step calculations</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}