import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
        await axios.post('http://localhost:3000/api/register', {
        username,
        password,
        role,
      })

      setSuccess('Registration successful')
      setUsername('')
      setPassword('')
      handleNavigate()
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error)
      } else {
        setError('Registration failed. Please try again.')
      }
    }
  }

  return (
      <>
            <div className="bg-slate-100 items-center h-screen flex justify-center m-auto">
              <div className="max-w-sm rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                  <img className='rounded-t-md' src="https://img.freepik.com/free-vector/invoice-concept-illustration_114360-2411.jpg?t=st=1723691221~exp=1723694821~hmac=2a0729122b2147e07bf4965d962f88c54564b491f05c3f30527a48bfdd54bf39&w=826" alt="" />
                  </a>
                  <div className="p-5">
                  <form className="max-w-sm mx-auto py-8 rounded-md shadow-md px-4 bg-gray-800" onSubmit={handleSubmit}>
                      <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Masukan username" required 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder='Masukan password' required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <button type="submit" className="text-white bg-green-500 px-3 py-2 mt-2 w-full rounded-sm hover:bg-green-800  ">Register</button>

                      {error && <p className="text-red-600">{error}</p>}
                      {success && <p className="text-green-600">{success}</p>}
                    </form>
                  </div>
              </div>
            </div>
      </>
  )
}

export default Register
