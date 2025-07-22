import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Download, QrCode, Link, Mail, MessageCircle, Check, X } from 'lucide-react';
import { Calculation } from '../types/formula';

interface ShareResultsProps {
  calculation: Calculation;
  onClose: () => void;
}

export default function ShareResults({ calculation, onClose }: ShareResultsProps) {
  const [copied, setCopied] = useState(false);
  const [shareFormat, setShareFormat] = useState('summary');
  const [includeFormula, setIncludeFormula] = useState(true);
  const [includeInputs, setIncludeInputs] = useState(true);

  const shareUrl = `${window.location.origin}/share/${calculation.id}`;
  
  const formatResult = () => {
    let content = '';
    
    if (shareFormat === 'summary') {
      content = `🧮 Engineering Calculation Result\n\n`;
      content += `📋 Formula: ${calculation.formulaName}\n`;
      if (includeInputs) {
        content += `📊 Inputs: ${Object.entries(calculation.inputs).map(([key, value]) => `${key} = ${value}`).join(', ')}\n`;
      }
      content += `✅ Result: ${calculation.result}\n`;
      content += `📅 Calculated: ${calculation.timestamp.toLocaleDateString()}\n`;
    } else if (shareFormat === 'detailed') {
      content = `# Engineering Calculation Report\n\n`;
      content += `## Formula: ${calculation.formulaName}\n\n`;
      if (includeFormula && calculation.formulaId) {
        content += `**Formula ID:** ${calculation.formulaId}\n\n`;
      }
      if (includeInputs) {
        content += `## Input Parameters\n`;
        Object.entries(calculation.inputs).forEach(([key, value]) => {
          content += `- **${key}**: ${value}\n`;
        });
        content += `\n`;
      }
      content += `## Result\n`;
      content += `**${calculation.result}**\n\n`;
      content += `## Metadata\n`;
      content += `- **Calculation Date**: ${calculation.timestamp.toLocaleString()}\n`;
      content += `- **Accuracy**: ${calculation.accuracy || 'Standard'}\n`;
      if (calculation.notes) {
        content += `- **Notes**: ${calculation.notes}\n`;
      }
    } else if (shareFormat === 'csv') {
      content = `Formula,Inputs,Result,Date\n`;
      content += `"${calculation.formulaName}","${Object.entries(calculation.inputs).map(([k,v]) => `${k}=${v}`).join(';')}","${calculation.result}","${calculation.timestamp.toISOString()}"`;
    }
    
    return content;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatResult());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleDownload = () => {
    const content = formatResult();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculation_${calculation.formulaName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${shareFormat === 'csv' ? 'csv' : 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareOptions = [
    {
      name: 'Email',
      icon: Mail,
      action: () => window.open(`mailto:?subject=Engineering Calculation Result&body=${encodeURIComponent(formatResult())}`),
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(formatResult())}`),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Telegram',
      icon: MessageCircle,
      action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(formatResult())}`),
      color: 'bg-blue-500 hover:bg-blue-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Share2 className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Share Results</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl font-bold"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Share Format Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Share Format</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'summary', label: 'Summary', desc: 'Quick overview' },
                { id: 'detailed', label: 'Detailed', desc: 'Full report' },
                { id: 'csv', label: 'CSV', desc: 'Data format' }
              ].map(format => (
                <button
                  key={format.id}
                  onClick={() => setShareFormat(format.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    shareFormat === format.id
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">{format.label}</div>
                  <div className="text-xs text-gray-500">{format.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Include Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Include</h3>
            <div className="space-y-2">
              {[
                { key: 'includeFormula', label: 'Formula details', state: includeFormula, setState: setIncludeFormula },
                { key: 'includeInputs', label: 'Input parameters', state: includeInputs, setState: setIncludeInputs }
              ].map(option => (
                <div key={option.key} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{option.label}</span>
                  <button
                    onClick={() => option.setState(!option.state)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      option.state ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        option.state ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preview</h3>
            <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">{formatResult()}</pre>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>

          {/* Share Link */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Share Link</h3>
            <div className="flex items-center space-x-2">
              <div className="flex-1 px-3 py-2 bg-gray-50 border rounded-lg text-sm text-gray-600">
                {shareUrl}
              </div>
              <button
                onClick={handleCopyUrl}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Link className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Social Share */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Share Via</h3>
            <div className="flex space-x-3">
              {shareOptions.map(option => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors ${option.color}`}
                >
                  <option.icon className="h-4 w-4" />
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-gray-500">
              <QrCode className="h-4 w-4" />
              <span className="text-sm">QR code generation available in premium version</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}