import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import SeverityBadge from '../components/SeverityBadge';

export default function ReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport]       = useState(null);
  const [loading, setLoading]     = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    api.get(`/api/reports/${id}`)
      .then(r => setReport(r.data))
      .finally(() => setLoading(false));
  }, [id]);

  const triggerAI = async (type) => {
    setAiLoading(true);
    try {
      await api.post(`/api/reports/${id}/ai/${type}`);
      const r = await api.get(`/api/reports/${id}`);
      setReport(r.data);
    } finally {
      setAiLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Soft delete this report?')) return;
    await api.delete(`/api/reports/${id}`);
    navigate('/reports');
  };

  if (loading) return (
    <Layout>
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </Layout>
  );

  if (!report) return (
    <Layout>
      <div className="p-6 text-red-500">Report not found.</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate('/reports')}
            className="text-primary hover:underline text-sm">
            ← Back to Reports
          </button>
          <div className="flex gap-2">
            <button onClick={() => navigate(`/reports/${id}/edit`)}
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              ✏️ Edit
            </button>
            <button onClick={handleDelete}
              className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-50">
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Report Info */}
        <div className="bg-white rounded-xl shadow p-6 mb-4">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-xl font-bold text-gray-800 flex-1 mr-4">{report.title}</h1>
            <div className="flex gap-2 shrink-0">
              <SeverityBadge severity={report.severity} />
              <StatusBadge status={report.status} />
            </div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">{report.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><p className="text-gray-400 text-xs">Category</p><p className="font-medium mt-1">{report.category}</p></div>
            <div><p className="text-gray-400 text-xs">Department</p><p className="font-medium mt-1">{report.department || '—'}</p></div>
            <div><p className="text-gray-400 text-xs">Incident Date</p><p className="font-medium mt-1">{report.incidentDate || '—'}</p></div>
            <div><p className="text-gray-400 text-xs">Submitted</p><p className="font-medium mt-1">{new Date(report.createdAt).toLocaleDateString()}</p></div>
          </div>
        </div>

        {/* AI Panel */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">🤖 AI Analysis</h2>

          {aiLoading && (
            <div className="flex items-center gap-3 py-4 text-blue-600 text-sm">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              AI is analyzing this report...
            </div>
          )}

          {report.aiDescription ? (
            <div className="bg-blue-50 rounded-lg p-4 mb-3">
              <h3 className="font-medium text-blue-800 mb-2 text-sm">📝 AI Description</h3>
              <p className="text-sm text-blue-700">{report.aiDescription}</p>
            </div>
          ) : (
            <button onClick={() => triggerAI('describe')} disabled={aiLoading}
              className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg text-sm hover:bg-blue-100 mr-2 mb-3 disabled:opacity-50">
              Generate AI Description
            </button>
          )}

          {report.aiRecommendations ? (
            <div className="bg-green-50 rounded-lg p-4 mb-3">
              <h3 className="font-medium text-green-800 mb-2 text-sm">💡 AI Recommendations</h3>
              <p className="text-sm text-green-700 whitespace-pre-wrap">{report.aiRecommendations}</p>
            </div>
          ) : (
            <button onClick={() => triggerAI('recommend')} disabled={aiLoading}
              className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm hover:bg-green-100 mr-2 mb-3 disabled:opacity-50">
              Get AI Recommendations
            </button>
          )}

          {report.aiReport ? (
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-800 mb-2 text-sm">📊 AI Full Report</h3>
              <p className="text-sm text-purple-700 whitespace-pre-wrap">{report.aiReport}</p>
            </div>
          ) : (
            <button onClick={() => triggerAI('report')} disabled={aiLoading}
              className="bg-purple-50 text-purple-700 border border-purple-200 px-4 py-2 rounded-lg text-sm hover:bg-purple-100 disabled:opacity-50">
              Generate Full AI Report
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}