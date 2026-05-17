'use client';

import { useEffect, useState } from 'react';
import {
  Briefcase,
  FileCheck,
  AlertTriangle,
  Gavel,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch cases
      const casesRes = await fetch('/api/cases');
      const cases = await casesRes.json();

      // Fetch tax records
      const taxRes = await fetch('/api/tax-records');
      const taxRecords = await taxRes.json();

      // Fetch invoices
      const invoicesRes = await fetch('/api/invoices');
      const invoices = await invoicesRes.json();

      // Fetch notifications
      const notificationsRes = await fetch('/api/notifications');
      const notifications = await notificationsRes.json();

      // Calculate stats
      const activeCases = cases.filter(c => c.status === 'ACTIVE' || c.status === 'HEARING').length;
      const nextHearing = cases
        .filter(c => c.nextHearingDate)
        .sort((a, b) => new Date(a.nextHearingDate) - new Date(b.nextHearingDate))[0];
      
      const taxStatus = cases.find(c => c.type === 'TAXATION')?.status || 'Active';
      const pendingAlerts = notifications.filter(n => !n.isRead).length;
      const pendingInvoices = invoices.filter(i => i.invoiceStatus === 'PENDING' || i.invoiceStatus === 'OVERDUE').length;

      setStats({
        activeCases,
        nextHearing,
        taxStatus,
        pendingAlerts,
        pendingInvoices,
        totalCases: cases.length,
      });
      
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const statCards = [
    {
      title: 'Active Cases',
      value: stats?.activeCases || '0',
      desc: 'Civil & criminal matters',
      icon: Briefcase,
      href: '/client/cases',
    },
    {
      title: 'Next Hearing',
      value: stats?.nextHearing ? formatDate(stats.nextHearing.nextHearingDate) : 'N/A',
      desc: stats?.nextHearing?.courtName || 'District Court',
      icon: Gavel,
      href: '/client/hearings',
    },
    {
      title: 'Tax Status',
      value: 'Active',
      desc: 'FBR compliant',
      icon: FileCheck,
      href: '/client/tax-compliance',
    },
    {
      title: 'Pending Alerts',
      value: stats?.pendingAlerts || '0',
      desc: 'Notifications',
      icon: AlertTriangle,
      href: '/client/notifications',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Client Dashboard</h1>
          <p className="text-slate-400">Overview of your legal and tax matters.</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-gold" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Client Dashboard</h1>
        <p className="text-slate-400">Overview of your legal and tax matters.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-5">
        {statCards.map((item) => {
          const Icon = item.icon;

          return (
            <Link href={item.href} key={item.title}>
              <div className="bg-black rounded-2xl p-5 shadow-sm border border-white/5 hover:border-gold/30 transition-all cursor-pointer h-full">
                <Icon className="mb-4 text-gold" size={24} />

                <h3 className="text-slate-400 text-sm">{item.title}</h3>

                <p className="text-2xl font-black text-white">{item.value}</p>

                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Summary Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <div className="bg-black rounded-2xl p-6 shadow-sm border border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">Recent Cases</h2>
          <div className="space-y-3">
            {stats?.totalCases > 0 ? (
              <p className="text-sm text-slate-300">
                You have {stats.totalCases} total cases
              </p>
            ) : (
              <p className="text-sm text-slate-500">No cases yet</p>
            )}
            <Link
              href="/client/cases"
              className="inline-block text-cyan hover:text-gold font-bold text-sm transition-colors"
            >
              View all cases →
            </Link>
          </div>
        </div>

        {/* Pending Invoices */}
        <div className="bg-black rounded-2xl p-6 shadow-sm border border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">Billing</h2>
          <div className="space-y-3">
            {stats?.pendingInvoices > 0 ? (
              <p className="text-sm text-slate-300">
                {stats.pendingInvoices} invoice(s) pending
              </p>
            ) : (
              <p className="text-sm text-slate-500">All invoices paid</p>
            )}
            <Link
              href="/client/billing"
              className="inline-block text-cyan hover:text-gold font-bold text-sm transition-colors"
            >
              View invoices →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}