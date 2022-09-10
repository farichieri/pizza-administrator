import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Cashier from './pages/cashier/Cashier';
import Home from './pages/home/Home';
import Kitchen from './pages/kitchen/Kitchen';
import useToken from './hooks/useToken';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Navigate to='/kitchen' />} />
          {/* <Route exact path='/' element={<Home />} /> */}
          <Route exact path='/cashier' element={<Cashier />} />
          <Route exact path='/kitchen' element={<Kitchen />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
