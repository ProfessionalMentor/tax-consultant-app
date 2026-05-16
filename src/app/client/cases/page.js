'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function CasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cases');
      const data = await res.json();
      setCases(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching cases:', err);
      setError('Failed to load cases');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
      case 'HEARING':
        return 'bg-blue-100 text-blue-800';
      case 'WON':
        return 'bg-green-100 text-green-800';
      case 'LOST':
        return 'bg-red-100 text-red-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Case Management</h1>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Case Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={20} /> New Case
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {cases.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border shadow-sm text-center">
          <p className="text-gray-500">No cases found. Contact your lawyer to add cases.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {cases.map((item) => (
            <Link href={`/client/cases/${item.id}`} key={item.id}>
              <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <div className="space-y-2 text-gray-600 text-sm">
                  <p>
                    <b>Case Number:</b> {item.caseNumber}
                  </p>
                  <p>
                    <b>Type:</b> {item.type}
                  </p>
                  {item.courtName && (
                    <p>
                      <b>Court:</b> {item.courtName}
                    </p>
                  )}
                  {item.nextHearingDate && (
                    <p>
                      <b>Next Hearing:</b> {formatDate(new Date(item.nextHearingDate))}
                    </p>
                  )}
                </div>

                {item.assignedLawyer && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      Assigned to: <b>{item.assignedLawyer.name}</b>
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}