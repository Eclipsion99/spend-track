import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/Signup';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import NoMatch from './pages/NoMatch';

function App() {
  const [token, setToken] = useState(null);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
    setIsTokenChecked(true); 
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isTokenChecked) {
      return null;
    }

    if (!token) {
      return <Navigate to="/Login" replace />;
    }

    return children; 
  };

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Signup' element={<SignUp />} />
        <Route path='/Login' element={<Login setToken={setToken} />} />
        <Route path='/Homepage' element={
          <ProtectedRoute>
            <Homepage token={token} />
          </ProtectedRoute>
        } />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;