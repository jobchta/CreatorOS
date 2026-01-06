'use client';

import { useState } from 'react';
import { useUser, useResetData } from '@/lib/hooks/useData';
import { User, Bell, Palette, Shield, Download, RefreshCw, Moon, Sun, Check, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const { user, updateUser } = useUser();
  const { reset } = useResetData();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    deals: true,
    collabs: true,
  });

  const handleReset = () => {
    if (confirm('This will reset all your data to demo state. Are you sure?')) {
      reset();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account preferences and application settings</p>
      </div>

      {/* Profile Section */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Profile</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
              alt="Avatar"
              className="w-16 h-16 rounded-xl bg-slate-700"
            />
            <div>
              <h3 className="font-medium text-white">{user?.name || 'Demo User'}</h3>
              <p className="text-sm text-slate-400">{user?.email || 'demo@logicloom.io'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
              <input
                type="text"
                value={user?.name || ''}
                onChange={(e) => updateUser({ name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                onChange={(e) => updateUser({ email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Bio</label>
            <textarea
              value={user?.bio || ''}
              onChange={(e) => updateUser({ bio: e.target.value })}
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-green-400" />
          <h2 className="text-lg font-semibold text-white">Connected Accounts</h2>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Instagram', handle: user?.instagram_username, color: 'text-pink-400' },
            { name: 'TikTok', handle: user?.tiktok_username, color: 'text-cyan-400' },
            { name: 'YouTube', handle: user?.youtube_channel, color: 'text-red-400' },
          ].map((account) => (
            <div key={account.name} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className={`font-medium ${account.color}`}>{account.name}</span>
                {account.handle && (
                  <span className="text-sm text-slate-400">@{account.handle}</span>
                )}
              </div>
              {account.handle ? (
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <Check className="w-3 h-3" /> Connected
                </span>
              ) : (
                <button className="text-sm text-blue-400 hover:text-blue-300">
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
        </div>

        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email notifications', desc: 'Receive updates via email' },
            { key: 'push', label: 'Push notifications', desc: 'Browser notifications' },
            { key: 'deals', label: 'Deal alerts', desc: 'New brand deal opportunities' },
            { key: 'collabs', label: 'Collab requests', desc: 'When creators want to collaborate' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">{item.label}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                className={`relative w-12 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications[item.key as keyof typeof notifications] ? 'left-7' : 'left-1'
                  }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">Appearance</h2>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-600'
              }`}
          >
            <Moon className={theme === 'dark' ? 'text-blue-400' : 'text-slate-400'} />
            <span className={theme === 'dark' ? 'text-white' : 'text-slate-400'}>Dark Mode</span>
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-600'
              }`}
          >
            <Sun className={theme === 'light' ? 'text-yellow-400' : 'text-slate-400'} />
            <span className={theme === 'light' ? 'text-white' : 'text-slate-400'}>Light Mode</span>
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Download className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-semibold text-white">Data Management</h2>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-slate-400" />
              <span className="text-white">Export All Data</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={handleReset}
            className="w-full flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-red-400" />
              <span className="text-red-400">Reset to Demo Data</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
