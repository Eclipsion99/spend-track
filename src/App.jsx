import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import NoMatch from './pages/NoMatch';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  }, [token]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Signup' element={<SignUp />} />
        <Route path='/Login' element={<Login setToken={setToken} />} />
        {token && <Route path='/Homepage' element={<Homepage token={token} />} />}
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;