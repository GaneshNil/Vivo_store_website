'use client';

import React from 'react';
import { useStore } from '@/lib/store/store-context';
import { formatDateTime } from '@/lib/utils/formatters';
import { ShieldAlert, UserCheck } from 'lucide-react';

// Helper to format audit log details into clean, natural plain English
function formatAuditToPlainEnglish(log: {
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: any;
}): string {
  const d = log.details || {};
  const action = (log.action || '').toUpperCase();
  const entity = log.entity_type || '';

  // 1. Initial System Boot
  if (action === 'INITIAL_STORE_BOOTSTRAP') {
    return 'System initialized store database and seeded initial VIVO smartphone catalog.';
  }

  // 2. Product Operations
  if (action === 'PRODUCT_CREATED') {
    return `Admin created new product "${d.name || log.entity_id || 'item'}" and published it to the showroom catalog.`;
  }
  if (action === 'PRODUCT_UPDATED') {
    const fields = Array.isArray(d.fields) 
      ? d.fields.map((f: string) => f.replace(/_/g, ' ')).join(', ') 
      : Array.isArray(d.updated_fields)
      ? d.updated_fields.map((f: string) => f.replace(/_/g, ' ')).join(', ')
      : '';
    return `Admin modified product specifications and details${d.name ? ` for "${d.name}"` : ''}${fields ? ` (Updated: ${fields})` : ''}.`;
  }
  if (action === 'PRODUCT_DEACTIVATED') {
    return `Admin deactivated product (${d.name || log.entity_id || 'item'}) and hid it from public showroom display.`;
  }
  if (action === 'PRODUCT_DELETED') {
    return `Admin permanently deleted product (${d.name || log.entity_id || 'item'}) from the catalog.`;
  }

  // 3. Price Changes
  if (action === 'PRICE_CHANGED') {
    const oldP = d.oldPrice !== undefined ? `₹${Number(d.oldPrice).toLocaleString('en-IN')}` : '';
    const newP = d.newPrice !== undefined ? `₹${Number(d.newPrice).toLocaleString('en-IN')}` : '';
    const reasonText = d.reason ? ` — Reason: "${d.reason}"` : '';
    if (oldP && newP) {
      return `Admin updated selling price from ${oldP} to ${newP}${reasonText}.`;
    }
    return `Admin updated product price${reasonText}.`;
  }

  // 4. Stock Adjustments & Movements
  if (action === 'STOCK_ADJUSTED') {
    const prev = d.previous !== undefined ? d.previous : d.previous_stock;
    const curr = d.current !== undefined ? d.current : d.new_stock;
    const reason = d.reason ? ` (${String(d.reason).replace(/_/g, ' ')})` : '';
    const notes = d.notes ? ` — Note: ${d.notes}` : '';
    if (prev !== undefined && curr !== undefined) {
      return `Admin adjusted inventory stock from ${prev} to ${curr} units${reason}${notes}.`;
    }
    return `Admin manually adjusted product stock${reason}${notes}.`;
  }
  if (action === 'STOCK_RECEIVED') {
    return `Admin confirmed physical shipment arrival (+${d.quantity || ''} units). Current inventory updated to ${d.newStock || d.current_stock || ''} units.`;
  }

  // 5. Incoming Stock
  if (action === 'INCOMING_STOCK_RECORDED' || action === 'INCOMING_STOCK_ADDED') {
    return `Admin scheduled incoming shipment of ${d.quantity || d.incoming_quantity || ''} units from ${d.supplier || 'supplier'}.`;
  }
  if (action === 'INCOMING_STOCK_STATUS_CHANGED') {
    return `Admin updated shipment tracking status to "${d.status || d.new_status || 'updated'}".`;
  }

  // 6. Brand Actions
  if (action === 'BRAND_CREATED') {
    return `Admin added brand "${d.name || log.entity_id || ''}" with official logo to authorized brands catalog.`;
  }
  if (action === 'BRAND_UPDATED') {
    return `Admin updated brand profile and settings for "${d.name || log.entity_id || ''}".`;
  }
  if (action === 'BRAND_DELETED') {
    return `Admin removed brand "${d.name || log.entity_id || ''}" from the store catalog.`;
  }

  // 7. Store Offers & Schemes
  if (action === 'OFFER_CREATED' || action === 'SCHEME_CREATED') {
    const badge = d.badge ? ` [${d.badge}]` : '';
    const discount = d.discount ? ` (${d.discount})` : '';
    return `Admin published new promotional scheme "${d.title || d.name || log.entity_id || ''}"${badge}${discount}.`;
  }
  if (action === 'OFFER_UPDATED' || action === 'SCHEME_UPDATED') {
    return `Admin updated promotional scheme terms and banner for "${d.title || d.name || log.entity_id || ''}".`;
  }
  if (action === 'OFFER_DELETED' || action === 'SCHEME_DELETED') {
    return `Admin deleted promotional scheme "${d.title || d.name || log.entity_id || ''}".`;
  }
  if (action === 'OFFER_STATUS_TOGGLED') {
    return `Admin toggled promotional offer "${d.title || log.entity_id || ''}" status to ${d.is_active ? 'ACTIVE' : 'INACTIVE'}.`;
  }
  if (action === 'OFFERS_REORDERED') {
    return `Admin updated display priority and reordered ${d.count || ''} promotional offers on customer homepage.`;
  }

  // 8. Store Settings
  if (action === 'STORE_SETTINGS_UPDATED') {
    return 'Admin updated physical showroom address, operating timings, phone/WhatsApp contacts & hero showcase phone.';
  }

  // 9. Customer Inquiries & Requests
  if (action === 'NOTIFY_REQUEST_RESOLVED') {
    return `Admin contacted customer "${d.customer_name || ''}" (${d.phone || ''}) and resolved in-stock notification request.`;
  }

  // Generic clean fallback
  if (d.message && typeof d.message === 'string') {
    return d.message;
  }

  const keys = Object.keys(d);
  if (keys.length > 0) {
    const readableDetails = keys
      .map(k => `${k.replace(/_/g, ' ')}: ${typeof d[k] === 'object' ? JSON.stringify(d[k]) : d[k]}`)
      .join(', ');
    return `Admin performed ${action.replace(/_/g, ' ').toLowerCase()} with details: ${readableDetails}.`;
  }

  return `Admin executed ${action.replace(/_/g, ' ').toLowerCase()} on ${entity.replace(/_/g, ' ').toLowerCase() || 'system'}.`;
}

