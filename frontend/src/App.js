import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"

import Login from "./components/login/Login"
import User from "./components/user/User"
import ResetPassword from "./components/login/ResetPassword"
import ResetPasswordFrom from "./components/login/ResetPasswordForm"
import Absence from "./components/absence/Absence"

axios.defaults.withCredentials = true

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  axios.get("http://localhost:8080/api/logedin").then(res => {
    setLoggedIn(res.data)
  })

  if(! loggedIn) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setLoggedIn={setLoggedIn}/>} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/user/reset-password" element={<ResetPasswordFrom />} />
          </Routes>
        </BrowserRouter>
      </>
    )
     
  }

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/user" element={<User/>} />
          <Route path="/user/:id/absence" element={<Absence />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
