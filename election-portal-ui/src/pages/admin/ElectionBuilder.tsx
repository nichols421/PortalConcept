import { useState, useEffect } from 'react';
import { electionsApi, customersApi, formsApi, webhooksApi, type Election, type Customer, type Form } from '../../services/api';

export default function ElectionBuilder() {
  const [elections, setElections] = useState<Election[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [forms, setForms] = useState<Form[]>([]);
  
  const [electionName, setElectionName] = useState('');
  const [electionType, setElectionType] = useState('');
  const [electionState, setElectionState] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectedForms, setSelectedForms] = useState<number[]>([]);
  const [webhookUrlSubmitted, setWebhookUrlSubmitted] = useState('');
  const [webhookUrlApproved, setWebhookUrlApproved] = useState('');
  const [currentElectionId, setCurrentElectionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [electionsData, customersData, formsData] = await Promise.all([
        electionsApi.getAll(),
        customersApi.getAll(),
        formsApi.getAll(),
      ]);
      setElections(electionsData);
      setCustomers(customersData);
      setForms(formsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const createElection = async () => {
    if (!electionName) {
      alert('Please provide an election name');
      return;
    }

    setLoading(true);
    try {
      const newElection = await electionsApi.create({
        name: electionName,
        type: electionType || undefined,
        state: electionState || undefined,
      });
      
      setCurrentElectionId(newElection.electionId);
      alert('Election created! Now assign customers and forms.');
      loadData();
    } catch (error) {
      console.error('Error creating election:', error);
      alert('Error creating election');
    } finally {
      setLoading(false);
    }
  };

  const assignCustomersToElection = async () => {
    if (!currentElectionId || selectedCustomers.length === 0) {
      alert('Please select customers');
      return;
    }

    setLoading(true);
    try {
      await electionsApi.assignCustomers(currentElectionId, selectedCustomers);
      alert('Customers assigned successfully!');
    } catch (error) {
      console.error('Error assigning customers:', error);
      alert('Error assigning customers');
    } finally {
      setLoading(false);
    }
  };

  const attachFormsToElection = async () => {
    if (!currentElectionId || selectedForms.length === 0) {
      alert('Please select forms');
      return;
    }

    setLoading(true);
    try {
      await electionsApi.attachForms(currentElectionId, selectedForms);
      alert('Forms attached successfully!');
    } catch (error) {
      console.error('Error attaching forms:', error);
      alert('Error attaching forms');
    } finally {
      setLoading(false);
    }
  };

  const configureWebhooks = async () => {
    if (!currentElectionId) {
      alert('Please create an election first');
      return;
    }

    setLoading(true);
    try {
      const promises = [];
      
      if (webhookUrlSubmitted) {
        promises.push(webhooksApi.create({
          electionId: currentElectionId,
          eventType: 0, // Submitted
          url: webhookUrlSubmitted,
        }));
      }
      
      if (webhookUrlApproved) {
        promises.push(webhooksApi.create({
          electionId: currentElectionId,
          eventType: 1, // Approved
          url: webhookUrlApproved,
        }));
      }

      await Promise.all(promises);
      alert('Webhooks configured successfully!');
      setWebhookUrlSubmitted('');
      setWebhookUrlApproved('');
    } catch (error) {
      console.error('Error configuring webhooks:', error);
      alert('Error configuring webhooks');
    } finally {
      setLoading(false);
    }
  };

  const toggleCustomer = (customerId: number) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const toggleForm = (formId: number) => {
    setSelectedForms(prev =>
      prev.includes(formId)
        ? prev.filter(id => id !== formId)
        : [...prev, formId]
    );
  };

  const resetForm = () => {
    setElectionName('');
    setElectionType('');
    setElectionState('');
    setSelectedCustomers([]);
    setSelectedForms([]);
    setWebhookUrlSubmitted('');
    setWebhookUrlApproved('');
    setCurrentElectionId(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Election Builder</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Election Creator */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Step 1: Create Election
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Election Name *
                </label>
                <input
                  type="text"
                  value={electionName}
                  onChange={(e) => setElectionName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Spring 2026 General"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Election Type
                </label>
                <select
                  value={electionType}
                  onChange={(e) => setElectionType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type...</option>
                  <option value="Primary">Primary</option>
                  <option value="General">General</option>
                  <option value="Special">Special</option>
                  <option value="Runoff">Runoff</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={electionState}
                  onChange={(e) => setElectionState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Colorado"
                />
              </div>

              <button
                onClick={createElection}
                disabled={loading || !electionName}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Creating...' : 'Create Election'}
              </button>

              {currentElectionId && (
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <p className="text-sm text-green-800">
                    ✓ Election created (ID: {currentElectionId})
                  </p>
                </div>
              )}
            </div>
          </div>

          {currentElectionId && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Step 2: Assign Customers
                </h2>
                
                <div className="space-y-2 mb-4">
                  {customers.map((customer) => (
                    <label key={customer.customerId} className="flex items-center p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.customerId)}
                        onChange={() => toggleCustomer(customer.customerId)}
                        className="mr-3 h-4 w-4 text-blue-600"
                      />
                      <span>{customer.name}</span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={assignCustomersToElection}
                  disabled={loading || selectedCustomers.length === 0}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  Assign Customers
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Step 3: Attach Forms
                </h2>
                
                <div className="space-y-2 mb-4">
                  {forms.length === 0 ? (
                    <p className="text-gray-600 text-sm">No forms available. Create forms first.</p>
                  ) : (
                    forms.map((form) => (
                      <label key={form.formId} className="flex items-center p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedForms.includes(form.formId)}
                          onChange={() => toggleForm(form.formId)}
                          className="mr-3 h-4 w-4 text-blue-600"
                        />
                        <span>{form.name}</span>
                      </label>
                    ))
                  )}
                </div>

                <button
                  onClick={attachFormsToElection}
                  disabled={loading || selectedForms.length === 0}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  Attach Forms
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Step 4: Configure Webhooks
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook URL (Form Submitted)
                    </label>
                    <input
                      type="text"
                      value={webhookUrlSubmitted}
                      onChange={(e) => setWebhookUrlSubmitted(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="http://localhost:5000/api/webhooks/test"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook URL (Form Approved)
                    </label>
                    <input
                      type="text"
                      value={webhookUrlApproved}
                      onChange={(e) => setWebhookUrlApproved(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="http://localhost:5000/api/webhooks/test"
                    />
                  </div>

                  <button
                    onClick={configureWebhooks}
                    disabled={loading || (!webhookUrlSubmitted && !webhookUrlApproved)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
                  >
                    Configure Webhooks
                  </button>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-xs text-yellow-800">
                    <strong>Example Payload:</strong> Webhooks will send JSON with event type, election, customer, form, and data.
                  </p>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Reset & Create New Election
              </button>
            </>
          )}
        </div>

        {/* Existing Elections */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Existing Elections</h2>
          
          {elections.length === 0 ? (
            <p className="text-gray-600">No elections created yet.</p>
          ) : (
            <div className="space-y-4">
              {elections.map((election) => (
                <div key={election.electionId} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-800 text-lg">{election.name}</h3>
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    {election.type && <p><strong>Type:</strong> {election.type}</p>}
                    {election.state && <p><strong>State:</strong> {election.state}</p>}
                  </div>
                  <button
                    onClick={() => setCurrentElectionId(election.electionId)}
                    className="mt-3 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
                  >
                    Edit This Election
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

