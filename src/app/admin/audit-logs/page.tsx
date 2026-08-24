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

  // Search & Filter State
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedActionGroup, setSelectedActionGroup] = React.useState('ALL');

  // Filter logs based on search keyword, date, and action group
  const filteredLogs = React.useMemo(() => {
    return auditLogs.filter(log => {
      // 1. Date Filter
      if (selectedDate) {
        const logDate = log.created_at.split('T')[0];
        if (logDate !== selectedDate) return false;
      }

      // 2. Action Group Filter
      if (selectedActionGroup !== 'ALL') {
        const action = (log.action || '').toUpperCase();
        if (selectedActionGroup === 'OFFER' && !action.includes('OFFER') && !action.includes('SCHEME')) return false;
        if (selectedActionGroup === 'PRODUCT' && !action.includes('PRODUCT')) return false;
        if (selectedActionGroup === 'PRICE' && !action.includes('PRICE')) return false;
        if (selectedActionGroup === 'STOCK' && !action.includes('STOCK')) return false;
        if (selectedActionGroup === 'BRAND' && !action.includes('BRAND')) return false;
        if (selectedActionGroup === 'SETTINGS' && !action.includes('SETTINGS')) return false;
        if (selectedActionGroup === 'NOTIFY' && !action.includes('NOTIFY')) return false;
      }

      // 3. Search Keyword
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const plainText = formatAuditToPlainEnglish(log).toLowerCase();
        const adminEmail = (log.admin_email || '').toLowerCase();
        const action = (log.action || '').toLowerCase();
        const entity = (log.entity_type || '').toLowerCase();
        const entityId = (log.entity_id || '').toLowerCase();

        return (
          plainText.includes(q) ||
          adminEmail.includes(q) ||
          action.includes(q) ||
          entity.includes(q) ||
          entityId.includes(q)
        );
      }

      return true;
    });
  }, [auditLogs, searchKeyword, selectedDate, selectedActionGroup]);

  const hasActiveFilters = Boolean(searchKeyword || selectedDate || selectedActionGroup !== 'ALL');

  const handleResetFilters = () => {
    setSearchKeyword('');
    setSelectedDate('');
    setSelectedActionGroup('ALL');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white font-display">System Audit Logs</h1>
        <p className="text-xs text-slate-400">
          Immutable security ledger permanently recording every administrative mutation, price change & stock movement in clear English.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span>Filter & Search Audit Activity</span>
            <span className="px-2 py-0.5 rounded-full bg-vivo-500/20 text-vivo-300 border border-vivo-500/30 text-[10px]">
              {filteredLogs.length} of {auditLogs.length} logs
            </span>
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Keyword Search Input */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">Search Activity / Keyword</label>
            <input
              type="text"
              placeholder="Search by offer, phone name, price, user..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 focus:border-vivo-500 focus:outline-none"
            />
          </div>

          {/* Date Picker Filter */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">Filter by Specific Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-vivo-500 focus:outline-none"
            />
          </div>

          {/* Action Type Category Filter */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">Filter by Action Category</label>
            <select
              value={selectedActionGroup}
              onChange={(e) => setSelectedActionGroup(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-vivo-500 focus:outline-none"
            >
              <option value="ALL">All Recorded Actions</option>
              <option value="OFFER">Store Offers & Schemes</option>
              <option value="PRODUCT">Product Creation & Updates</option>
              <option value="PRICE">Price Updates & Discounts</option>
              <option value="STOCK">Inventory, Stock & Shipments</option>
              <option value="BRAND">Brand Management</option>
              <option value="SETTINGS">Store Info & Settings</option>
              <option value="NOTIFY">Customer Notify Requests</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/40">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-origin-violet" />
            <span>Audit Trail Ledger</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">Immutable chronological activity stream</span>
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
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    <p className="font-semibold text-slate-300 text-sm">No audit logs matching your filter criteria.</p>
                    <p className="text-xs text-slate-500 mt-1">Try changing your search keyword, date, or action category filter.</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => {
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
