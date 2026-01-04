import DealPipeline from "@/components/dashboard/crm/DealPipeline";
import { Plus } from "lucide-react";

export default function CRMPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Brand Deal CRM</h1>
          <p className="text-slate-400">Manage partnerships, track deliverables, and ensure you get paid.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> New Deal
        </button>
      </div>

      <div className="flex-1">
        <DealPipeline />
      </div>
    </div>
  );
}
