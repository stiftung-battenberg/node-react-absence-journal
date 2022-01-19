import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import config from "../../config.json" 
import Nav from '../Nav'
import CreateJournalWeek from './createJournalweek'
import ValidationModal from '../ValidationModal'
import moment from 'moment'

import { useTranslation } from "react-i18next"

import {GrCheckboxSelected, GrCheckbox, GrCheckmark} from 'react-icons/gr'
import {FaTrash, FaEdit} from 'react-icons/fa'

export default function Journalweek() {
    const { id } = useParams()
    const [journalweeks, setjournalweeks] = useState([])

    const { t, i18n } = useTranslation();

    function getJournalweek () {
        axios.get(`${config.API_DOMAIN}/api/user/${id}/journalweek`).then(res => {
            setjournalweeks(res.data)
        })
    }

    function createJournalweek (date) {
        console.log(date)
        axios.post(`${config.API_DOMAIN}/api/user/${id}/journalweek` , { date }).then(res => {
            getJournalweek()
        })  
    }
    function validateJournalweek (id) {
        axios.put(`${config.API_DOMAIN}/api/journalweek/${id}/validate`).then(res => {
            getJournalweek()
        })
    }
    function deleteJournalweek (id) { 
        axios.delete(`${config.API_DOMAIN}/api/journalweek/${id}`).then(res => {
            getJournalweek()
        })
    }

    useEffect(() => {
        getJournalweek()
    }, [])

    return (
        <>
        <Nav/>
        <section className=" mx-auto">
            <CreateJournalWeek createJournal={createJournalweek} />
            <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                    <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
                        <td className="px-4 py-3">{t("Number of the week")}</td>
                        <td className="px-4 py-3">{t("start")}</td>
                        <td className="px-4 py-3">{t("finish")}</td>
                        <td className="px-4 py-3">{t("validated")}</td>
                        <td className="px-4 py-3">Validated By</td>
                        <td className="px-4 py-3"></td>
                    </tr>
                </thead>
                <tbody className="mt-4">
                    {journalweeks.map(journalweek => {
                        return (
                            <tr key={journalweek.id}>
                                <td className="px-4 py-3 border">{journalweek.weekNumber}</td>
                                <td className="px-4 py-3 border">{moment(journalweek.start).locale(i18n.language).format('LL')}</td>
                                <td className="px-4 py-3 border">{moment(journalweek.finish).locale(i18n.language).format('LL')}</td>
                                <td className="px-4 py-3 border">{journalweek.validated ? <GrCheckboxSelected /> : <GrCheckbox />}</td>
                                <td className='px-4 py-3 border'></td>
                                <td className='px-4 py-3 border'>
                                    {!journalweek.validated && <ValidationModal icon={<GrCheckmark />} text="Validate Absence" handleEvent={validateJournalweek} id={journalweek.id}/> }
                                    <a href={`/journalweek/${journalweek.id}/journal`} className='inline-block p-2 bg-gray-50 rounded-full m-1 font-semibold'><FaEdit /></a>
                                    {!journalweek.validated && <ValidationModal icon={<FaTrash />} text="Delete Absence" handleEvent={deleteJournalweek} id={journalweek.id}/>}
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
