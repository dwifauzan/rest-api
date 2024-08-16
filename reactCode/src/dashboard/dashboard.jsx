import { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import NavbarOrganism from "../organism/navbar"
import CardMahasiswa from "../excuteProgram/card"
import Footer from "../organism/footer"

const DashboardApp = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const location = useLocation()
    const message = location.state?.message
    const [role, setRole] = useState('')

    useEffect(() => {
        fetchData()
    }, [message])
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/home")
            const userResponse = await axios.get("http://localhost:3000/api/user/data")
            setTimeout(() => {
                setData(response.data.payload)
                setRole(userResponse.data.payload.role) // Pastikan ini sesuai dengan struktur data
                setLoading(false)
            }, 1000)
        } catch (error) {
            console.log("Failed to fetch data:", error)
            setLoading(false)
        }
    }
    

    const handleDelete = (id) => {
        setData(prevData => prevData.filter(item => item.id !== id))
    }

    const handleUpdate = (id, updatedItem) => {
        setData(prevData => prevData.map(item => (item.id === id ? { ...item, ...updatedItem } : item)))
        fetchData()

    }

    const filteredData = data.filter((dt) => {
        const namaMahasiswa = dt.nama_mahasiswa
            ? String(dt.nama_mahasiswa).toLowerCase()
            : ""
        const fakultas = dt.fakultas ? String(dt.fakultas).toLowerCase() : ""
        const alamat = dt.alamat ? String(dt.alamat).toLowerCase() : ""
        const semester = dt.semester ? String(dt.semester).toLowerCase() : ""

        return (
            namaMahasiswa.includes(searchQuery.toLowerCase()) ||
            fakultas.includes(searchQuery.toLowerCase()) ||
            alamat.includes(searchQuery.toLowerCase()) ||
            semester.includes(searchQuery.toLowerCase())
        )
    })
    

    return (
        <>
            {loading ? (
                <div className="flex justify-center mt-20">
                    <div className="bg-yellow-500 px-4 py-6 rounded-lg border border-b-gray-950 shadow-lg">
                        <p className="text-center text-4xl font-bold text-white">
                            Please wait...
                        </p>
                    </div>
                </div>
            ) : (
                <div>
                    <NavbarOrganism />
                    <div className="container m-auto mt-10">
                        <div className="relative overflow-x-auto py-10">
                            <div className="flex justify-end mb-4">
                                <div className="mb-4 flex items-center shadow-md rounded-md px-3 py-2">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                    <SearchIcon />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-6">
                                {filteredData.map((item) => (
                                    <CardMahasiswa
                                        key={item.id}
                                        id={item.id}
                                        namaMahasiswa={item.nama_mahasiswa}
                                        fakultas={item.fakultas}
                                        semester={item.semester}
                                        alamat={item.alamat}
                                        onDelete={role === "admin" ? handleDelete : undefined}
                                        onUpdate={role === "admin" ? handleUpdate : undefined}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )}
        </>
    )
}

export default DashboardApp
