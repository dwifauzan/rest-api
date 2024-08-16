import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateExpress = () => {
    const [data, setNewData] = useState([]);
    const [item, setItem] = useState({ namaMahasiswa: '', fakultas: '', semester: '', alamat: '' });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/home', { state: { message: 'success' } });
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/home');
                setTimeout(() => {
                    setNewData(response.data.payload);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/add/data/mahasiswa', item);
            setItem({ namaMahasiswa: '', fakultas: '', semester: '', alamat: '' });
            handleNavigate();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="container m-auto mt-10">
                <div className="flex justify-center">
                    <div className="w-3/12 px-6 py-8 rounded-lg shadow-lg" style={{ backgroundColor: "#628DDB" }}>
                        <div className="mb-5">
                            <h1 className="capitalize font-bold text-4xl text-white text-center">Tambah Data Mahasiswa</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="namaMahasiswa"
                                    value={item.namaMahasiswa}
                                    onChange={handleChange}
                                    placeholder="Nama Mahasiswa"
                                    className="border px-2 py-2 m-1 w-full rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="fakultas"
                                    value={item.fakultas}
                                    onChange={handleChange}
                                    placeholder="fakultas"
                                    className="border px-2 py-2 m-1 w-full rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="semester"
                                    value={item.semester}
                                    onChange={handleChange}
                                    placeholder="semester"
                                    className="border px-2 py-2 m-1 w-full rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="alamat"
                                    value={item.alamat}
                                    onChange={handleChange}
                                    placeholder="Alamat"
                                    className="border px-2 py-2 m-1 w-full rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex gap-6">
                                <button
                                    type="submit"
                                    className="px-5 rounded-lg text-white font-bold shadow py-2 w-full"
                                    style={{ backgroundColor: "#63B3DB" }}>Add Mahasiswa</button>
                                <button
                                    onClick={handleNavigate}
                                    type="button"
                                    className="px-5 rounded-lg text-white font-bold shadow py-2 w-full"
                                    style={{ backgroundColor: "#8663DB" }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateExpress;
