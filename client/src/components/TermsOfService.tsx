import React from 'react';
import { motion } from 'framer-motion';
import { Scale, AlertTriangle, Users, Shield, FileText, ArrowLeft, CheckCircle } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: [
        'By using Engineering Calculator Pro, you agree to these terms',
        'You must be at least 13 years old to use this service',
        'Academic and commercial use is permitted under these terms',
        'Continued use constitutes ongoing acceptance',
        'We may update terms with notice to users'
      ]
    },
    {
      icon: Users,
      title: 'User Responsibilities',
      content: [
        'Provide accurate information for calculations',
        'Use the service for legitimate engineering purposes',
        'Respect intellectual property rights of formulas and content',
        'Do not attempt to reverse engineer or hack the system',
        'Report bugs and security vulnerabilities responsibly'
      ]
    },
    {
      icon: Shield,
      title: 'Service Availability',
      content: [
        'We strive for 99.9% uptime but cannot guarantee uninterrupted service',
        'Maintenance windows may temporarily limit access',
        'Service features may be added, modified, or removed',
        'Free tier limitations may apply to certain features',
        'Premium features require valid subscription'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Limitation of Liability',
      content: [
        'Engineering calculations are provided for reference only',
        'Users must verify results for critical applications',
        'We are not liable for decisions made based on calculations',
        'Professional engineering judgment is always required',
        'Service is provided "as is" without warranties'
      ]
    },
    {
      icon: FileText,
      title: 'Intellectual Property',
      content: [
        'Engineering Calculator Pro software is proprietary',
        'Formula databases contain publicly available engineering knowledge',
        'Your custom formulas and data remain your property',
        'We may use anonymized data to improve the service',
        'Respect third-party libraries and their licenses'
      ]
    },
    {
      icon: Scale,
      title: 'Dispute Resolution',
      content: [
        'Good faith effort to resolve disputes directly first',
        'Binding arbitration for unresolved disputes',
        'Class action lawsuits are waived',
        'Governing law is jurisdiction of service provider',
        'Severability clause applies if any term is invalid'
      ]
    }
  ];

  const professionalNotice = [
    {
      title: 'Engineering Responsibility',
      description: 'All calculations must be verified by licensed professionals for critical applications.',
      icon: '⚠️'
    },
    {
      title: 'Code Compliance',
      description: 'Users are responsible for ensuring compliance with applicable building codes and standards.',
      icon: '📋'
    },
    {
      title: 'Safety Factor',
      description: 'Always apply appropriate safety factors and consider real-world conditions.',
      icon: '🛡️'
    },
    {
      title: 'Peer Review',
      description: 'Complex calculations should undergo peer review before implementation.',
      icon: '👥'
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
          <div className="bg-gradient-to-br from-green-500 to-blue-600 p-4 rounded-2xl w-fit mx-auto mb-6">
            <Scale className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These terms govern your use of Engineering Calculator Pro and outline the rights and 
            responsibilities of all users.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 22, 2025 • Effective: January 22, 2025
          </p>
        </div>
      </div>

      {/* Professional Engineering Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-2xl p-6 mb-8 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200"
      >
        <div className="flex items-start space-x-4 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Important Engineering Notice</h2>
            <p className="text-gray-700">
              This tool provides engineering calculations for reference and preliminary analysis. 
              Professional engineering judgment and verification are always required for critical applications.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {professionalNotice.map((notice, index) => (
            <div key={notice.title} className="bg-white p-4 rounded-lg border border-orange-200">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{notice.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{notice.title}</h4>
                  <p className="text-sm text-gray-600">{notice.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Terms Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
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

      {/* Account Termination */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="glass-effect rounded-2xl p-6 mt-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Account Termination</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">User Termination</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• You may terminate your account at any time</li>
              <li>• Export your data before closing your account</li>
              <li>• Account deletion is permanent after 30 days</li>
              <li>• Some anonymized data may be retained for analytics</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Service Termination</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• We may terminate accounts for terms violations</li>
              <li>• Warning will be provided when possible</li>
              <li>• Refunds handled case-by-case for paid accounts</li>
              <li>• Data export period provided before deletion</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Subscription Terms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="glass-effect rounded-2xl p-6 mt-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Subscription & Billing</h2>
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Free Tier</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Basic calculations included</li>
                <li>• Limited calculation history</li>
                <li>• Community support</li>
                <li>• No credit card required</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Premium Features</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Unlimited calculations</li>
                <li>• Advanced formula builder</li>
                <li>• Priority support</li>
                <li>• Export capabilities</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Billing Terms</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Monthly or annual billing</li>
                <li>• Automatic renewal</li>
                <li>• 30-day cancellation policy</li>
                <li>• Prorated refunds available</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="glass-effect rounded-2xl p-6 mt-6 text-center"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Questions About These Terms?</h2>
        <p className="text-gray-600 mb-6">
          Our team is available to clarify any terms or conditions. Contact us for legal or business inquiries.
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
        <p className="text-xs text-gray-500 mt-6">
          For legal notices and formal communications, please use our official contact channels.
        </p>
      </motion.div>
    </motion.div>
  );
}