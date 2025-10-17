import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to Election Portal
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Dynamic Form & Election Management System
        </h2>
        <p className="text-gray-600 mb-4">
          This portal enables administrators to create dynamic forms and elections, 
          while allowing customers to submit and manage their election-related data.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Admin Section */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Admin Tools</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Create and manage dynamic forms, elections, and configure webhooks for your organization.
          </p>
          <div className="space-y-2">
            <Link
              to="/admin/forms"
              className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
            >
              Form Builder
            </Link>
            <Link
              to="/admin/elections"
              className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
            >
              Election Builder
            </Link>
          </div>
        </div>

        {/* Customer Section */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Customer Portal</h3>
          </div>
          <p className="text-gray-600 mb-4">
            View assigned elections, fill out forms, and track your submissions.
          </p>
          <Link
            to="/customer/dashboard"
            className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>POC Mode:</strong> This is a proof-of-concept application. 
              Data is stored in-memory and will be lost on server restart.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

