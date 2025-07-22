import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Users, Mail, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Calculation data and formulas you create or use',
        'Usage analytics to improve our service',
        'Technical information like browser type and IP address',
        'Account information if you create an account',
        'Cookies for authentication and preferences'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'Provide and improve our engineering calculator service',
        'Save your calculation history and preferences',
        'Analyze usage patterns to enhance user experience',
        'Communicate important service updates',
        'Respond to support requests and feedback'
      ]
    },
    {
      icon: Shield,
      title: 'Data Protection',
      content: [
        'All data is encrypted in transit using HTTPS/TLS',
        'Sensitive data is encrypted at rest in our database',
        'Access controls limit who can view your information',
        'Regular security audits and vulnerability assessments',
        'Compliance with industry-standard security practices'
      ]
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties',
        'Anonymous usage statistics may be shared for research',
        'Service providers may access data to maintain our service',
        'Legal compliance may require disclosure in rare cases',
        'You control what calculation data you choose to share'
      ]
    },
    {
      icon: Eye,
      title: 'Your Rights',
      content: [
        'Access your personal data and calculation history',
        'Request correction of inaccurate information',
        'Delete your account and associated data',
        'Export your calculation data in standard formats',
        'Opt-out of non-essential communications'
      ]
    },
    {
      icon: Mail,
      title: 'Contact & Updates',
      content: [
        'We may update this policy to reflect service changes',
        'Significant changes will be communicated via email',
        'Continued use constitutes acceptance of updates',
        'Contact us with privacy questions or concerns',
        'Data Protection Officer available for EU users'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
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
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-fit mx-auto mb-6">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information 
            when using Engineering Calculator Pro.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 22, 2025 • Effective: January 22, 2025
          </p>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6 card-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
                <section.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Data Retention */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-effect rounded-2xl p-6 mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Data Retention</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Calculation History</h3>
            <p className="text-gray-600 text-sm">
              Stored indefinitely while your account is active. You can delete individual calculations 
              or clear your entire history at any time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Account Data</h3>
            <p className="text-gray-600 text-sm">
              Retained for 30 days after account deletion to allow recovery. 
              Permanently deleted after this period unless legally required.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Analytics Data</h3>
            <p className="text-gray-600 text-sm">
              Anonymized usage statistics retained for 24 months to improve service quality 
              and performance optimization.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Support Communications</h3>
            <p className="text-gray-600 text-sm">
              Support emails and tickets retained for 12 months for quality assurance 
              and training purposes.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Cookies Policy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-effect rounded-2xl p-6 mt-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cookies & Tracking</h2>
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Essential Cookies</h4>
              <p className="text-sm text-green-700">
                Required for basic functionality like authentication and preferences. Cannot be disabled.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Analytics Cookies</h4>
              <p className="text-sm text-blue-700">
                Help us understand how you use our service. Can be disabled in settings.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Preference Cookies</h4>
              <p className="text-sm text-purple-700">
                Remember your settings and customizations. Can be managed individually.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="glass-effect rounded-2xl p-6 mt-6 text-center"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
        <p className="text-gray-600 mb-6">
          We're here to help. Contact us through any of these channels for privacy-related questions or concerns.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://t.me/DeepInkTeam"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Telegram Support
          </a>
          <a
            href="https://discord.gg/NbTDTRhu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Discord Community
          </a>
          <a
            href="https://github.com/AnZomorodian"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            GitHub Issues
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}