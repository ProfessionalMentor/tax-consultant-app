'use client';

import { useEffect, useState } from 'react';
import { Loader2, FileText, Download } from 'lucide-react';

export default function TaxCompliancePage() {
  const [taxRecords, setTaxRecords] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTaxData();
  }, []);

  const fetchTaxData = async () => {
    try {
      setLoading(true);

      // Fetch tax records
      const taxRes = await fetch('/api/tax-records');
      const taxData = await taxRes.json();
      setTaxRecords(Array.isArray(taxData) ? taxData : []);

      setError(null);
    } catch (err) {
      console.error('Error fetching tax data:', err);
      setError('Failed to load tax records');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'FILED':
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Build compliance cards from records
  const complianceCards = [
    {
      title: 'NTN Certificate',
      type: 'FBR',
      status: 'Available',
      icon: FileText,
    },
    {
      title: 'STRN Certificate',
      type: 'Sales Tax',
      status: 'Available',
      icon: FileText,
    },
    {
      title: 'PRA Registration',
      type: 'PRA',
      status: taxRecords.find((r) => r.recordType === 'PRA_COMPLIANCE')?.praStatus || 'Active',
      icon: FileText,
    },
    {
      title: 'ePADS Status',
      type: 'ePADS',
      status: taxRecords.find((r) => r.recordType === 'EPADS_STATUS')?.epadsStatus || 'Completed',
      icon: FileText,
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Tax & Corporate Compliance</h1>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tax & Corporate Compliance</h1>
        <p className="text-gray-600 mt-2">
          FBR, Sales Tax, SECP, PRA and ePADS records in one place.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Compliance Status Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {complianceCards.map((item) => (
          <div key={item.title} className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-blue-600 font-semibold flex items-center gap-2">
              <FileText size={16} />
              {item.type}
            </p>
            <h2 className="text-lg font-bold mt-2">{item.title}</h2>
            <div className="mt-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                item.status
              )}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tax Records Table */}
      {taxRecords.length > 0 && (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Tax Filing History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-left font-bold">Type</th>
                  <th className="p-4 text-left font-bold">Tax Year</th>
                  <th className="p-4 text-left font-bold">Status</th>
                  <th className="p-4 text-left font-bold">Filed Date</th>
                  <th className="p-4 text-left font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {taxRecords.map((record) => (
                  <tr key={record.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{record.recordType}</td>
                    <td className="p-4">{record.taxYear}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        record.filingStatus
                      )}`}>
                        {record.filingStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      {record.filedDate ? new Date(record.filedDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4">
                      {record.incomeTaxReturn && (
                        <a
                          href={record.incomeTaxReturn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Download size={16} /> Download
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notices Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-yellow-900">Audit & Legal Notices</h2>
        {taxRecords.some((r) => r.noticeReceived) ? (
          <div className="space-y-3">
            {taxRecords
              .filter((r) => r.noticeReceived)
              .map((record) => (
                <div key={record.id} className="bg-white p-4 rounded-lg border border-yellow-200">
                  <p className="font-medium">{record.recordType} - Notice</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Received: {new Date(record.noticeDate).toLocaleDateString()}
                  </p>
                  {record.noticeDocumentUrl && (
                    <a
                      href={record.noticeDocumentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 mt-2"
                    >
                      <Download size={14} /> View Notice
                    </a>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-yellow-800">No audit or legal notices at this time.</p>
        )}
      </div>
    </div>
  );
}