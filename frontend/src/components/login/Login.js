import { useState } from "react"
import axios from 'axios'

axios.defaults.withCredentials = true

export default function Login (props) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
  
    function handleSubmit (e) { 
        setError("")
        e.preventDefault()

        const data = {
            email: email,
            password: password,
            withCredentials: true
        }


        axios.post('http://localhost:8080/api/login', data).then(() =>{
            props.setLoggedIn(true)
        }).catch(error => {
            setError("Wrong credentials")
        })
    }

    return (
        <div>
            <div className="h-screen flex">
                <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
                    <div>
                    <h1 className="text-white font-bold text-4xl font-sans">Absence & Journal</h1>
                    <p className="text-white mt-1">An app to handle you absences and your jounal</p>
        
                    </div>
                </div>
                <div className="flex w-1/2 justify-center items-center bg-white">
                    <form className="bg-white" onSubmit={(e)=>{handleSubmit(e)}}>
                        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                        <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="password" name="" id="" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
                        </div>
                        { error && <p className="text-red-500 mt-2">{error}</p> }
                        
                        <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                        <a href="/reset"><span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span></a>
                    </form>
                </div>
                </div>
        </div>
    )
}
