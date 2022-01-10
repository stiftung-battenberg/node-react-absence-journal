import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import '@themesberg/flowbite'
import axios from "axios"

import Login from "./components/login/Login"
import User from "./components/user/User"
import ResetPassword from "./components/login/ResetPassword"
import ResetPasswordForm from "./components/login/ResetPasswordForm"
import Absence from "./components/absence/Absence"
import Absences from "./components/absence/Absences"
import Journal from './components/journal/Journal'

axios.defaults.withCredentials = true

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)
  
  axios.get("http://localhost:8080/api/loggedin").then(res => {
    setLoggedIn(res.data)
  })

  if(! loggedIn) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setLoggedIn={setLoggedIn}/>} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/user/reset-password" element={<ResetPasswordForm />} />
          </Routes>
        </BrowserRouter>
      </>
    ) 
  }
  
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<User/>} />
          <Route path="/user/:id/absence" element={<Absence />} />
          <Route path="/user/:id/journal" element={<Journal />} />
          <Route path="/absences" element={<Absences />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
