import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import personImage from "../assets/person.png"

const CardMahasiswa = ({ id, namaMahasiswa, fakultas, semester, alamat, onDelete, onUpdate }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [updatedData, setUpdatedData] = useState({namaMahasiswa,fakultas, semester,alamat})
    const navigate = useNavigate()

    const handleUpdateChange = (e) => {
        const { name, value } = e.target
        setUpdatedData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleUpdateClick = () => {
        setShowUpdateModal(true)
    }

    const handleDeleteClick = () => {
        setShowDeleteModal(true)
    }

    const handleUpdate = async () => {
        try {
            await axios.put('http://localhost:3000/api/update/data/mahasiswa', { id, ...updatedData })
            onUpdate(id, updatedData) // Call onUpdate from props
            await axios.get("http://localhost:3000/api/home")
        } catch (error) {
            console.error("Failed to update data:", error)
        }
        setShowUpdateModal(false)
    }    

    const handleDelete = async () => {
        try {
            await axios.delete('http://localhost:3000/api/delete/user/mahasiswa', { data: { id } })
            onDelete(id)
        } catch (error) {
            console.error("Failed to delete data:", error)
        }
        setShowDeleteModal(false)
    }

    const handleModalClose = () => {
        setShowDeleteModal(false)
        setShowUpdateModal(false)
    }

    return (
        <div className="w-full max-w-sm shadow-2xl rounded-md transition ease-in-out delay-150 hover:scale-110 duration-300">
            <div className="flex flex-col items-center pb-5 pt-5">
                <img className="w-40 h-40 mb-3 rounded-full shadow-lg" src={personImage} alt="Bonnie image"/>
                <h5 className="mb-1 text-2xl font-bold text-black capitalize">
                    nama : {namaMahasiswa}
                </h5>
                <span className="text-sm text-black capitalize">
                    fakultas : {fakultas}
                </span>
                <span className="text-sm text-black capitalize">
                    semester : {semester}
                </span>
                <span className="text-sm text-black capitalize">
                    alamat : {alamat}
                </span>
                <div className="flex gap-3 pt-4">
                    <button
                        className="bg-green-500 w-40 mb-4 py-2 px-6 rounded-lg shadow-lg text-white font-bold text-lg  transition ease-in-out delay-150 hover:scale-95 duration-200"
                        onClick={handleUpdateClick}
                    >
                        Update
                    </button>
                    <button className="bg-red-500 mb-4 w-40 py-2 px-6 rounded-lg shadow-lg text-white font-bold text-lg  transition ease-in-out delay-150 hover:scale-95 duration-200" onClick={handleDeleteClick}>
                        Delete
                    </button>
                </div>
            </div>

            {/* Modal Update */}
            {showUpdateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <h3 className="text-lg font-semibold">Update Data Mahasiswa</h3>
                        <input
                            type="text"
                            name="namaMahasiswa"
                            value={updatedData.namaMahasiswa}
                            onChange={handleUpdateChange}
                            placeholder="Nama Mahasiswa"
                            className="mt-2 w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="fakultas"
                            value={updatedData.fakultas}
                            onChange={handleUpdateChange}
                            placeholder="Fakultas"
                            className="mt-2 w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="semester"
                            value={updatedData.semester}
                            onChange={handleUpdateChange}
                            placeholder="Semester"
                            className="mt-2 w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="alamat"
                            value={updatedData.alamat}
                            onChange={handleUpdateChange}
                            placeholder="Alamat"
                            className="mt-2 w-full p-2 border border-gray-300 rounded"
                        />
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                className="bg-gray-300 text-black py-2 px-4 rounded"
                                onClick={handleModalClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Delete */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <h3 className="text-lg font-semibold">Are you sure?</h3>
                        <p className="mt-2">Do you really want to delete this item? This action cannot be undone.</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                className="bg-gray-300 text-black py-2 px-4 rounded"
                                onClick={handleModalClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CardMahasiswa
