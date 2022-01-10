import React from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../Nav'

export default function Journal() {
    const { id } = useParams()

    function getJournal () {
        
    }

    return (
        <>
        <Nav/>
        <section className=" mx-auto">
            <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                    <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
                        <td className="px-4 py-3">From</td>
                        <td className="px-4 py-3">To</td>
                        <td className="px-4 py-3">Motif</td>
                        <td className="px-4 py-3">Comment</td>
                        <td className="px-4 py-3">validated</td>
                        <td className="px-4 py-3">Validated By</td>
                        <td className="px-4 py-3"></td>
                    </tr>
                </thead>
                <tbody className="mt-4">
                
                </tbody>
            </table>
        </section>
        </>
        )
    }
