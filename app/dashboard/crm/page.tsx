import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function CRMPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch Deals
  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      {/* Header stays responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Deal Desk</h1>
        <button className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
          + New Deal
        </button>
      </div>

      {/* RESPONSIVE GRID:
         Stack on mobile (cols-1), 3 columns on Tablet (md:), 3 on Desktop
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto pb-4">
        {[
          { status: "lead", title: "Leads", color: "bg-blue-50 border-blue-200" },
          { status: "contract", title: "In Contract", color: "bg-yellow-50 border-yellow-200" },
          { status: "paid", title: "Paid", color: "bg-green-50 border-green-200" }
        ].map((col) => (
          <div key={col.status} className={`p-4 rounded-xl border ${col.color} min-h-[200px] flex flex-col`}>
            <h3 className="font-semibold text-gray-700 mb-4 border-b pb-2 sticky top-0 bg-inherit z-10">
              {col.title}
            </h3>
            <div className="space-y-3 overflow-y-auto">
              {deals?.filter(d => d.status === col.status).map((deal) => (
                <div key={deal.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <div className="font-bold text-gray-800 truncate">{deal.brand_name}</div>
                  <div className="text-sm text-gray-500">
                    {deal.currency} {deal.deal_value}
                  </div>
                  {deal.due_date && (
                    <div className="text-xs text-red-500 mt-1">
                      Due: {new Date(deal.due_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
              {deals?.filter(d => d.status === col.status).length === 0 && (
                <div className="text-sm text-gray-400 italic text-center py-4">No deals</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
