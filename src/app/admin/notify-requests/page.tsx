'use client';

import React from 'react';
import { useStore } from '@/lib/store/store-context';
import { formatDateTime } from '@/lib/utils/formatters';
import { Bell, Phone, MessageSquare, CheckCircle2, Clock } from 'lucide-react';

export default function AdminNotifyRequestsPage() {
  const { notifyRequests } = useStore();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white font-display">Customer Notify Requests</h1>
        <p className="text-xs text-slate-400">Track back-in-stock requests from customers for upcoming mobile shipments.</p>
      </div>

      {/* Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span>Active Customer Requests ({notifyRequests.length})</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900/90 border-b border-white/10 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Requested Mobile / Variant</th>
                <th className="p-4">Phone / WhatsApp</th>
                <th className="p-4">Date Requested</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {notifyRequests.map(req => (
                <tr key={req.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-bold text-white text-sm">{req.customer_name}</td>
                  
                  <td className="p-4">
                    <p className="font-semibold text-slate-200">{req.product_name}</p>
                    {req.variant_label && <p className="text-[11px] text-cyan-400">{req.variant_label}</p>}
                  </td>

                  <td className="p-4 font-mono text-slate-300">{req.customer_phone}</td>

                  <td className="p-4 text-slate-400">{formatDateTime(req.created_at)}</td>

                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {req.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`https://wa.me/91${req.customer_phone}?text=Hello%20${encodeURIComponent(req.customer_name)},%20the%20${encodeURIComponent(req.product_name || '')}%20you%20inquired%20about%20is%20now%20in%20stock%20at%20Galaxy%20Mobile%20Gallery%20Begampur!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Customer</span>
                      </a>
                      <a
                        href={`tel:${req.customer_phone}`}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
