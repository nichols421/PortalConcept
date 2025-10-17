import { useState, useEffect } from 'react';
import { electionsApi, submissionsApi, type Form } from '../../services/api';

export default function CustomerDashboard() {
  const [customerId] = useState(1); // Mock customer ID - in production, get from auth
  const [elections, setElections] = useState<any[]>([]);
  const [selectedElection, setSelectedElection] = useState<any | null>(null);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadElections();
    loadSubmissions();
  }, []);

  const loadElections = async () => {
    try {
      const data = await electionsApi.getAll();
      // In production, filter by customer assignments
      setElections(data);
    } catch (error) {
      console.error('Error loading elections:', error);
    }
  };

  const loadSubmissions = async () => {
    try {
      const data = await submissionsApi.getAll();
      // Filter submissions for current customer
      const customerSubmissions = data.filter((s: any) => s.customerId === customerId);
      setSubmissions(customerSubmissions);
    } catch (error) {
      console.error('Error loading submissions:', error);
    }
  };

  const selectElection = async (electionId: number) => {
    try {
      const electionDetails = await electionsApi.getById(electionId);
      setSelectedElection(electionDetails);
      setSelectedForm(null);
      setFormData({});
    } catch (error) {
      console.error('Error loading election details:', error);
    }
  };

  const selectForm = (form: any) => {
    setSelectedForm(form);
    setFormData({});
  };

  const handleInputChange = (questionId: string, value: any) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
  };

  const submitForm = async () => {
    if (!selectedForm) return;

    setLoading(true);
    try {
      await submissionsApi.create({
        formId: selectedForm.formId,
        customerId: customerId,
        dataJSON: formData,
      });

      alert('Form submitted successfully! Webhook triggered.');
      setFormData({});
      setSelectedForm(null);
      loadSubmissions();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  const renderFormField = (question: any) => {
    const value = formData[question.id] || '';

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={`Enter ${question.label.toLowerCase()}`}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={`Enter ${question.label.toLowerCase()}`}
          />
        );
      
      case 'dropdown':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select an option...</option>
            {question.options?.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Draft: 'bg-gray-200 text-gray-800',
      Submitted: 'bg-blue-200 text-blue-800',
      Approved: 'bg-green-200 text-green-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded ${styles[status] || 'bg-gray-200'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer Dashboard</h1>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <p className="text-blue-800">
          <strong>Logged in as:</strong> Jefferson County (Customer ID: {customerId})
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Elections List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">My Elections</h2>
          
          {elections.length === 0 ? (
            <p className="text-gray-600 text-sm">No elections assigned.</p>
          ) : (
            <div className="space-y-3">
              {elections.map((election) => (
                <button
                  key={election.electionId}
                  onClick={() => selectElection(election.electionId)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    selectedElection?.electionId === election.electionId
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-800">{election.name}</h3>
                  {election.type && (
                    <p className="text-sm text-gray-600 mt-1">{election.type}</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Forms for Selected Election */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Forms</h2>
          
          {!selectedElection ? (
            <p className="text-gray-600 text-sm">Select an election to view forms.</p>
          ) : selectedElection.forms?.length === 0 ? (
            <p className="text-gray-600 text-sm">No forms attached to this election.</p>
          ) : (
            <div className="space-y-3">
              {selectedElection.forms?.map((form: any) => (
                <button
                  key={form.formId}
                  onClick={() => selectForm(form)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    selectedForm?.formId === form.formId
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-800">{form.name}</h3>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Form Submission */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Submit Form</h2>
          
          {!selectedForm ? (
            <p className="text-gray-600 text-sm">Select a form to fill out.</p>
          ) : (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">{selectedForm.name}</h3>
              
              <form onSubmit={(e) => { e.preventDefault(); submitForm(); }} className="space-y-4">
                {selectedForm.schemaJSON?.questions?.map((question: any) => (
                  <div key={question.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {question.label}
                      {question.type === 'dropdown' && ' *'}
                    </label>
                    {renderFormField(question)}
                  </div>
                ))}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition disabled:bg-gray-400 font-semibold"
                >
                  {loading ? 'Submitting...' : 'Submit Form'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Submissions History */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">My Submissions</h2>
        
        {submissions.length === 0 ? (
          <p className="text-gray-600">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Form
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.submissionId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission.formName || `Form ${submission.formId}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(submission.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.submittedDate 
                        ? new Date(submission.submittedDate).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.approvedDate 
                        ? new Date(submission.approvedDate).toLocaleDateString()
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

