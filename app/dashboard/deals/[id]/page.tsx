export function generateStaticParams() {
  // In a real app, you would fetch all deal IDs from your database.
  // For static export, we need to pre-define the paths.
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function DealDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Deal Details: Nike Campaign</h1>
        <p className="text-slate-400">ID: {params.id}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">Deliverables</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-slate-300">
              <input type="checkbox" checked readOnly className="rounded border-slate-600 bg-slate-800 text-blue-600" />
              1x Instagram Reel (30-60s)
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <input type="checkbox" className="rounded border-slate-600 bg-slate-800 text-blue-600" />
              3x Instagram Stories with Link
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <input type="checkbox" className="rounded border-slate-600 bg-slate-800 text-blue-600" />
              Exclusivity (30 days)
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">Payment & Invoicing</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Deal Value</span>
              <span className="text-white font-medium">$5,000.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Status</span>
              <span className="text-yellow-500 font-medium bg-yellow-500/10 px-2 py-0.5 rounded">Pending Payment</span>
            </div>
            <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg border border-slate-700 transition-colors">
              Generate Invoice PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
