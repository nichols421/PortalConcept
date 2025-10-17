import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FormBuilder from './pages/admin/FormBuilder';
import ElectionBuilder from './pages/admin/ElectionBuilder';
import CustomerDashboard from './pages/customer/CustomerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin/forms" element={<FormBuilder />} />
          <Route path="admin/elections" element={<ElectionBuilder />} />
          <Route path="customer/dashboard" element={<CustomerDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
