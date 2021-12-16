
import { useState } from 'react'
import axios from 'axios'

export default function ResetPassword() {
  const [ email, setEmail ] = useState()
   
  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:8080/api/user/reset-password', {
      email: email
    }).then(res => {
      console.log(res)
    })
  } 
  return (
    <div>
      <div className="h-screen flex">
            <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
                <div>
                <h1 className="text-white font-bold text-4xl font-sans">Reset Password</h1>
                </div>
            </div>
             <div className="flex w-1/2 justify-center items-center bg-white">
                    <form className="bg-white" onSubmit={(e)=>{handleSubmit(e)}}>
                        <h1 className="text-gray-800 font-bold text-2xl mb-1">Reset your password</h1>
                        <p className="text-sm font-normal text-gray-600 mb-7">Enter your email</p>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>
                        <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                    </form>
                </div>
        </div>
    </div>
  )
}