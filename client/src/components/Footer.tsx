import React from 'react';
import { motion } from 'framer-motion';
import { Github, MessageCircle, Send, Heart, Code, Calculator } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com',
      color: 'hover:text-gray-900 hover:bg-gray-100'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.com',
      color: 'hover:text-indigo-600 hover:bg-indigo-50'
    },
    {
      name: 'Telegram',
      icon: Send,
      url: 'https://telegram.org',
      color: 'hover:text-blue-600 hover:bg-blue-50'
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-lg">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Engineering Calculator Pro</h3>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Professional-grade engineering calculator with advanced formulas, 
              real-time calculations, and comprehensive analysis tools for engineers worldwide.
            </p>
            <div className="flex items-center space-x-2 text-sm text-blue-300">
              <Code className="h-4 w-4" />
              <span>Built with modern web technologies</span>
            </div>
          </div>

          {/* Center Section - Powered By */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Heart className="h-5 w-5 text-red-400 animate-pulse" />
                <span className="text-lg font-semibold">Powered By</span>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                DeepInk Team
              </div>
              <p className="text-xs text-blue-300 mt-2">
                Innovative solutions for engineering excellence
              </p>
            </motion.div>
          </div>

          {/* Right Section - Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-200 ${link.color}`}
                  title={link.name}
                >
                  <link.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
            <div className="text-sm text-blue-300 space-y-1">
              <p>• Open source contributions welcome</p>
              <p>• Join our engineering community</p>
              <p>• Get support and share feedback</p>
              <p>• Access advanced formula library</p>
              <p>• Professional calculation tools</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-blue-300">
              © 2025 Engineering Calculator Pro. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-blue-300">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}