import { ProductStatus } from '../types';

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatDate(dateString?: string | null): string {
  if (!dateString) return 'N/A';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function formatDateTime(dateString?: string | null): string {
  if (!dateString) return 'N/A';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function getStatusBadgeConfig(status: ProductStatus) {
  switch (status) {
    case 'IN_STOCK':
      return {
        label: 'In Stock',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-400',
        animate: false,
      };
    case 'LOW_STOCK':
      return {
        label: 'Low Stock',
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        dot: 'bg-amber-400',
        animate: true, // Pulse only on Low Stock as per requirements Section 21.H
      };
    case 'COMING_SOON':
      return {
        label: 'Coming Soon',
        bg: 'bg-cyan-500/10',
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        dot: 'bg-cyan-400',
        animate: false,
      };
    case 'OUT_OF_STOCK':
      return {
        label: 'Out of Stock',
        bg: 'bg-slate-500/10',
        text: 'text-slate-400',
        border: 'border-slate-500/30',
        dot: 'bg-slate-400',
        animate: false,
      };
    case 'DISCONTINUED':
      return {
        label: 'Discontinued',
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        border: 'border-red-500/30',
        dot: 'bg-red-400',
        animate: false,
      };
    case 'HIDDEN':
      return {
        label: 'Hidden',
        bg: 'bg-gray-500/10',
        text: 'text-gray-400',
        border: 'border-gray-500/30',
        dot: 'bg-gray-400',
        animate: false,
      };
    default:
      return {
        label: status,
        bg: 'bg-slate-500/10',
        text: 'text-slate-400',
        border: 'border-slate-500/30',
        dot: 'bg-slate-400',
        animate: false,
      };
  }
}

export function calculateEMI(price: number, months: number = 6): number {
  return Math.round(price / months);
}
