import { useState } from "react"
import React from 'react'

export default function ValidationModal (props) {
    const [openModal, setopenModal] = useState(false)

    return (
        <div>
            <button className="inline-block p-2 bg-gray-50 rounded-full m-1 font-semibold" onClick={()=>{setopenModal(! openModal)}}>{props.icon}</button>
           <div className={`${openModal ? "block" : "hidden"} absolute w-screen h-screen bg-gray-900 top-0 left-0 opacity-75`}></div>
            <div id="default-modal" aria-hidden="true" className={`fixed left-0 right-0 z-50 items-center justify-center ${openModal ? "flex" : "hidden"} overflow-x-hidden overflow-y-auto h-modal md:h-full top-4 md:inset-0`}>
                
                <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                                {props.text}
                            </h3>
                            <button type="button" onClick={()=>{setopenModal(! openModal)}} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>  
                            </button>
                        </div>
                    
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-toggle="default-modal" onClick={()=>{props.handleEvent(props.id)}} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{props.text}</button>
                            <button data-modal-toggle="default-modal" onClick={()=>{setopenModal(! openModal)}} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}