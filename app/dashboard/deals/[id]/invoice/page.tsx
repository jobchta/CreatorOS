'use client';

import { useState, useEffect } from 'react';
import {
    FileText,
    Download,
    ArrowLeft,
    Send,
    Calendar,
    Building2,
    User,
    Mail,
    Phone,
    MapPin,
    DollarSign,
    Plus,
    Trash2,
    Eye,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDeals } from '@/lib/hooks/useData';

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
}

interface InvoiceData {
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    // Creator (From)
    creatorName: string;
    creatorEmail: string;
    creatorPhone: string;
    creatorAddress: string;
    // Brand (To)
    brandName: string;
    brandEmail: string;
    brandAddress: string;
    brandContact: string;
    // Items
    items: InvoiceItem[];
    // Payment
    bankName: string;
    accountName: string;
    accountNumber: string;
    routingNumber: string;
    paypalEmail: string;
    notes: string;
}

export default function InvoicePage() {
    const params = useParams();
    const dealId = params.id as string;
    const { deals } = useDeals();
    const deal = deals.find(d => d.id === dealId);

    const [showPreview, setShowPreview] = useState(false);
    const [invoiceData, setInvoiceData] = useState<InvoiceData>({
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        creatorName: '',
        creatorEmail: '',
        creatorPhone: '',
        creatorAddress: '',
        brandName: deal?.brand_name || '',
        brandEmail: '',
        brandAddress: '',
        brandContact: '',
        items: deal?.deliverables?.map((d: any, i: number) => ({
            id: `item-${i}`,
            description: typeof d === 'string' ? d : d.type || 'Deliverable',
            quantity: 1,
            rate: deal.deal_value / (deal.deliverables?.length || 1)
        })) || [{ id: 'item-1', description: 'Sponsored Content', quantity: 1, rate: deal?.deal_value || 0 }],
        bankName: '',
        accountName: '',
        accountNumber: '',
        routingNumber: '',
        paypalEmail: '',
        notes: 'Thank you for your business! Payment is due within 30 days of invoice date.'
    });

    const addItem = () => {
        setInvoiceData({
            ...invoiceData,
            items: [
                ...invoiceData.items,
                { id: `item-${Date.now()}`, description: '', quantity: 1, rate: 0 }
            ]
        });
    };

    const removeItem = (id: string) => {
        setInvoiceData({
            ...invoiceData,
            items: invoiceData.items.filter(item => item.id !== id)
        });
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setInvoiceData({
            ...invoiceData,
            items: invoiceData.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        });
    };

    const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const total = subtotal;

    const downloadInvoice = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${invoiceData.invoiceNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 40px;
              color: #1a1a2e;
              line-height: 1.6;
              background: white;
            }
            .invoice { max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
            .logo { font-size: 28px; font-weight: bold; color: #6366f1; }
            .invoice-info { text-align: right; }
            .invoice-number { font-size: 24px; font-weight: bold; color: #1a1a2e; }
            .invoice-date { color: #666; font-size: 14px; margin-top: 4px; }
            .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
            .party-label { font-size: 12px; text-transform: uppercase; color: #6366f1; font-weight: 600; margin-bottom: 12px; letter-spacing: 1px; }
            .party-name { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
            .party-detail { font-size: 14px; color: #666; margin-bottom: 4px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .items-table th { 
              background: #f8f9fa; 
              padding: 12px 16px; 
              text-align: left; 
              font-size: 12px; 
              text-transform: uppercase; 
              color: #666;
              border-bottom: 2px solid #e9ecef;
            }
            .items-table td { 
              padding: 16px; 
              border-bottom: 1px solid #e9ecef;
              font-size: 14px;
            }
            .items-table .amount { text-align: right; font-weight: 600; }
            .totals { display: flex; justify-content: flex-end; margin-bottom: 40px; }
            .totals-box { width: 300px; }
            .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
            .total-row.grand { font-size: 20px; font-weight: bold; border-top: 2px solid #1a1a2e; padding-top: 16px; margin-top: 8px; }
            .payment-info { background: #f8f9fa; padding: 24px; border-radius: 8px; margin-bottom: 30px; }
            .payment-title { font-weight: 600; margin-bottom: 16px; font-size: 14px; text-transform: uppercase; color: #6366f1; }
            .payment-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px; }
            .payment-label { color: #666; }
            .payment-value { font-weight: 500; }
            .notes { font-size: 14px; color: #666; font-style: italic; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; }
            .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #999; }
            .status { 
              display: inline-block; 
              padding: 6px 16px; 
              background: #fef3c7; 
              color: #92400e; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: 600;
              text-transform: uppercase;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="invoice">
            <div class="header">
              <div>
                <div class="logo">INVOICE</div>
                <div style="margin-top: 8px;">
                  <span class="status">Pending Payment</span>
                </div>
              </div>
              <div class="invoice-info">
                <div class="invoice-number">${invoiceData.invoiceNumber}</div>
                <div class="invoice-date">
                  Issue Date: ${new Date(invoiceData.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br/>
                  Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>

            <div class="parties">
              <div>
                <div class="party-label">From</div>
                <div class="party-name">${invoiceData.creatorName || 'Your Name'}</div>
                ${invoiceData.creatorEmail ? `<div class="party-detail">${invoiceData.creatorEmail}</div>` : ''}
                ${invoiceData.creatorPhone ? `<div class="party-detail">${invoiceData.creatorPhone}</div>` : ''}
                ${invoiceData.creatorAddress ? `<div class="party-detail">${invoiceData.creatorAddress}</div>` : ''}
              </div>
              <div>
                <div class="party-label">Bill To</div>
                <div class="party-name">${invoiceData.brandName || 'Brand Name'}</div>
                ${invoiceData.brandContact ? `<div class="party-detail">Attn: ${invoiceData.brandContact}</div>` : ''}
                ${invoiceData.brandEmail ? `<div class="party-detail">${invoiceData.brandEmail}</div>` : ''}
                ${invoiceData.brandAddress ? `<div class="party-detail">${invoiceData.brandAddress}</div>` : ''}
              </div>
            </div>

            <table class="items-table">
              <thead>
                <tr>
                  <th style="width: 50%;">Description</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th class="amount">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.items.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.rate.toLocaleString()}</td>
                    <td class="amount">$${(item.quantity * item.rate).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="totals">
              <div class="totals-box">
                <div class="total-row">
                  <span>Subtotal</span>
                  <span>$${subtotal.toLocaleString()}</span>
                </div>
                <div class="total-row grand">
                  <span>Total Due</span>
                  <span>$${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            ${(invoiceData.bankName || invoiceData.paypalEmail) ? `
              <div class="payment-info">
                <div class="payment-title">Payment Information</div>
                <div class="payment-grid">
                  ${invoiceData.bankName ? `
                    <div>
                      <div class="payment-label">Bank Name</div>
                      <div class="payment-value">${invoiceData.bankName}</div>
                    </div>
                    <div>
                      <div class="payment-label">Account Name</div>
                      <div class="payment-value">${invoiceData.accountName}</div>
                    </div>
                    <div>
                      <div class="payment-label">Account Number</div>
                      <div class="payment-value">${invoiceData.accountNumber}</div>
                    </div>
                    <div>
                      <div class="payment-label">Routing Number</div>
                      <div class="payment-value">${invoiceData.routingNumber}</div>
                    </div>
                  ` : ''}
                  ${invoiceData.paypalEmail ? `
                    <div>
                      <div class="payment-label">PayPal</div>
                      <div class="payment-value">${invoiceData.paypalEmail}</div>
                    </div>
                  ` : ''}
                </div>
              </div>
            ` : ''}

            ${invoiceData.notes ? `
              <div class="notes">${invoiceData.notes}</div>
            ` : ''}

            <div class="footer">
              Generated by LogicLoom • ${new Date().toLocaleDateString()}
            </div>
          </div>
        </body>
      </html>
    `);

        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 500);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/dashboard/deals/${dealId}`}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Create Invoice</h1>
                        <p className="text-slate-400 text-sm">
                            {deal?.brand_name ? `For ${deal.brand_name} deal` : 'Generate a professional invoice'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        {showPreview ? 'Edit' : 'Preview'}
                    </button>
                    <button
                        onClick={downloadInvoice}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="space-y-6">
                    {/* Invoice Details */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-indigo-400" />
                            Invoice Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Invoice Number</label>
                                <input
                                    type="text"
                                    value={invoiceData.invoiceNumber}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Issue Date</label>
                                <input
                                    type="date"
                                    value={invoiceData.issueDate}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, issueDate: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm text-slate-400 mb-2">Due Date</label>
                                <input
                                    type="date"
                                    value={invoiceData.dueDate}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Your Info */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-emerald-400" />
                            Your Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Your Name / Business</label>
                                <input
                                    type="text"
                                    value={invoiceData.creatorName}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, creatorName: e.target.value })}
                                    placeholder="John Doe"
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={invoiceData.creatorEmail}
                                        onChange={(e) => setInvoiceData({ ...invoiceData, creatorEmail: e.target.value })}
                                        placeholder="you@email.com"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={invoiceData.creatorPhone}
                                        onChange={(e) => setInvoiceData({ ...invoiceData, creatorPhone: e.target.value })}
                                        placeholder="+1 234 567 8900"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Address</label>
                                <input
                                    type="text"
                                    value={invoiceData.creatorAddress}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, creatorAddress: e.target.value })}
                                    placeholder="123 Main St, City, Country"
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Brand Info */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-amber-400" />
                            Bill To (Brand)
                        </h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Brand Name</label>
                                    <input
                                        type="text"
                                        value={invoiceData.brandName}
                                        onChange={(e) => setInvoiceData({ ...invoiceData, brandName: e.target.value })}
                                        placeholder="Brand Inc."
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Contact Person</label>
                                    <input
                                        type="text"
                                        value={invoiceData.brandContact}
                                        onChange={(e) => setInvoiceData({ ...invoiceData, brandContact: e.target.value })}
                                        placeholder="Jane Smith"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Brand Email</label>
                                <input
                                    type="email"
                                    value={invoiceData.brandEmail}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, brandEmail: e.target.value })}
                                    placeholder="partnerships@brand.com"
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Brand Address</label>
                                <input
                                    type="text"
                                    value={invoiceData.brandAddress}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, brandAddress: e.target.value })}
                                    placeholder="456 Business Ave, City, Country"
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items & Payment */}
                <div className="space-y-6">
                    {/* Line Items */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            Line Items
                        </h2>
                        <div className="space-y-3">
                            {invoiceData.items.map((item, index) => (
                                <div key={item.id} className="flex gap-3 items-start">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                            placeholder="Description"
                                            className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div className="w-20">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                                            placeholder="Qty"
                                            className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-center"
                                        />
                                    </div>
                                    <div className="w-28">
                                        <input
                                            type="number"
                                            value={item.rate}
                                            onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                                            placeholder="Rate"
                                            className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addItem}
                                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium mt-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Line Item
                            </button>
                        </div>

                        {/* Totals */}
                        <div className="mt-6 pt-6 border-t border-slate-700">
                            <div className="flex justify-between text-slate-400 text-sm mb-2">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-white text-xl font-bold">
                                <span>Total</span>
                                <span className="text-emerald-400">${total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h2 className="text-lg font-semibold text-white mb-4">Payment Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">PayPal Email (optional)</label>
                                <input
                                    type="email"
                                    value={invoiceData.paypalEmail}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, paypalEmail: e.target.value })}
                                    placeholder="your@paypal.com"
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div className="border-t border-slate-700 pt-4">
                                <p className="text-xs text-slate-500 mb-3">Or bank transfer details:</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        value={invoiceData.bankName}
                                        onChange={(e) => setInvoiceData({ ...invoiceData, bankName: e.target.value })}
                                        placeholder="Bank Name"
                                        className="bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={invoiceData.accountName}
                                        onChange={(e) => setInvoiceData({ ...invoiceData, accountName: e.target.value })}
                                        placeholder="Account Name"
                                        className="bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={invoiceData.accountNumber}
                                        onChange={(e) => setInvoiceData({ ...invoiceData, accountNumber: e.target.value })}
                                        placeholder="Account Number"
                                        className="bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={invoiceData.routingNumber}
                                        onChange={(e) => setInvoiceData({ ...invoiceData, routingNumber: e.target.value })}
                                        placeholder="Routing Number"
                                        className="bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h2 className="text-lg font-semibold text-white mb-4">Notes</h2>
                        <textarea
                            value={invoiceData.notes}
                            onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                            placeholder="Payment terms, thank you note, etc."
                            rows={3}
                            className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
