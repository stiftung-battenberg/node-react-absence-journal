import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/fr';
import 'moment/locale/de';
import { useTranslation } from "react-i18next"

import EditAbsence from './EditAbsence'
import Nav from '../Nav'
    

import { GrCheckbox, GrCheckboxSelected, GrCheckmark } from "react-icons/gr"
import { FaTrash } from "react-icons/fa"

import config from "../../config.json"
import ValidationModal from '../ValidationModal'


axios.defaults.withCredentials = true

function Absences() {
    const { id } = useParams()
    const [absences, setabsences] = useState([])

    const { t, i18n } = useTranslation();

    function editAbsence (idAbsence, from, to, motif, comment) {
        axios.put(`${config.API_DOMAIN}/api/absence/${idAbsence}`, {   
            from, 
            to, 
            motif, 
            comment
        }).then(res => {
            getAbsence()
        })
    }

    function getAbsence () {
        axios.get(`${config.API_DOMAIN}/api/absences`).then(res =>{
            console.log(res.data)
            setabsences(res.data)
        }).catch(error => {
            console.log(error);
        })
    }
    function deleteAbsence(idAbsence) {
        axios.delete(`${config.API_DOMAIN}/api/absence/${idAbsence}`).then(res => {
            getAbsence()
        })
    }
    function validateAbsence(idAbsence){
        axios.put(`${config.API_DOMAIN}/api/absence/${idAbsence}/validate`).then(res =>{
            getAbsence()
        })
    }

    useEffect(() => {
        getAbsence()
    }, [])
    
    return (
        <>
           <Nav />
           <section className=" mx-auto">
                <table className="items-center bg-transparent w-full border-collapse">
                    <thead>
                        <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
                            <td className="px-4 py-3">{t("Belongs To")}</td>
                            <td className="px-4 py-3">{t("From")}</td>
                            <td className="px-4 py-3">{t("To")}</td>
                            <td className="px-4 py-3">{t("Motif")}</td>
                            <td className="px-4 py-3">{t("Comment")}</td>
                            <td className="px-4 py-3">{t("validated")}</td>
                            <td className="px-4 py-3">{t("Validated By")}</td>
                            <td className="px-4 py-3"></td>
                        </tr>
                    </thead>
                    <tbody className="mt-4">
                        {absences.map(absence => {
                            return (
                                <tr key={absence.id} className="text-gray-700">
                                    <td className="px-4 py-3 border">{absence.user.name}</td>
                                    <td className="px-4 py-3 border">{moment(absence.from).locale(i18n.language).format('LLLL')}</td>
                                    <td className="px-4 py-3 border">{moment(absence.to).locale(i18n.language).format('LLLL')}</td>
                                    <td className="px-4 py-3 border">{absence.motif}</td>
                                    <td className="px-4 py-3 border">{absence.comment}</td>
                                    <td className="px-4 py-3 border">{absence.validated ? <GrCheckboxSelected /> : <GrCheckbox />}</td>
                                    <td className="px-4 py-3 border">{absence.validatedBy?.name}</td>
                                    <td className="px-4 py-3 border">
                                        <ValidationModal icon={<GrCheckmark />} text="Validate Absence" handleEvent={validateAbsence} id={absence.id}/>
                                        <EditAbsence editAbsence={editAbsence} id={absence.id} comment={absence.comment} motif={absence.motif} to={moment(absence.to).format('YYYY-MM-DDTHH:mm')} from={moment(absence.from).format('YYYY-MM-DDTHH:mm')}/>
                                        <ValidationModal icon={<FaTrash />} text="Delete Absence" handleEvent={deleteAbsence} id={absence.id}/>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default Absences
