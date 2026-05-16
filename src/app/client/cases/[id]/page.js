'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Download, FileText, Gavel, Loader2 } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function CaseDetailPage() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/cases/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to load case');
        }

        setCaseData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCase();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="space-y-4">
        <Link href="/client/cases" className="inline-flex items-center gap-2 text-blue-600">
          <ArrowLeft size={18} /> Back to cases
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error || 'Case not found'}
        </div>
      </div>
    );
  }

  const feeTotal = caseData.retainerFee + caseData.otherFees + caseData.courtCharges;

  return (
    <div className="space-y-6">
      <Link href="/client/cases" className="inline-flex items-center gap-2 text-blue-600">
        <ArrowLeft size={18} /> Back to cases
      </Link>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">{caseData.caseNumber}</p>
            <h1 className="text-3xl font-bold mt-1">{caseData.title}</h1>
            <p className="text-gray-600 mt-2">{caseData.description || 'No description added.'}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium w-fit">
            {caseData.status}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
          <div>
            <p className="text-gray-500">Court</p>
            <p className="font-semibold">{caseData.courtName || 'TBD'}</p>
          </div>
          <div>
            <p className="text-gray-500">Judge / Officer</p>
            <p className="font-semibold">{caseData.judicialOfficer || 'TBD'}</p>
          </div>
          <div>
            <p className="text-gray-500">Next Hearing</p>
            <p className="font-semibold">{formatDate(caseData.nextHearingDate)}</p>
          </div>
          <div>
            <p className="text-gray-500">Assigned Expert</p>
            <p className="font-semibold">{caseData.assignedLawyer?.name || 'Not assigned'}</p>
          </div>
          <div>
            <p className="text-gray-500">Filing Date</p>
            <p className="font-semibold">{formatDate(caseData.filingDate)}</p>
          </div>
          <div>
            <p className="text-gray-500">Fee Total</p>
            <p className="font-semibold">{formatCurrency(feeTotal)}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Gavel size={20} /> Hearing History
          </h2>
          {caseData.hearings.length === 0 ? (
            <p className="text-gray-500 text-sm">No hearings recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {caseData.hearings.map((hearing) => (
                <div key={hearing.id} className="border rounded-xl p-4">
                  <div className="flex justify-between gap-3">
                    <p className="font-semibold">{formatDate(hearing.hearingDate)}</p>
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                      {hearing.hearingStatus}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Room {hearing.courtRoom || 'TBD'} - {hearing.judgeAssigned || caseData.judicialOfficer || 'Judge TBD'}
                  </p>
                  {hearing.outcome && <p className="text-sm mt-2">{hearing.outcome}</p>}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FileText size={20} /> Court Orders & Documents
          </h2>
          {caseData.courtOrders.length === 0 && caseData.documents.length === 0 ? (
            <p className="text-gray-500 text-sm">No court orders or documents attached.</p>
          ) : (
            <div className="space-y-3">
              {caseData.courtOrders.map((order) => (
                <a
                  key={order.id}
                  href={order.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border rounded-xl p-4 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-semibold">{order.orderType}</p>
                    <p className="text-sm text-gray-600">{formatDate(order.orderDate)}</p>
                  </div>
                  <Download size={18} className="text-blue-600" />
                </a>
              ))}
              {caseData.documents.map(({ document }) => (
                <a
                  key={document.id}
                  href={document.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border rounded-xl p-4 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-semibold">{document.documentName}</p>
                    <p className="text-sm text-gray-600">{document.documentType}</p>
                  </div>
                  <Download size={18} className="text-blue-600" />
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
