import axios from "axios"
import { useState , useEffect} from 'react'

import CreateUser from './CreateUser'
import Nav from "../Nav"
import ValidationModal from '../ValidationModal'

import { useTranslation } from "react-i18next"

import { FaTrash } from 'react-icons/fa'
import { GrCheckbox, GrCheckboxSelected} from 'react-icons/gr'

import config from "../../config.json"

axios.defaults.withCredentials = true

export default function User() {
    const [users, setusers] = useState([])

    const { t, i18n } = useTranslation();

    async function getUser() {
        axios.get(`${config.API_DOMAIN}/api/users`).then( res => {
            setusers(res.data)
        })
    }

    async function deleteUser(id) {
        axios.delete(`${config.API_DOMAIN}/api/user/${id}`).then(res=>{
            getUser()
        })
    }

    function createUser (mail, name, isAdmin) { 
        axios.post( `${config.API_DOMAIN}/api/users`, {
            email: mail,
            name,
            isAdmin,
        })
        .then(res =>{
            getUser()
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <Nav/>
            <CreateUser createUser={createUser}/>
            <section className="mx-auto">
                <table className="items-center bg-transparent w-full border-collapse">
                    <thead>
                        <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
                            <td className="px-4 py-3">{t("Name")}</td>
                            <td className="px-4 py-3">{t("Email")}</td>
                            <td className="px-4 py-3"></td>
                            <td></td>
                            <td className="px-4 py-3">{t("Is admin")}</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody className="mt-4">
                        {users.map(user => {
                            return (
                                <tr key={user.id} className="">
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3"><a href={"/user/" + user.id + "/absence/"}><button className="block bg-indigo-600 py-2 px-16 rounded-2xl text-white font-semibold mb-2">Absence</button></a></td>
                                    <td className="px-4 py-3"><a href={"/user/" + user.id + "/journalweek/"}><button className="block bg-indigo-600 py-2 px-16 rounded-2xl text-white font-semibold mb-2">Journal</button></a></td>
                                    <td className="px-4 py-3">{user.isAdmin ? <GrCheckboxSelected /> : <GrCheckbox />}</td>
                                    <td className="px-4 py-3"><ValidationModal icon={<FaTrash />} id={user.id} handleEvent={deleteUser} text="Delete User"/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </>
    )
}
