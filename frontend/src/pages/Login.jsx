import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-dark-light rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-dark border border-dark-lighter rounded px-4 py-3 mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-dark border border-dark-lighter rounded px-4 py-3 mb-6"
            required
          />
          <button type="submit" className="w-full bg-primary py-3 rounded-lg hover:bg-red-700 transition">
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-primary">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
