'use client';

import React from 'react';
import { useStore } from '@/lib/store/store-context';
import { formatDateTime } from '@/lib/utils/formatters';
import { ShieldAlert, UserCheck, Clock, FileCode } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const { auditLogs } = useStore();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white font-display">System Audit Logs</h1>
        <p className="text-xs text-slate-400">Immutable security ledger recording every administrative mutation, price change & stock movement.</p>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-origin-violet" />
            <span>Recorded Admin Mutations ({auditLogs.length})</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900/90 border-b border-white/10 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Admin Email</th>
                <th className="p-4">Action Type</th>
                <th className="p-4">Entity Type / ID</th>
                <th className="p-4">Payload / Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 text-slate-400 whitespace-nowrap">{formatDateTime(log.created_at)}</td>
                  
                  <td className="p-4 font-semibold text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-vivo-400" />
                      <span>{log.admin_email}</span>
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-vivo-500/20 text-vivo-300 border border-vivo-500/30">
                      {log.action}
                    </span>
                  </td>

                  <td className="p-4 font-mono text-slate-300">
                    {log.entity_type} {log.entity_id ? `(${log.entity_id})` : ''}
                  </td>

                  <td className="p-4 font-mono text-[11px] text-slate-400 max-w-md truncate">
                    {JSON.stringify(log.details || {})}
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
