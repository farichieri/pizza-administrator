import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Cashier from './pages/cashier/Cashier';
import Kitchen from './pages/kitchen/Kitchen';
import useToken from './hooks/useToken';
import { useSelector } from 'react-redux';

function App() {
  const { token, setToken } = useToken();
  const isAdmin = useSelector((state) => state.isAdmin);

  if (!token) {
    return <Login setToken={setToken} />;
  }
  const ProtectedRoute = ({ children }) => {
    if (!isAdmin) {
      return <Navigate to='/' replace />;
    }
    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/kitchen' />} />
          <Route path='/cashier' element={<Cashier />} />
          <Route path='/kitchen' element={<Kitchen />} />
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
