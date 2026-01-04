'use client';

import { MoreHorizontal, DollarSign, Calendar, CheckCircle2 } from 'lucide-react';

type Deal = {
  id: string;
  brand: string;
  amount: number;
  dueDate: string;
  status: 'prospect' | 'active' | 'completed';
};

const mockDeals: Deal[] = [
  { id: '1', brand: 'Nike', amount: 5000, dueDate: 'Oct 15', status: 'active' },
  { id: '2', brand: 'Squarespace', amount: 2500, dueDate: 'Oct 20', status: 'prospect' },
  { id: '3', brand: 'Sony', amount: 8000, dueDate: 'Sep 30', status: 'completed' },
  { id: '4', brand: 'NordVPN', amount: 1500, dueDate: 'Oct 25', status: 'prospect' },
];

export default function DealPipeline() {
  const columns = [
    { id: 'prospect', title: 'Prospects', color: 'bg-yellow-500/10 text-yellow-500' },
    { id: 'active', title: 'Active / In Progress', color: 'bg-blue-500/10 text-blue-500' },
    { id: 'completed', title: 'Completed & Paid', color: 'bg-green-500/10 text-green-500' },
  ];

  return (
    <div className="flex gap-6 h-[600px] overflow-x-auto pb-4">
      {columns.map((col) => {
        const deals = mockDeals.filter(d => d.status === col.id);
        const totalValue = deals.reduce((sum, d) => sum + d.amount, 0);

        return (
          <div key={col.id} className="flex-1 min-w-[300px] flex flex-col bg-slate-900 rounded-xl border border-slate-800">
            {/* Column Header */}
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">{col.title}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${col.color}`}>
                  {deals.length}
                </span>
              </div>
              <div className="text-sm text-slate-400 font-medium">
                ${totalValue.toLocaleString()} Potential
              </div>
            </div>

            {/* Cards Area */}
            <div className="p-3 space-y-3 flex-1 overflow-y-auto bg-slate-900/50">
              {deals.map((deal) => (
                <div key={deal.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-colors shadow-sm group cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-white">{deal.brand}</h4>
                    <button className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-slate-300 text-sm mb-3">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-medium">${deal.amount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-700/50">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Due {deal.dueDate}
                    </div>
                    {deal.status === 'completed' && (
                      <div className="flex items-center gap-1 text-green-500">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button className="w-full py-2 flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700 border-dashed">
                + Add Deal
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
