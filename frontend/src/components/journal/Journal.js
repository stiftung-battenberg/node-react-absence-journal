import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/fr';
import 'moment/locale/de';

import { useTranslation } from "react-i18next"

import { GrCheckmark, GrCheckbox, GrCheckboxSelected } from "react-icons/gr"

import config from "../../config.json" 
import Nav from '../Nav'
import EditJournal from './editJournal'
import ValidationModal from '../ValidationModal'

export default function Journal() {
    const { id } = useParams()
    const [journals, setjournals] = useState([])
    const [journalweek, setjournalweek] = useState({})
    const { t, i18n } = useTranslation();

    function getjournal(){
        axios.get(`${config.API_DOMAIN}/api/journalweek/${id}/journal`).then(res => {
            setjournals(res.data)
        })
    }

    function editJournal(id, activity, comment){
        axios.put(`${config.API_DOMAIN}/api/journal/${id}`,{
            activity,
            comment
        }).then(res => {
            getjournal()
        })
    }
    function validateJournalweek (id) {
        axios.put(`${config.API_DOMAIN}/api/journalweek/${id}/validate`)
    }
    function getjournalweek () {
        axios.get(`${config.API_DOMAIN}/api/journalweek/${id}`).then(res => {
            console.log("hello")
            setjournalweek(res.data)
        })
    }
    useEffect(() => {
        getjournal()
        getjournalweek()
    }, [])

    

    return (
        <section className=" mx-auto">
            <Nav/>
            <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                    <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
                        <td className="px-4 py-3">{t("Number of the week")}</td>
                        <td className="px-4 py-3">{t("start")}</td>
                        <td className="px-4 py-3">{t("finish")}</td>
                        <td className="px-4 py-3">{t("validated")}</td>
                        <td className="px-4 py-3"></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='px-4 py-3 border'>{journalweek.weekNumber}</td>
                        <td className='px-4 py-3 border'>{moment(journalweek.start).locale(i18n.language).format('LL')}</td>
                        <td className='px-4 py-3 border'>{moment(journalweek.finish).locale(i18n.language).format('LL')}</td>
                        <td className="px-4 py-3 border">{journalweek.validated ? <GrCheckboxSelected /> : <GrCheckbox />}</td>
                        <td className='px-4 py-3 border'><ValidationModal icon={<GrCheckmark />} text="Validate Absence" handleEvent={validateJournalweek} id={id}/> </td>
                    </tr>
                </tbody>
            </table>
            
            <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                    <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
                        <td className="px-4 py-3">date</td>
                        <td className="px-4 py-3">activity</td>
                        <td className="px-4 py-3">comment</td>
                        <td className="px-4 py-3"></td>
                    </tr>
                </thead>
                <tbody className="mt-4">
                    { journals.map(journal => {
                        return (
                            <tr key={journal.id}>
                                <td className="px-4 py-3 border">{moment(journal.date).locale(i18n.language).format('LL')}</td>
                                <td className="px-4 py-3 border">{journal.activity}</td>
                                <td className="px-4 py-3 border">{journal.comment}</td>
                                <td className="px-4 py-3 border"><EditJournal id={journal.id} editJournal={editJournal} comment={journal.comment} activity={journal.activity}/></td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
        </section>
    )
}
