'use client';

import { useEffect, useState } from 'react';
import { Loader2, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function HearingsPage() {
  const [hearings, setHearings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHearings();
  }, []);

  const fetchHearings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cases');
      const cases = await res.json();

      // Extract all hearings from cases
      const allHearings = [];
      for (const caseItem of cases) {
        if (caseItem.hearings && caseItem.hearings.length > 0) {
          allHearings.push(
            ...caseItem.hearings.map((h) => ({
              ...h,
              caseName: caseItem.title,
              caseNumber: caseItem.caseNumber,
            }))
          );
        }
      }

      // Sort by date
      allHearings.sort(
        (a, b) => new Date(a.hearingDate) - new Date(b.hearingDate)
      );

      setHearings(allHearings);
      setError(null);
    } catch (err) {
      console.error('Error fetching hearings:', err);
      setError('Failed to load hearings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Hearing Calendar</h1>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hearing Calendar</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {hearings.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border shadow-sm text-center">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No hearings scheduled</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-bold">Case</th>
                <th className="p-4 font-bold">Hearing Date</th>
                <th className="p-4 font-bold">Court</th>
                <th className="p-4 font-bold">Room</th>
                <th className="p-4 font-bold">Judge</th>
                <th className="p-4 font-bold">Status</th>
              </tr>
            </thead>

            <tbody>
              {hearings.map((hearing, idx) => (
                <tr key={hearing.id || idx} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{hearing.caseName}</p>
                      <p className="text-xs text-gray-500">{hearing.caseNumber}</p>
                    </div>
                  </td>
                  <td className="p-4">{formatDate(new Date(hearing.hearingDate))}</td>
                  <td className="p-4">{hearing.courtName || 'TBD'}</td>
                  <td className="p-4">{hearing.courtRoom || 'TBD'}</td>
                  <td className="p-4">{hearing.judgeAssigned || 'TBD'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      hearing.hearingStatus === 'COMPLETED'
                        ? 'bg-green-100 text-green-800'
                        : hearing.hearingStatus === 'SCHEDULED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {hearing.hearingStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}