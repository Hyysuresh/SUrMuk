import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    fetchProducts()
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      const params = {}
      if (searchParams.get('category')) params.category = searchParams.get('category')
      if (searchParams.get('search')) params.search = searchParams.get('search')
      if (searchParams.get('sort')) params.sort = searchParams.get('sort')
      
      const { data } = await axios.get('/api/products', { params })
      setProducts(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['electronics', 'accessories', 'clothing', 'home-decor', 'health-care', 'makeup', 'others']

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        <div className="w-64">
          <h3 className="font-bold mb-4">Filters</h3>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Category</h4>
            <select
              value={searchParams.get('category') || ''}
              onChange={(e) => {
                if (e.target.value) {
                  setSearchParams({ category: e.target.value })
                } else {
                  searchParams.delete('category')
                  setSearchParams(searchParams)
                }
              }}
              className="w-full bg-dark-light border border-dark-lighter rounded px-3 py-2"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Sort By</h4>
            <select
              value={searchParams.get('sort') || ''}
              onChange={(e) => {
                if (e.target.value) {
                  setSearchParams({ ...Object.fromEntries(searchParams), sort: e.target.value })
                } else {
                  searchParams.delete('sort')
                  setSearchParams(searchParams)
                }
              }}
              className="w-full bg-dark-light border border-dark-lighter rounded px-3 py-2"
            >
              <option value="">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="bg-dark-light rounded-lg overflow-hidden hover:ring-2 ring-primary transition"
                >
                  <div className="aspect-square bg-dark-lighter flex items-center justify-center">
                    <span className="text-6xl">📦</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.title}</h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>
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
    </div>
  )
}
