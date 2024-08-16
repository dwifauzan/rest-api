import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const NavbarOrganism = ({ onLogout }) => {
    const [time, setTime] = useState(new Date())
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/create')
    }
    
    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout()
        }
        navigate('/')
    }

    useEffect(() => {
        const updateClock = () => setTime(new Date())
        const intervalId = setInterval(updateClock, 1000)
        return () => clearInterval(intervalId)
    }, [])

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }

    return (
        <nav className="" style={{ backgroundColor: '#349a59' }}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">KoutaCampus.id</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="flex gap-5">
                    <button className="bg-green-500 text-white py-2 px-6 text-2xl rounded-md capitalize hover:bg-green-800 font-bold" onClick={handleNavigate}>tambah+</button>
                    <button className="bg-green-500 text-white py-2 px-6 text-2xl rounded-md capitalize hover:bg-green-800 font-bold" onClick={handleLogoutClick}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default NavbarOrganism
