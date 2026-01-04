import { Plus, Package, Download } from 'lucide-react';

export default function StorePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Digital Store</h1>
          <p className="text-slate-400">Manage your digital products and downloads.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Product */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden group">
          <div className="h-40 bg-slate-800 flex items-center justify-center relative">
            <Package className="w-12 h-12 text-slate-600" />
            <div className="absolute top-3 right-3 bg-green-500/10 text-green-500 text-xs font-bold px-2 py-1 rounded">Active</div>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-white mb-1">Lightroom Preset Pack Vol. 1</h3>
            <p className="text-sm text-slate-400 mb-4">$29.00 • 124 Sales</p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors">
                Edit
              </button>
              <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors">
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Active Product 2 */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden group">
          <div className="h-40 bg-slate-800 flex items-center justify-center relative">
            <Download className="w-12 h-12 text-slate-600" />
            <div className="absolute top-3 right-3 bg-green-500/10 text-green-500 text-xs font-bold px-2 py-1 rounded">Active</div>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-white mb-1">Creator Strategy Ebook</h3>
            <p className="text-sm text-slate-400 mb-4">$19.00 • 89 Sales</p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors">
                Edit
              </button>
              <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors">
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Draft Product */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden group opacity-75 hover:opacity-100 transition-opacity">
          <div className="h-40 bg-slate-800 flex items-center justify-center relative">
            <Package className="w-12 h-12 text-slate-600" />
            <div className="absolute top-3 right-3 bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2 py-1 rounded">Draft</div>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-white mb-1">Video Editing Masterclass</h3>
            <p className="text-sm text-slate-400 mb-4">$99.00 • 0 Sales</p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 text-sm font-medium rounded-lg transition-colors">
                Publish
              </button>
              <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
