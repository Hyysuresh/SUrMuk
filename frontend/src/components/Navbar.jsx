import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-dark-light border-b border-dark-lighter sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-primary">Sur</span>
            <span className="text-secondary">Muk</span>
            <span className="text-accent"> eCom</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/products" className="hover:text-primary transition">Products</Link>
            
            {user && (
              <>
                <Link to="/wishlist" className="hover:text-primary transition">Wishlist</Link>
                <Link to="/cart" className="relative hover:text-primary transition">
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="hover:text-primary transition">Orders</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-primary transition">Admin</Link>
                )}
                <button onClick={handleLogout} className="bg-primary px-4 py-2 rounded hover:bg-red-700 transition">
                  Logout
                </button>
              </>
            )}
            
            {!user && (
              <>
                <Link to="/login" className="hover:text-primary transition">Login</Link>
                <Link to="/register" className="bg-primary px-4 py-2 rounded hover:bg-red-700 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}