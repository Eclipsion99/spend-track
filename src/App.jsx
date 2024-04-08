import SignUp from './pages/Signup'
import Landing from './pages/Landing'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import NoMatch from './pages/NoMatch'
import { useEffect, useState } from 'react'
import React from 'react'

function App() {

  const [token, setToken] = useState(false)

  if (token) {
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data)
    }
  }, [])

  return (
      <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/Signup' element={<SignUp/>}/>
        <Route path='/Login' element={<Login setToken={setToken}/>}/>
        {token?<Route path='/Homepage' element={<Homepage token={token}/>}/>:""}
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
    </div>
  )
}

export default App

// import {Routes, Route} from 'react-router-dom'
