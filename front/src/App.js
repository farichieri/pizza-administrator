import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import OrdersCreate from './pages/ordersCreate/OrdersCreate';
import Orders from './pages/orders/Orders';
import useToken from './hooks/useToken';
import useAdmin from './hooks/useAdmin';
import { useState } from 'react';

function App() {
  const { token, setToken } = useToken();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useAdmin().then(setIsAdmin).then(setIsLoading);

  if (!token) {
    return <Login setToken={setToken} />;
  }
  const ProtectedRoute = ({ children }) => {
    if (!isAdmin) {
      return <Navigate to='/' replace />;
    }
    return children;
  };
  if (!isLoading)
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to='/orders' />} />
            <Route path='/ordersCreate' element={<OrdersCreate />} />
            <Route path='/orders' element={<Orders />} />
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<p>There's nothing here</p>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
