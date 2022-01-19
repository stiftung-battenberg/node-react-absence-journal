import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'

import { FaEdit } from "react-icons/fa" 

axios.defaults.withCredentials = true

export default function EditJournal (props) {
    const [openModal, setopenModal] = useState(false)
    const [activity, setactivity] = useState("")
    const [comment, setcomment] = useState("")

    function handleSubmit (e) { 
        e.preventDefault()
        
        props.editJournal(props.id, activity, comment)
  
        setopenModal(false)
    }

    useEffect(() => {
        setactivity(props.activity)
        setcomment(props.comment)
    }, [])

    return (
        <div>
           <div className={`${openModal ? "block" : "hidden"} absolute w-full h-full bg-gray-900 top-0 left-0 opacity-75`}></div>
           <button className="inline-block p-2 bg-gray-50 rounded-full font-semibold m-1" onClick={()=>{setopenModal(! openModal)}}><FaEdit /></button>
            <div id="default-modal" aria-hidden="true" className={`fixed left-0 right-0 z-50 items-center justify-center ${openModal ? "flex" : "hidden"} overflow-x-hidden overflow-y-auto h-modal md:h-full top-4 md:inset-0`}>
                
                <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                                Create Absence
                            </h3>
                            <button type="button" onClick={()=>{setopenModal(! openModal)}} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>  
                            </button>
                        </div>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <div className="p-3 mt-12">
                                <p className="text-sm font-normal text-gray-600 mb-2">Activity</p>
                                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                                    <textarea className="pl-2 outline-none border-none w-full" type="text" placeholder="activity" value={activity} onChange={(e) => {setactivity(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-normal text-gray-600 mb-2">Comment</p>
                                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                                    <textarea className="pl-2 outline-none border-none w-full" type="text" placeholder="comment" value={comment} onChange={(e) => {setcomment(e.target.value)}}/>
                                </div>
                            </div>


                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button data-modal-toggle="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create User</button>
                                <button data-modal-toggle="default-modal" onClick={()=>{setopenModal(! openModal)}} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
