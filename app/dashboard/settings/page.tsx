'use client';

import { Save, User, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Manage your profile, billing, and account preferences.</p>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          Profile Information
        </h2>

        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">Full Name</label>
              <input type="text" defaultValue="John Doe" className="mt-1 block w-full rounded-md bg-slate-800 border-slate-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Email Address</label>
              <input type="email" defaultValue="john@example.com" className="mt-1 block w-full rounded-md bg-slate-800 border-slate-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">Bio</label>
            <textarea rows={3} className="mt-1 block w-full rounded-md bg-slate-800 border-slate-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5" defaultValue="Tech reviewer and lifestyle vlogger based in NYC." />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">Niche</label>
            <select className="mt-1 block w-full rounded-md bg-slate-800 border-slate-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5">
              <option>Technology</option>
              <option>Lifestyle</option>
              <option>Gaming</option>
              <option>Beauty</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-green-500" />
          Subscription & Billing
        </h2>

        <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700 mb-6">
          <div>
            <h3 className="text-white font-medium">Pro Plan</h3>
            <p className="text-sm text-slate-400">$29/month • Renews Oct 24, 2024</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-900/50">
            Active
          </span>
        </div>

        <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
          Manage Subscription (Stripe)
        </button>
      </div>
    </div>
  );
}
