import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { CartContext } from '../context/CartContext'

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(null)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get('/api/wishlist')
      setWishlist(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemove = async (productId) => {
    try {
      const { data } = await axios.delete(`/api/wishlist/${productId}`)
      setWishlist(data)
    } catch (error) {
      console.error(error)
    }
  }

  if (!wishlist) return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>

  if (wishlist.products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl mb-4">Your wishlist is empty</h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.products.map((product) => (
          <div key={product._id} className="bg-dark-light rounded-lg overflow-hidden">
            <Link to={`/product/${product._id}`} className="block">
              <div className="aspect-square bg-dark-lighter flex items-center justify-center">
                <span className="text-6xl">📦</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.title}</h3>
                <p className="text-primary font-bold">₹{product.discountPrice || product.price}</p>
              </div>
            </Link>
            <div className="p-4 pt-0 flex gap-2">
              <button
                onClick={() => {
                  addToCart(product)
                  alert('Added to cart!')
                }}
                className="flex-1 bg-primary py-2 rounded hover:bg-red-700 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleRemove(product._id)}
                className="px-3 bg-dark-lighter rounded hover:bg-dark transition"
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
