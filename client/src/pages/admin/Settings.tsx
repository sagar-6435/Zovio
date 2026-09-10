import React, { useState } from 'react';
import {
  Settings as SettingsIcon, Save, X, AlertCircle, CheckCircle, Eye, EyeOff,
  Mail, Bell, Lock, Users, Briefcase, MapPin, CreditCard, Shield, HardDrive
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    platformName: 'Zovio',
    platformTagline: 'Expert Services at Your Doorstep',
    supportEmail: 'support@zovio.com',
    supportPhone: '+91 1800-123-4567',
    website: 'https://zovio.com',

    // Service Settings
    minServicePrice: '₹200',
    maxServicePrice: '₹50000',
    commissionPercentage: '15',
    taxPercentage: '5',

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    complaintAlerts: true,

    // Security Settings
    twoFactorAuth: false,
    passwordMinLength: '8',
    sessionTimeout: '30',
    ipWhitelist: false,
  });

  const [edited, setEdited] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setEdited(true);
  };

  const handleSave = () => {
    setSaveMessage('Saving...');
    setTimeout(() => {
      setSaveMessage('✓ Settings saved successfully!');
      setEdited(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Platform Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Platform Name</label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => handleChange('platformName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline</label>
            <input
              type="text"
              value={settings.platformTagline}
              onChange={(e) => handleChange('platformTagline', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Support Email</label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => handleChange('supportEmail', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Support Phone</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium border-r border-gray-200 pr-2">+91</span>
              </div>
              <input
                type="tel"
                value={settings.supportPhone?.replace('+91 ', '')}
                onChange={(e) => handleChange('supportPhone', '+91 ' + e.target.value)}
                className="w-full pl-14 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Website URL</label>
            <input
              type="url"
              value={settings.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderServiceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Pricing & Commission</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Service Price</label>
            <input
              type="text"
              value={settings.minServicePrice}
              onChange={(e) => handleChange('minServicePrice', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Service Price</label>
            <input
              type="text"
              value={settings.maxServicePrice}
              onChange={(e) => handleChange('maxServicePrice', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Commission Percentage (%)</label>
            <input
              type="number"
              value={settings.commissionPercentage}
              onChange={(e) => handleChange('commissionPercentage', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Percentage (%)</label>
            <input
              type="number"
              value={settings.taxPercentage}
              onChange={(e) => handleChange('taxPercentage', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', icon: <Mail className="w-5 h-5" /> },
            { key: 'smsNotifications', label: 'SMS Notifications', icon: <Bell className="w-5 h-5" /> },
            { key: 'pushNotifications', label: 'Push Notifications', icon: <Bell className="w-5 h-5" /> },
            { key: 'weeklyReports', label: 'Weekly Reports', icon: <HardDrive className="w-5 h-5" /> },
            { key: 'complaintAlerts', label: 'Complaint Alerts', icon: <AlertCircle className="w-5 h-5" /> },
          ].map((notif) => (
            <div key={notif.key} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="text-gray-600">{notif.icon}</div>
                <label className="font-semibold text-gray-900 cursor-pointer">{notif.label}</label>
              </div>
              <button
                onClick={() => handleChange(notif.key as keyof typeof settings, !settings[notif.key as keyof typeof settings])}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  settings[notif.key as keyof typeof settings]
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {settings[notif.key as keyof typeof settings] ? 'On' : 'Off'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                <label className="font-semibold text-gray-900">Two-Factor Authentication</label>
                <p className="text-xs text-gray-600 mt-1">Require 2FA for admin access</p>
              </div>
            </div>
            <button
              onClick={() => handleChange('twoFactorAuth', !settings.twoFactorAuth)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                settings.twoFactorAuth
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {settings.twoFactorAuth ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-red-600" />
              <div>
                <label className="font-semibold text-gray-900">IP Whitelist</label>
                <p className="text-xs text-gray-600 mt-1">Restrict access to specific IPs</p>
              </div>
            </div>
            <button
              onClick={() => handleChange('ipWhitelist', !settings.ipWhitelist)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                settings.ipWhitelist
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {settings.ipWhitelist ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-4">Password & Session Policy</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Password Length</label>
              <input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => handleChange('passwordMinLength', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                min="6"
                max="20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                min="5"
                max="480"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-cream p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-brand-deep-navy">System Settings</h1>
          {edited && (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              <Save className="w-5 h-5" /> Save Changes
            </button>
          )}
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-700 font-semibold">{saveMessage}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8 flex flex-wrap gap-2">
          {[
            { id: 'general', label: 'General', icon: <SettingsIcon className="w-4 h-4" /> },
            { id: 'service', label: 'Services', icon: <Briefcase className="w-4 h-4" /> },
            { id: 'notification', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
            { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-teal text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'service' && renderServiceSettings()}
          {activeTab === 'notification' && renderNotificationSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-1">Settings Information</p>
            <p className="text-sm text-blue-800">
              Changes to these settings will apply globally across the platform. Some settings may require a system restart to take effect. 
              Always backup your settings before making major changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
