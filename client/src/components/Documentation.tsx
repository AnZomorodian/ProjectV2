import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, ArrowLeft, Search, Calculator, Code, Database, 
  Zap, Settings, ChevronRight, ExternalLink, Copy,
  Play, Download, Share2, HelpCircle
} from 'lucide-react';

interface DocumentationProps {
  onBack: () => void;
}

export default function Documentation({ onBack }: DocumentationProps) {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Play,
      content: {
        title: 'Quick Start Guide',
        description: 'Learn the basics of using Engineering Calculator Pro',
        topics: [
          {
            title: 'First Calculation',
            content: 'Select a formula from our comprehensive library, enter your values, and get instant results with full validation.'
          },
          {
            title: 'Navigation',
            content: 'Use the tabbed interface to switch between Formulas, History, Analytics, Unit Converter, and more.'
          },
          {
            title: 'Saving Results',
            content: 'All calculations are automatically saved to your history. Add notes and share results with colleagues.'
          }
        ]
      }
    },
    {
      id: 'formulas',
      title: 'Formula Library',
      icon: Calculator,
      content: {
        title: 'Engineering Formulas',
        description: 'Comprehensive collection of 200+ engineering formulas across multiple disciplines',
        topics: [
          {
            title: 'Mechanical Engineering',
            content: 'Stress analysis, fluid mechanics, thermodynamics, machine design, and material properties calculations.'
          },
          {
            title: 'Electrical Engineering', 
            content: 'Circuit analysis, power calculations, signal processing, electromagnetics, and control systems.'
          },
          {
            title: 'Civil Engineering',
            content: 'Structural analysis, geotechnical calculations, concrete design, and materials testing.'
          },
          {
            title: 'Chemical Engineering',
            content: 'Process calculations, reaction kinetics, mass transfer, and thermodynamic properties.'
          }
        ]
      }
    },
    {
      id: 'calculations',
      title: 'Performing Calculations',
      icon: Zap,
      content: {
        title: 'Calculation Workflow',
        description: 'Step-by-step guide to accurate engineering calculations',
        topics: [
          {
            title: 'Input Validation',
            content: 'All inputs are validated for range, units, and physical constraints to ensure meaningful results.'
          },
          {
            title: 'Unit Handling',
            content: 'Automatic unit conversion and validation. Results display in appropriate engineering units.'
          },
          {
            title: 'Error Handling',
            content: 'Clear error messages guide you to correct input issues and mathematical limitations.'
          },
          {
            title: 'Results Interpretation',
            content: 'Results include scientific notation, precision indicators, and contextual information.'
          }
        ]
      }
    },
    {
      id: 'features',
      title: 'Advanced Features',
      icon: Settings,
      content: {
        title: 'Power User Features',
        description: 'Advanced tools for professional engineering analysis',
        topics: [
          {
            title: 'Formula Builder',
            content: 'Create custom formulas with variable definitions, validation rules, and documentation.'
          },
          {
            title: 'Calculation History',
            content: 'Track all calculations with timestamps, notes, and the ability to re-run or modify inputs.'
          },
          {
            title: 'Data Export',
            content: 'Export calculation results and history in JSON or CSV format for external analysis.'
          },
          {
            title: 'Analytics Dashboard',
            content: 'Visualize usage patterns, most-used formulas, and calculation trends over time.'
          }
        ]
      }
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: Code,
      content: {
        title: 'API Documentation',
        description: 'Integrate Engineering Calculator Pro into your applications',
        topics: [
          {
            title: 'Authentication',
            content: 'API key-based authentication for secure access to calculation endpoints.'
          },
          {
            title: 'Calculation Endpoints',
            content: 'POST /api/calculations - Submit calculation requests with formula ID and input parameters.'
          },
          {
            title: 'Formula Endpoints',
            content: 'GET /api/formulas - Retrieve formula definitions, parameters, and metadata.'
          },
          {
            title: 'Rate Limits',
            content: 'Free tier: 100 requests/hour. Premium: 1000 requests/hour with burst allowance.'
          }
        ]
      }
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: Database,
      content: {
        title: 'Data & Privacy',
        description: 'How your calculation data is stored, managed, and protected',
        topics: [
          {
            title: 'Data Storage',
            content: 'Calculations stored securely with encryption at rest and in transit. Full GDPR compliance.'
          },
          {
            title: 'Data Retention',
            content: 'Calculation history retained indefinitely while account is active. Export before deletion.'
          },
          {
            title: 'Sharing & Collaboration',
            content: 'Share individual calculations or create collaborative workspaces with team members.'
          },
          {
            title: 'Backup & Recovery',
            content: 'Automatic backups with point-in-time recovery. Manual export options available.'
          }
        ]
      }
    }
  ];

  const quickActions = [
    {
      icon: Download,
      title: 'Download Calculation',
      description: 'Export your results',
      action: 'Export Data from History tab'
    },
    {
      icon: Share2,
      title: 'Share Results',
      description: 'Collaborate with team',
      action: 'Use Share button in calculations'
    },
    {
      icon: Copy,
      title: 'Copy Formula',
      description: 'Reuse in other tools',
      action: 'Copy from formula card'
    },
    {
      icon: HelpCircle,
      title: 'Get Support',
      description: 'Contact our team',
      action: 'Use community channels below'
    }
  ];

  const filteredSections = sections.filter(section =>
    searchTerm === '' || 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.topics.some(topic => 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentSection = sections.find(s => s.id === activeSection) || sections[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="glass-effect rounded-3xl p-8 mb-8 card-shadow">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Settings</span>
        </button>
        
        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-4 rounded-2xl w-fit mx-auto mb-6">
            <Book className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-4">Documentation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Complete guide to using Engineering Calculator Pro effectively for your engineering calculations and analysis.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-professional w-full pl-10 pr-4 py-3 text-center"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-effect rounded-2xl p-6 card-shadow sticky top-8">
            <h3 className="font-bold text-gray-900 mb-4">Sections</h3>
            <nav className="space-y-2">
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <span className="font-medium">{section.title}</span>
                  {activeSection === section.id && (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section Header */}
              <div className="glass-effect rounded-2xl p-8 mb-6 card-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-3 rounded-xl">
                    <currentSection.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {currentSection.content.title}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {currentSection.content.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="space-y-6">
                {currentSection.content.topics.map((topic, index) => (
                  <motion.div
                    key={topic.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-2xl p-6 card-shadow"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {topic.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {topic.content}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* API Examples for API section */}
              {activeSection === 'api' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-effect rounded-2xl p-6 mt-6 bg-gray-50"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Code Examples</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Calculate Stress</h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`curl -X POST https://api.engineeringcalc.pro/calculations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "formulaId": "stress-strain",
    "inputs": {
      "F": 1000,
      "A": 0.01
    },
    "notes": "Steel beam analysis"
  }'`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Get Formula List</h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`curl -X GET "https://api.engineeringcalc.pro/formulas?discipline=mechanical" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                      </pre>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-effect rounded-2xl p-8 mt-8 card-shadow"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <div
              key={action.title}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all hover:shadow-md"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg w-fit mb-4">
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{action.description}</p>
              <p className="text-xs text-blue-600 font-medium">{action.action}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Community Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-effect rounded-2xl p-8 mt-6 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Help?</h2>
        <p className="text-gray-600 mb-6">
          Join our community for additional support, tutorials, and discussions with fellow engineers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://t.me/DeepInkTeam"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
          >
            <span>Telegram Community</span>
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="https://discord.gg/NbTDTRhu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
          >
            <span>Discord Server</span>
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/AnZomorodian"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Pro Tip:</strong> Check our GitHub repository for the latest updates, feature requests, 
            and community-contributed formulas and examples.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}