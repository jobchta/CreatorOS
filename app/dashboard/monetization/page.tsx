import Link from 'next/link';
import { ShoppingBag, Globe, CreditCard, DollarSign } from 'lucide-react';

export default function MonetizationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Monetization</h1>
        <p className="text-slate-400">Turn your audience into income directly.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Total Revenue</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white">$12,450.00</div>
          <p className="text-sm text-slate-400 mt-1">Lifetime earnings</p>
        </div>

        <Link href="/dashboard/monetization/link-in-bio" className="group bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition-all cursor-pointer">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
            <Globe className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Link-in-Bio Page</h3>
          <p className="text-slate-400 text-sm">Customize your personal landing page to drive traffic to your products.</p>
        </Link>

        <Link href="/dashboard/monetization/store" className="group bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-purple-500 transition-all cursor-pointer">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
            <ShoppingBag className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Digital Store</h3>
          <p className="text-slate-400 text-sm">Sell ebooks, presets, and templates directly to your followers.</p>
        </Link>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-white">Recent Transactions</h3>
          <button className="text-sm text-blue-500 hover:text-blue-400">View All</button>
        </div>
        <div className="divide-y divide-slate-800">
          {[
            { item: "Lightroom Preset Pack Vol. 1", customer: "jason@email.com", amount: "$29.00", date: "Today, 2:30 PM" },
            { item: "Creator Strategy Ebook", customer: "sarah@email.com", amount: "$19.00", date: "Today, 11:15 AM" },
            { item: "1-on-1 Consultation", customer: "mike@email.com", amount: "$150.00", date: "Yesterday" },
          ].map((tx, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-900/20 flex items-center justify-center text-green-500">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">{tx.item}</h4>
                  <p className="text-xs text-slate-400">{tx.customer}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">{tx.amount}</div>
                <div className="text-xs text-slate-500">{tx.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
