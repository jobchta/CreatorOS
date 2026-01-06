'use client';

import { useState } from 'react';
import { DollarSign, Plus, Users, Clock, CheckCircle, XCircle, ArrowRight, MoreHorizontal, Mail, ExternalLink, Trash2, Edit2, X, Check } from 'lucide-react';
import { useDeals } from '@/lib/hooks/useData';
import { BrandDeal, DealStatus } from '@/lib/database.types';

const columns: { id: DealStatus; title: string; color: string }[] = [
  { id: 'prospect', title: 'Prospects', color: 'border-slate-600' },
  { id: 'negotiation', title: 'Negotiation', color: 'border-yellow-600' },
  { id: 'active', title: 'Active', color: 'border-blue-600' },
  { id: 'completed', title: 'Completed', color: 'border-green-600' },
];

export default function DealPipeline() {
  const { deals, addDeal, updateDeal, deleteDeal, getDealsByStatus } = useDeals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Partial<BrandDeal> | null>(null);
  const [draggedDeal, setDraggedDeal] = useState<BrandDeal | null>(null);

  const handleDragStart = (deal: BrandDeal) => {
    setDraggedDeal(deal);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: DealStatus) => {
    if (draggedDeal && draggedDeal.status !== status) {
      updateDeal(draggedDeal.id, { status });
    }
    setDraggedDeal(null);
  };

  const handleAddDeal = () => {
    setEditingDeal({
      brand_name: '',
      deal_value: 0,
      currency: 'USD',
      status: 'prospect',
      payment_status: 'pending',
      deliverables: [],
    });
    setIsModalOpen(true);
  };

  const handleEditDeal = (deal: BrandDeal) => {
    setEditingDeal({ ...deal });
    setIsModalOpen(true);
  };

  const handleSaveDeal = () => {
    if (!editingDeal || !editingDeal.brand_name) return;

    if (editingDeal.id) {
      updateDeal(editingDeal.id, editingDeal);
    } else {
      addDeal({
        user_id: 'demo-user-001',
        brand_name: editingDeal.brand_name,
        brand_logo: `https://api.dicebear.com/7.x/identicon/svg?seed=${editingDeal.brand_name}`,
        contact_name: editingDeal.contact_name,
        contact_email: editingDeal.contact_email,
        deal_value: editingDeal.deal_value || 0,
        currency: editingDeal.currency || 'USD',
        status: editingDeal.status as DealStatus || 'prospect',
        deliverables: editingDeal.deliverables || [],
        payment_status: editingDeal.payment_status || 'pending',
        notes: editingDeal.notes,
      });
    }

    setIsModalOpen(false);
    setEditingDeal(null);
  };

  const handleDeleteDeal = (id: string) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      deleteDeal(id);
    }
  };

  const getColumnTotal = (status: DealStatus) => {
    return getDealsByStatus(status).reduce((sum, d) => sum + d.deal_value, 0);
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'overdue': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="h-full">
      {/* Pipeline Columns */}
      <div className="grid grid-cols-4 gap-4 h-full">
        {columns.map((column) => {
          const columnDeals = getDealsByStatus(column.id);
          const columnTotal = getColumnTotal(column.id);

          return (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
              className={`flex flex-col bg-slate-900/50 rounded-xl border-t-2 ${column.color} overflow-hidden`}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{column.title}</h3>
                  <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded-full">
                    {columnDeals.length}
                  </span>
                </div>
                <p className="text-sm text-green-400 font-medium">
                  ${columnTotal.toLocaleString()}
                </p>
              </div>

              {/* Deals */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {columnDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={() => handleDragStart(deal)}
                    onClick={() => handleEditDeal(deal)}
                    className={`p-4 bg-slate-800/50 rounded-xl border border-slate-700 cursor-pointer hover:border-slate-600 hover:bg-slate-800 transition-all ${draggedDeal?.id === deal.id ? 'opacity-50' : ''
                      }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                        {deal.brand_logo ? (
                          <img src={deal.brand_logo} alt={deal.brand_name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg font-bold text-slate-400">{deal.brand_name[0]}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate">{deal.brand_name}</h4>
                        {deal.contact_name && (
                          <p className="text-xs text-slate-400 truncate">{deal.contact_name}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-400">
                        ${deal.deal_value.toLocaleString()}
                      </span>
                      {column.id === 'completed' && (
                        <span className={`text-xs px-2 py-1 rounded-full ${getPaymentBadge(deal.payment_status)}`}>
                          {deal.payment_status}
                        </span>
                      )}
                    </div>

                    {deal.deliverables.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <CheckCircle className="w-3 h-3" />
                          <span>
                            {deal.deliverables.filter(d => d.completed).length}/{deal.deliverables.length} deliverables
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Deal Button */}
                {column.id === 'prospect' && (
                  <button
                    onClick={handleAddDeal}
                    className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 text-sm hover:border-slate-600 hover:text-slate-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Deal
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingDeal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">
                {editingDeal.id ? 'Edit Deal' : 'Add New Deal'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Brand Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Brand Name</label>
                <input
                  type="text"
                  value={editingDeal.brand_name || ''}
                  onChange={(e) => setEditingDeal({ ...editingDeal, brand_name: e.target.value })}
                  placeholder="e.g. TechFlow"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Contact Name</label>
                  <input
                    type="text"
                    value={editingDeal.contact_name || ''}
                    onChange={(e) => setEditingDeal({ ...editingDeal, contact_name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={editingDeal.contact_email || ''}
                    onChange={(e) => setEditingDeal({ ...editingDeal, contact_email: e.target.value })}
                    placeholder="john@brand.com"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Deal Value */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Deal Value ($)</label>
                <input
                  type="number"
                  value={editingDeal.deal_value || ''}
                  onChange={(e) => setEditingDeal({ ...editingDeal, deal_value: Number(e.target.value) })}
                  placeholder="2500"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <div className="grid grid-cols-4 gap-2">
                  {columns.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setEditingDeal({ ...editingDeal, status: col.id })}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all border ${editingDeal.status === col.id
                          ? `${col.color} bg-slate-800 text-white`
                          : 'border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                    >
                      {col.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                <textarea
                  value={editingDeal.notes || ''}
                  onChange={(e) => setEditingDeal({ ...editingDeal, notes: e.target.value })}
                  placeholder="Any additional notes..."
                  rows={2}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-slate-700 bg-slate-900/50">
              {editingDeal.id ? (
                <button
                  onClick={() => handleDeleteDeal(editingDeal.id!)}
                  className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              ) : (
                <div />
              )}
              <div className="flex gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSaveDeal}
                  disabled={!editingDeal.brand_name}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors"
                >
                  <Check className="w-4 h-4" />
                  {editingDeal.id ? 'Save' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
