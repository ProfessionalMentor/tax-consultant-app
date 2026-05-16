'use client';

import { useEffect, useState } from 'react';
import { Loader2, Download, Upload, FileText, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('CNIC');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/documents');
      const data = await res.json();
      setDocuments(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('documentName', selectedFile.name);
      formData.append('documentType', documentType);
      formData.append('description', `Uploaded on ${new Date().toLocaleDateString()}`);
      formData.append('isConfidential', 'true');

      const res = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload document');

      setSelectedFile(null);
      setDocumentType('CNIC');
      await fetchDocuments();
      alert('Document uploaded successfully');
    } catch (err) {
      console.error('Error uploading document:', err);
      alert('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const res = await fetch(`/api/documents/${docId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete document');

      await fetchDocuments();
    } catch (err) {
      console.error('Error deleting document:', err);
      alert('Failed to delete document');
    }
  };

  const documentTypeOptions = [
    'CNIC',
    'NTN_CERTIFICATE',
    'STRN_CERTIFICATE',
    'BANK_STATEMENT',
    'PROPERTY_DEED',
    'COURT_ORDER',
    'LEGAL_OPINION',
    'PETITION',
    'MEMORANDUM',
    'ARTICLES_OF_ASSOCIATION',
    'INCORPORATION_CERT',
    'TAX_RETURN',
    'FORM_A',
    'FORM_21',
    'FORM_29',
    'OTHER',
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Document Vault</h1>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Document Vault</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Upload Documents</h2>
        <p className="text-blue-800 mb-4">
          Upload CNIC, bank statements, property documents, FIR copy, tax data and company files.
        </p>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Document Type</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full p-2 border rounded-lg"
                disabled={uploading}
              >
                {documentTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select File</label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded-lg"
                disabled={uploading}
                accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Upload size={20} />
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>
      </div>

      {/* Documents Table */}
      {documents.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border shadow-sm text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No documents uploaded yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Your Documents</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-left font-bold">Document Name</th>
                  <th className="p-4 text-left font-bold">Type</th>
                  <th className="p-4 text-left font-bold">Size</th>
                  <th className="p-4 text-left font-bold">Uploaded</th>
                  <th className="p-4 text-left font-bold">Status</th>
                  <th className="p-4 text-left font-bold">Action</th>
                </tr>
              </thead>

              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FileText size={18} className="text-gray-400" />
                        <span className="font-medium truncate">{doc.documentName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{doc.documentType}</td>
                    <td className="p-4 text-sm text-gray-600">
                      {(doc.fileSize / 1024).toFixed(2)} KB
                    </td>
                    <td className="p-4 text-sm">
                      {formatDate(new Date(doc.uploadedAt))}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        doc.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          title="Download"
                        >
                          <Download size={16} />
                        </a>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confidentiality Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <p className="text-sm text-yellow-800">
          🔒 <span className="font-medium">Confidentiality Notice:</span> All documents are encrypted and securely stored. Only you and your assigned lawyer/accountant can access them.
        </p>
      </div>
    </div>
  );
}
