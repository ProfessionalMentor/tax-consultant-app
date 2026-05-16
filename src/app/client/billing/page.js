'use client';

import { useEffect, useState } from 'react';
import { Loader2, CreditCard, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function BillingPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/invoices');
      const data = await res.json();
      setInvoices(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching invoices:', err);
      setError('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    return {
      totalBilled: invoices.reduce((sum, inv) => sum + inv.amountBilled, 0),
      totalPaid: invoices.reduce((sum, inv) => sum + inv.amountPaid, 0),
      pendingDues: invoices.reduce((sum, inv) => sum + inv.balanceDue, 0),
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800';
      case 'PARTIALLY_PAID':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totals = calculateTotals();

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Billing, Invoices & Payments</h1>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Billing, Invoices & Payments</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Billed</p>
              <h2 className="text-2xl font-bold text-blue-600 mt-2">
                {formatCurrency(totals.totalBilled)}
              </h2>
            </div>
            <DollarSign className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Paid</p>
              <h2 className="text-2xl font-bold text-green-600 mt-2">
                {formatCurrency(totals.totalPaid)}
              </h2>
            </div>
            <CreditCard className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Pending Due</p>
              <h2 className={`text-2xl font-bold mt-2 ${
                totals.pendingDues > 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {formatCurrency(totals.pendingDues)}
              </h2>
            </div>
            <DollarSign className={totals.pendingDues > 0 ? 'text-red-600' : 'text-green-600'} size={24} />
          </div>
        </div>
      </div>

      {/* Fee Breakdown Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h2 className="font-bold text-blue-900 mb-4">Fee Structure</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="text-sm text-blue-800">
            <p>💼 <span className="font-medium">Retainer Fee:</span> Initial comprehensive fee</p>
          </div>
          <div className="text-sm text-blue-800">
            <p>⚖️ <span className="font-medium">Per Hearing Fee:</span> Fee for each court appearance</p>
          </div>
          <div className="text-sm text-blue-800">
            <p>📋 <span className="font-medium">Government Filing Fees:</span> Court and filing charges</p>
          </div>
          <div className="text-sm text-blue-800">
            <p>💳 <span className="font-medium">Payment Methods:</span> Bank Transfer, Raast, Digital Payment</p>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      {invoices.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border shadow-sm text-center">
          <CreditCard size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No invoices yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Invoice History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-left font-bold">Invoice ID</th>
                  <th className="p-4 text-left font-bold">Description</th>
                  <th className="p-4 text-left font-bold">Amount</th>
                  <th className="p-4 text-left font-bold">Paid</th>
                  <th className="p-4 text-left font-bold">Due</th>
                  <th className="p-4 text-left font-bold">Status</th>
                  <th className="p-4 text-left font-bold">Due Date</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{invoice.invoiceNumber}</td>
                    <td className="p-4">{invoice.description}</td>
                    <td className="p-4">{formatCurrency(invoice.amountBilled)}</td>
                    <td className="p-4 text-green-600">{formatCurrency(invoice.amountPaid)}</td>
                    <td className="p-4 text-red-600">{formatCurrency(invoice.balanceDue)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        invoice.invoiceStatus
                      )}`}>
                        {invoice.invoiceStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Instructions */}
      <div className="bg-gray-50 border rounded-2xl p-6">
        <h2 className="font-bold mb-4">Payment Instructions</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• Bank Transfer: Provide your invoice number as reference</p>
          <p>• Raast/Digital Payment: Use your invoice number as description</p>
          <p>• Online Payment: Click the payment link in your invoice email</p>
          <p>• Contact your lawyer for payment arrangements</p>
        </div>
      </div>
    </div>
  );
}