export default function AdminAuditLogsPage() {
  const { auditLogs } = useStore();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white font-display">System Audit Logs</h1>
        <p className="text-xs text-slate-400">Immutable security ledger recording every administrative mutation, price change & stock movement in clear English.</p>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-origin-violet" />
            <span>Recorded Admin Mutations ({auditLogs.length})</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">Plain English activity summary</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900/90 border-b border-white/10 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Admin User</th>
                <th className="p-4">Action Type</th>
                <th className="p-4">Entity</th>
                <th className="p-4">Plain English Activity Summary</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {auditLogs.map(log => {
                const plainEnglishText = formatAuditToPlainEnglish(log);
                return (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-slate-400 whitespace-nowrap">{formatDateTime(log.created_at)}</td>
                    
                    <td className="p-4 font-semibold text-slate-200 whitespace-nowrap">
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-vivo-400" />
                        <span>{log.admin_email}</span>
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold bg-vivo-500/15 text-vivo-300 border border-vivo-500/30">
                        {log.action}
                      </span>
                    </td>

                    <td className="p-4 font-mono text-slate-300 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/5 text-[11px] text-slate-300">
                        {log.entity_type}
                      </span>
                    </td>

                    <td className="p-4 text-slate-200 text-xs leading-relaxed font-medium min-w-[320px]">
                      {plainEnglishText}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
