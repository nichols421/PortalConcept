const API_BASE_URL = 'http://localhost:5000/api';

export interface Customer {
  customerId: number;
  name: string;
}

export interface Election {
  electionId: number;
  name: string;
  type?: string;
  state?: string;
}

export interface Form {
  formId: number;
  name: string;
  schemaJSON: any;
}

export interface Submission {
  submissionId: number;
  formId: number;
  customerId: number;
  dataJSON: any;
  status: 'Draft' | 'Submitted' | 'Approved';
  submittedDate?: string;
  approvedDate?: string;
}

export interface Webhook {
  webhookId: number;
  electionId: number;
  eventType: number; // 0 = Submitted, 1 = Approved
  url: string;
}

// Customers API
export const customersApi = {
  getAll: async (): Promise<Customer[]> => {
    const response = await fetch(`${API_BASE_URL}/customers`);
    return response.json();
  },
  
  getById: async (id: number): Promise<Customer> => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`);
    return response.json();
  },
  
  create: async (customer: Omit<Customer, 'customerId'>): Promise<Customer> => {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    return response.json();
  },
};

// Elections API
export const electionsApi = {
  getAll: async (): Promise<Election[]> => {
    const response = await fetch(`${API_BASE_URL}/elections`);
    return response.json();
  },
  
  getById: async (id: number): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/elections/${id}`);
    return response.json();
  },
  
  create: async (election: Omit<Election, 'electionId'>): Promise<Election> => {
    const response = await fetch(`${API_BASE_URL}/elections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(election),
    });
    return response.json();
  },
  
  assignCustomers: async (electionId: number, customerIds: number[]): Promise<void> => {
    await fetch(`${API_BASE_URL}/elections/${electionId}/assign-customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerIds }),
    });
  },
  
  attachForms: async (electionId: number, formIds: number[]): Promise<void> => {
    await fetch(`${API_BASE_URL}/elections/${electionId}/attach-forms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formIds }),
    });
  },
};

// Forms API
export const formsApi = {
  getAll: async (): Promise<Form[]> => {
    const response = await fetch(`${API_BASE_URL}/forms`);
    return response.json();
  },
  
  getById: async (id: number): Promise<Form> => {
    const response = await fetch(`${API_BASE_URL}/forms/${id}`);
    return response.json();
  },
  
  create: async (form: Omit<Form, 'formId'>): Promise<Form> => {
    const response = await fetch(`${API_BASE_URL}/forms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    return response.json();
  },
  
  update: async (id: number, form: Omit<Form, 'formId'>): Promise<void> => {
    await fetch(`${API_BASE_URL}/forms/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
  },
  
  delete: async (id: number): Promise<void> => {
    await fetch(`${API_BASE_URL}/forms/${id}`, {
      method: 'DELETE',
    });
  },
};

// Submissions API
export const submissionsApi = {
  getAll: async (): Promise<Submission[]> => {
    const response = await fetch(`${API_BASE_URL}/submissions`);
    return response.json();
  },
  
  getById: async (id: number): Promise<Submission> => {
    const response = await fetch(`${API_BASE_URL}/submissions/${id}`);
    return response.json();
  },
  
  create: async (submission: {
    formId: number;
    customerId: number;
    dataJSON: any;
  }): Promise<Submission> => {
    const response = await fetch(`${API_BASE_URL}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    return response.json();
  },
  
  approve: async (id: number): Promise<void> => {
    await fetch(`${API_BASE_URL}/submissions/${id}/approve`, {
      method: 'PUT',
    });
  },
};

// Webhooks API
export const webhooksApi = {
  getAll: async (): Promise<Webhook[]> => {
    const response = await fetch(`${API_BASE_URL}/webhooks`);
    return response.json();
  },
  
  create: async (webhook: Omit<Webhook, 'webhookId'>): Promise<Webhook> => {
    const response = await fetch(`${API_BASE_URL}/webhooks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhook),
    });
    return response.json();
  },
};

