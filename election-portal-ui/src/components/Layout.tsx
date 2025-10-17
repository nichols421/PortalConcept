import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold">
              Election Portal
            </Link>
            
            <div className="flex space-x-6">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${
                  isActive('/') ? 'bg-blue-700' : ''
                }`}
              >
                Home
              </Link>
              <Link
                to="/admin/forms"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${
                  isActive('/admin/forms') ? 'bg-blue-700' : ''
                }`}
              >
                Form Builder
              </Link>
              <Link
                to="/admin/elections"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${
                  isActive('/admin/elections') ? 'bg-blue-700' : ''
                }`}
              >
                Election Builder
              </Link>
              <Link
                to="/customer/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${
                  isActive('/customer/dashboard') ? 'bg-blue-700' : ''
                }`}
              >
                Customer Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

