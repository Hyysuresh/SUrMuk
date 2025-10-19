import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const { addToCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchProduct()
    fetchReviews()
  }, [id])

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`)
      setProduct(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/product/${id}`)
      setReviews(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please login to write a review')
      return
    }
    try {
      await axios.post('/api/reviews', {
        productId: id,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      })
      setReviewForm({ rating: 5, comment: '' })
      fetchReviews()
      fetchProduct()
      alert('Review submitted successfully!')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit review')
    }
  }

  const handleAddToWishlist = async () => {
    if (!user) {
      alert('Please login to add to wishlist')
      return
    }
    try {
      await axios.post('/api/wishlist', { productId: id })
      alert('Added to wishlist!')
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>

  if (!product) return <div className="container mx-auto px-4 py-12 text-center">Product not found</div>

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div className="aspect-square bg-dark-light rounded-lg flex items-center justify-center">
          <span className="text-9xl">📦</span>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl text-primary font-bold">₹{product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <span className="text-2xl text-gray-500 line-through">₹{product.price}</span>
            )}
            <span className="text-yellow-500">⭐ {product.rating?.toFixed(1) || 0}</span>
          </div>

          <p className="text-gray-300 mb-6">{product.description}</p>

          <div className="mb-6">
            <span className="bg-dark-light px-3 py-1 rounded">{product.category}</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                addToCart(product)
                alert('Added to cart!')
              }}
              className="bg-primary px-8 py-3 rounded-lg hover:bg-red-700 transition flex-1"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-dark-light px-8 py-3 rounded-lg hover:bg-dark-lighter transition"
            >
              ❤️
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-lighter pt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        {user && (
          <form onSubmit={handleSubmitReview} className="bg-dark-light rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block mb-2">Rating</label>
              <select
                value={reviewForm.rating}
                onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                className="bg-dark border border-dark-lighter rounded px-4 py-2"
              >
                <option value="5">5 Stars - Excellent</option>
                <option value="4">4 Stars - Good</option>
                <option value="3">3 Stars - Average</option>
                <option value="2">2 Stars - Poor</option>
                <option value="1">1 Star - Terrible</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Comment</label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                className="w-full bg-dark border border-dark-lighter rounded px-4 py-2"
                rows="4"
                required
              />
            </div>
            <button type="submit" className="bg-primary px-6 py-2 rounded hover:bg-red-700 transition">
              Submit Review
            </button>
          </form>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-dark-light rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
                  <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  )
}
