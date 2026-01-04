'use client';

import { useState } from 'react';
import { Check, Plus } from 'lucide-react';

type Platform = {
  id: string;
  name: string;
  connected: boolean;
  color: string;
};

export default function ConnectionsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 'instagram', name: 'Instagram', connected: true, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
    { id: 'tiktok', name: 'TikTok', connected: false, color: 'bg-black' },
    { id: 'youtube', name: 'YouTube', connected: false, color: 'bg-red-600' },
    { id: 'twitter', name: 'X (Twitter)', connected: true, color: 'bg-slate-700' },
  ]);

  const toggleConnection = (id: string) => {
    setPlatforms(platforms.map(p =>
      p.id === id ? { ...p, connected: !p.connected } : p
    ));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Platform Connections</h1>
        <p className="text-slate-400">Connect your social media accounts to sync analytics and unlock cross-platform insights.</p>
      </div>

      <div className="grid gap-6">
        {platforms.map((platform) => (
          <div key={platform.id} className="flex items-center justify-between p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center`}>
                {/* Icons could go here */}
                <span className="text-white font-bold text-lg">{platform.name[0]}</span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">{platform.name}</h3>
                <p className="text-sm text-slate-400">
                  {platform.connected ? 'Syncing daily' : 'Not connected'}
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleConnection(platform.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                platform.connected
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {platform.connected ? (
                <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Connected</span>
              ) : (
                <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Connect</span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
