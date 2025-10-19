import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    expiryDate: ''
  })

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    try {
      const { data } = await axios.get('/api/coupons')
      setCoupons(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/coupons', formData)
      setFormData({ code: '', discount: '', expiryDate: '' })
      fetchCoupons()
      alert('Coupon created successfully!')
    } catch (error) {
      alert('Failed to create coupon')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/coupons/${id}`)
      fetchCoupons()
    } catch (error) {
      alert('Failed to delete coupon')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Coupons</h1>

      <form onSubmit={handleSubmit} className="bg-dark-light rounded-lg p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Coupon Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            className="bg-dark border border-dark-lighter rounded px-4 py-2"
            required
          />
          <input
            type="number"
            placeholder="Discount %"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            className="bg-dark border border-dark-lighter rounded px-4 py-2"
            required
          />
          <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            className="bg-dark border border-dark-lighter rounded px-4 py-2"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-primary px-6 py-2 rounded">
          Create Coupon
        </button>
      </form>

      <div className="grid gap-4">
        {coupons.map((coupon) => (
          <div key={coupon._id} className="bg-dark-light rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl">{coupon.code}</h3>
              <p className="text-sm text-gray-400">
                {coupon.discount}% off • Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
              </p>
            </div>
            <button onClick={() => handleDelete(coupon._id)} className="bg-red-600 px-4 py-2 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}