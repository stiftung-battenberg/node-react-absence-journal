import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

import Nav from '../Nav'
import CreateAbsence from "./CreateAbsence"

axios.defaults.withCredentials = true

function Absence() {
    const { id } = useParams()
    const [absences, setabsences] = useState([])

    
    function createAbsence () {
        axios.post("http//localhost:8080/api/user/:id/absence")
    }
    return (
        <>
           <Nav></Nav>
           <section className="container mx-auto p-12">
                <table className="w-full">
                    <thead>
                        <tr>
                            <td className="text-xl font-sans font-bold">From</td>
                            <td className="text-xl font-sans font-bold">To</td>
                            <td className="text-xl font-sans font-bold">Motif</td>
                            <td className="text-xl font-sans font-bold">Comment</td>
                        </tr>
                    </thead>
                    <tbody className="mt-4">
                        {absences.map(absence => {
                            return (
                                <tr key={absence.id} className="">
                                    <td className="py-2 px-1">{absence.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <CreateAbsence createAbsence={createAbsence} />
            </section>
        </>
    )
}

export default Absence
