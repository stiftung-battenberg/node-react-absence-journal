import axios from "axios"
import { useState , useEffect} from 'react'
import CreateUser from './CreateUser'
import Nav from "../Nav"
axios.defaults.withCredentials = true



export default function User() {
    const [users, setusers] = useState([])

    async function getUser() {
        axios.get('http://localhost:8080/api/users').then( res => {
            setusers(res.data)
        })
    }

    async function deleteUser(id) {
        axios.delete("http://localhost:8080/api/user/" + id).then(getUser())
    }

    function createUser (mail) { 
        axios.post("http://localhost:8080/api/users", {
            email: mail
        }).catch(error => {
            console.log(error)
        }).then(getUser())
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <Nav />
            <section className="container mx-auto p-12">
                <table className="w-full">
                    <thead>
                        <tr>
                            <td className="text-xl font-sans font-bold">Email</td>
                            <td className="text-xl font-sans font-bold"></td>
                        </tr>
                    </thead>
                    <tbody className="mt-4">
                        {users.map(user => {
                            return (
                                <tr key={user.id} className="">
                                    <td className="py-2 px-1">{user.email}</td>
                                    <td><a href={"/user/" + user.id + "/absence/"}><button className="block bg-indigo-600 py-2 px-16 rounded-2xl text-white font-semibold mb-2">Absence</button></a></td>
                                    <td><a href=""></a><button className="block bg-indigo-600 py-2 px-16 rounded-2xl text-white font-semibold mb-2">Journal</button></td>
                                    <td><button className="block bg-indigo-600 py-2 px-16 rounded-2xl text-white font-semibold mb-2" onClick={()=>{deleteUser(user.id)}}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <CreateUser createUser={createUser}/>
            </section>
        </>
    )
}
