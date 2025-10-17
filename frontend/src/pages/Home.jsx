import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products?limit=8')
      setProducts(data.slice(0, 8))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { name: 'Electronics', value: 'electronics', color: 'bg-blue-600' },
    { name: 'Clothing', value: 'clothing', color: 'bg-pink-600' },
    { name: 'Home Decor', value: 'home-decor', color: 'bg-green-600' },
    { name: 'Health Care', value: 'health-care', color: 'bg-purple-600' },
    { name: 'Shoes', value: 'Shoes', color: 'bg-yellow-600' },
    { name: 'Accessories', value: 'accessories', color: 'bg-red-600' },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary via-secondary to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-dark">Welcome to SurMuk eCom</h1>
          <p className="text-xl mb-8 text-dark">Your one-stop shop for everything!</p>
          <Link to="/products" className="bg-dark text-white px-8 py-3 rounded-lg text-lg hover:bg-dark-lighter transition">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              to={`/products?category=${cat.value}`}
              className={`${cat.color} p-6 rounded-lg text-center hover:opacity-90 transition`}
            >
              <h3 className="font-semibold">{cat.name}</h3>
            </Link>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="bg-dark-light rounded-lg overflow-hidden hover:ring-2 ring-primary transition"
              >
                <div className="aspect-square bg-dark-lighter flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">₹{product.discountPrice || product.price}</span>
                    {product.discountPrice && (
                      <span className="text-gray-500 line-through">₹{product.price}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
