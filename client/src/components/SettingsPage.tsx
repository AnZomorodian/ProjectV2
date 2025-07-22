import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, RotateCcw, Palette, Calculator, Database, Bell, Eye, Moon, Sun, Volume2, VolumeX, Keyboard, Zap, Clock, Layers, Square, Circle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface SettingsPageProps {
  onClose: () => void;
}

export default function SettingsPage({ onClose }: SettingsPageProps) {
  const { settings, updateSetting, resetSettings, saveSettings } = useSettings();

  const handleSave = () => {
    saveSettings();
    onClose();
  };

  const handleReset = () => {
    resetSettings();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-effect rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Appearance Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Palette className="h-5 w-5 text-blue-600" />
              <span>Appearance</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <div className="flex space-x-2">
                  {['light', 'dark', 'auto'].map(theme => (
                    <button
                      key={theme}
                      onClick={() => updateSetting('theme', theme)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                        settings.theme === theme 
                          ? 'bg-blue-100 border-blue-500 text-blue-700' 
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {theme === 'light' && <Sun className="h-4 w-4" />}
                      {theme === 'dark' && <Moon className="h-4 w-4" />}
                      {theme === 'auto' && <Eye className="h-4 w-4" />}
                      <span className="capitalize">{theme}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => updateSetting('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
                <div className="flex space-x-2">
                  {[
                    { value: 'blue', color: 'bg-blue-500', name: 'Blue' },
                    { value: 'purple', color: 'bg-purple-500', name: 'Purple' },
                    { value: 'green', color: 'bg-green-500', name: 'Green' },
                    { value: 'orange', color: 'bg-orange-500', name: 'Orange' },
                    { value: 'red', color: 'bg-red-500', name: 'Red' }
                  ].map(color => (
                    <button
                      key={color.value}
                      onClick={() => updateSetting('colorScheme', color.value)}
                      className={`w-10 h-10 rounded-lg ${color.color} ${
                        settings.colorScheme === color.value 
                          ? 'ring-2 ring-offset-2 ring-gray-400' 
                          : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Appearance */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Layers className="h-5 w-5 text-purple-600" />
              <span>Advanced Appearance</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Visual Style</h4>
                {[
                  { key: 'compactMode', label: 'Compact mode', icon: Square },
                  { key: 'highContrast', label: 'High contrast', icon: Eye }
                ].map(setting => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <setting.icon className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">{setting.label}</span>
                    </div>
                    <button
                      onClick={() => updateSetting(setting.key as keyof typeof settings, !settings[setting.key as keyof typeof settings])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings[setting.key as keyof typeof settings] ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings[setting.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Border Style</label>
                <select
                  value={settings.borderRadius}
                  onChange={(e) => updateSetting('borderRadius', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="sharp">Sharp</option>
                  <option value="rounded">Rounded</option>
                  <option value="extra-rounded">Extra Rounded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spacing</label>
                <select
                  value={settings.spacing}
                  onChange={(e) => updateSetting('spacing', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="compact">Compact</option>
                  <option value="normal">Normal</option>
                  <option value="relaxed">Relaxed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Calculation Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-green-600" />
              <span>Calculations</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precision</label>
                <input
                  type="number"
                  min="2"
                  max="15"
                  value={settings.precision}
                  onChange={(e) => updateSetting('precision', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
                <select
                  value={settings.units}
                  onChange={(e) => updateSetting('units', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="metric">Metric (SI)</option>
                  <option value="imperial">Imperial</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scientific Notation</label>
                <select
                  value={settings.scientificNotation}
                  onChange={(e) => updateSetting('scientificNotation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="auto">Auto</option>
                  <option value="always">Always</option>
                  <option value="never">Never</option>
                  <option value="large">Large numbers only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Database className="h-5 w-5 text-purple-600" />
              <span>Advanced Features</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Data Management</h4>
                {[
                  { key: 'autoSave', label: 'Auto-save calculations', icon: Database },
                  { key: 'exportHistory', label: 'Export calculation history', icon: Database }
                ].map(setting => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <setting.icon className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">{setting.label}</span>
                    </div>
                    <button
                      onClick={() => updateSetting(setting.key as keyof typeof settings, !settings[setting.key as keyof typeof settings])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings[setting.key as keyof typeof settings] ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings[setting.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">User Experience</h4>
                {[
                  { key: 'notifications', label: 'Enable notifications', icon: Bell },
                  { key: 'animations', label: 'Enable animations', icon: Eye }
                ].map(setting => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <setting.icon className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">{setting.label}</span>
                    </div>
                    <button
                      onClick={() => updateSetting(setting.key as keyof typeof settings, !settings[setting.key as keyof typeof settings])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings[setting.key as keyof typeof settings] ? 'bg-orange-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings[setting.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interface Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Eye className="h-5 w-5 text-indigo-600" />
              <span>Interface</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
                <select
                  value={settings.defaultView}
                  onChange={(e) => updateSetting('defaultView', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="formulas">Formulas</option>
                  <option value="history">History</option>
                  <option value="converter">Unit Converter</option>
                  <option value="builder">Formula Builder</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grid Columns</label>
                <select
                  value={settings.gridCols}
                  onChange={(e) => updateSetting('gridCols', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="2">2 Columns</option>
                  <option value="3">3 Columns</option>
                  <option value="4">4 Columns</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit Display</label>
                <select
                  value={settings.unitDisplay}
                  onChange={(e) => updateSetting('unitDisplay', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="short">Short (m, kg, s)</option>
                  <option value="long">Long (meters, kilograms, seconds)</option>
                  <option value="symbol">Symbol (℃, Ω, π)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Smart Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              <span>Smart Features</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Assistance</h4>
                {[
                  { key: 'autoComplete', label: 'Auto-complete formulas', icon: Zap },
                  { key: 'formulaPreview', label: 'Live formula preview', icon: Eye },
                  { key: 'keyboardShortcuts', label: 'Keyboard shortcuts', icon: Keyboard }
                ].map(setting => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <setting.icon className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-700">{setting.label}</span>
                    </div>
                    <button
                      onClick={() => updateSetting(setting.key as keyof typeof settings, !settings[setting.key as keyof typeof settings])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings[setting.key as keyof typeof settings] ? 'bg-yellow-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings[setting.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Audio & Performance</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {settings.soundEnabled ? <Volume2 className="h-4 w-4 text-green-600" /> : <VolumeX className="h-4 w-4 text-gray-400" />}
                      <span className="text-sm font-medium text-gray-700">Sound effects</span>
                    </div>
                    <button
                      onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.soundEnabled ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Timeout</label>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <input
                        type="range"
                        min="5"
                        max="120"
                        value={settings.calculationTimeout}
                        onChange={(e) => updateSetting('calculationTimeout', parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 w-12">{settings.calculationTimeout}s</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max History Items</label>
                    <input
                      type="number"
                      min="100"
                      max="10000"
                      step="100"
                      value={settings.maxHistoryItems}
                      onChange={(e) => updateSetting('maxHistoryItems', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Effects */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Layers className="h-5 w-5 text-pink-600" />
              <span>Visual Effects</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Background Effect</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'none', name: 'None' },
                    { value: 'gradient', name: 'Gradient' },
                    { value: 'particles', name: 'Particles' },
                    { value: 'waves', name: 'Waves' }
                  ].map(effect => (
                    <button
                      key={effect.value}
                      onClick={() => updateSetting('backgroundEffect', effect.value)}
                      className={`px-3 py-2 text-sm rounded-lg border ${
                        settings.backgroundEffect === effect.value
                          ? 'bg-pink-100 border-pink-500 text-pink-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {effect.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Settings Live */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h4 className="font-semibold text-gray-900">Live Preview</h4>
              <span className="text-sm text-gray-600">Settings apply instantly</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Theme:</span>
                <span className="ml-2 font-medium capitalize">{settings.theme}</span>
              </div>
              <div>
                <span className="text-gray-600">Font:</span>
                <span className="ml-2 font-medium capitalize">{settings.fontSize}</span>
              </div>
              <div>
                <span className="text-gray-600">Color:</span>
                <span className="ml-2 font-medium capitalize">{settings.colorScheme}</span>
              </div>
              <div>
                <span className="text-gray-600">Compact:</span>
                <span className="ml-2 font-medium">{settings.compactMode ? 'On' : 'Off'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset to Default</span>
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                <Save className="h-4 w-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}