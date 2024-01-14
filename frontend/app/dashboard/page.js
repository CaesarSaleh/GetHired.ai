'use client'
import { useRouter } from 'next/navigation'
import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import NavIcon from './NavIcon'
// import { useAuth } from './context/AuthContext'
import Webcam from "react-webcam";

export default function Dashboard() {
    const WebcamComponent = () => <Webcam/>;
    let iconTitles = [
        "Tell us about yourself.",
        "Tell us about a project you worked on. What challenges did you face?",
        "What languages are you proficient in?",
        "What inspires you to work in this field?"
    ]
    let iconCodes = [
        "M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z",
        "m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z",
        "M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z",
        "M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"
    ];
    const [question, setQuestion] = useState("Tell us about yourself.");
    return (
        <>
            <aside id="default-sidebar"
                   className="fixed top-20 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0"
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-50">
                    <ul className="space-y-2 font-medium">
                        <li onClick={() => {setQuestion(iconTitles[0])}}>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:bg-[#43934b] dark:hover:text-[#43934b] hover:bg-gray-100 dark:hover:bg-white group">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-[#43934b]"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 22 21">
                                    <path d={iconCodes[0]}/>
                                </svg>
                                <span className="ms-3">{iconTitles[0]}</span>
                            </a>
                        </li>
                        <li onClick={() => {setQuestion(iconTitles[1])}}>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:bg-[#43934b] dark:hover:text-[#43934b] hover:bg-gray-100 dark:hover:bg-white group">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-[#43934b]"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 22 21">
                                    <path d={iconCodes[1]}/>
                                </svg>
                                <span className="ms-3">{iconTitles[1]}</span>
                            </a>
                        </li>
                        <li onClick={() => {setQuestion(iconTitles[2])}}>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:bg-[#43934b] dark:hover:text-[#43934b] hover:bg-gray-100 dark:hover:bg-white group">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-[#43934b]"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 22 21">
                                    <path d={iconCodes[2]}/>
                                </svg>
                                <span className="ms-3">{iconTitles[2]}</span>
                            </a>
                        </li>
                        <li onClick={() => {setQuestion(iconTitles[3])}}>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:bg-[#43934b] dark:hover:text-[#43934b] hover:bg-gray-100 dark:hover:bg-white group">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-[#43934b]"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 22 21">
                                    <path d={iconCodes[3]}/>
                                </svg>
                                <span className="ms-3">{iconTitles[3]}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="flex h-full justify-center w-full border-gray-200 border-t bg-gray-50 py-2 mb-[10px]">
                <div className=" h-full pt-8 text-2xl font-semibold">
                    <div
                        className="px-[20px] min-w-full p-4 drop-shadow-md rounded-md border bg-white flex flex-col gap-2">
                        <div className="flex justify-center items-center">{question}</div>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-center mb-[10px]">
                <div className="flex w-[90%] justify-center">
                    <Webcam/>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="w-[15px]">
                    <button type="button" className="bg-[url('/record.svg')] ">

                    </button>
                </div>
            </div>

        </>
    );
}