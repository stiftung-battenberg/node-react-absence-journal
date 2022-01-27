import { useState } from "react"
import axios from 'axios'
import { useTranslation } from "react-i18next"

import config from "../../config.json"

axios.defaults.withCredentials = true

export default function ResetPasswordForm () {
    const [pass1, setPass1] = useState()
    const [pass2, setPass2] = useState()
    const [error, seterror] = useState("")
    const [succeded, setsucceded] = useState(false)

    const { t } = useTranslation()

    function handleSubmit(e) {
        e.preventDefault();
        seterror("")
        setsucceded("")
        
        if(pass1 === pass2) {
            const queryString = window.location.search
            const urlParams = new URLSearchParams(queryString)

            axios.put(`${config.API_DOMAIN}/api/user/reset-password`, {
                password: pass2,
                token: urlParams.get('token'),
                email: urlParams.get('email')
            }).then(() => {
                setsucceded(true)
            }).catch(error => {
                seterror(error.response.data)
            })

        } else {
            seterror("Values don't match.")
        }

    }

    return (
        <div>
            <div className="h-screen flex">
                <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
                    <div>
                    <h1 className="text-white font-bold text-4xl font-sans">{t("Reset")}</h1>
                    <p className="text-white mt-1">Enter your new password</p>
        
                    </div>
                </div>
                <div className="flex w-1/2 justify-center items-center bg-white">
                    <form className="bg-white" onSubmit={(e)=>{handleSubmit(e)}}>
                        <h1 className="text-gray-800 font-bold text-2xl mb-3">Reset Password</h1>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <input className="pl-2 outline-none border-none" type="password" placeholder="New password" onChange={(e) => {setPass1(e.target.value)}}/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <input className="pl-2 outline-none border-none" type="password" placeholder="Enter again" onChange={(e) => {setPass2(e.target.value)}} />
                        </div>
                        
                        <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Reset</button>
                        { error && <p className="text-red-500">{error}</p> }
                        { succeded && <p className="text-green-500">The password has been changed</p> }
                    </form>
                </div>

                </div>
        </div>
    )
}
