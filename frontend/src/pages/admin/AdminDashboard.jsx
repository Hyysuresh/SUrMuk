import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/orders/all')
      ])
      
      const revenue = ordersRes.data.reduce((sum, order) => sum + order.totalAmount, 0)
      
      setStats({
        products: productsRes.data.length,
        orders: ordersRes.data.length,
        revenue
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-light rounded-lg p-6">
          <h3 className="text-gray-400 mb-2">Total Products</h3>
          <p className="text-4xl font-bold text-primary">{stats.products}</p>
        </div>
        <div className="bg-dark-light rounded-lg p-6">
          <h3 className="text-gray-400 mb-2">Total Orders</h3>
          <p className="text-4xl font-bold text-secondary">{stats.orders}</p>
        </div>
        <div className="bg-dark-light rounded-lg p-6">
          <h3 className="text-gray-400 mb-2">Total Revenue</h3>
          <p className="text-4xl font-bold text-accent">₹{stats.revenue}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/admin/products" className="bg-primary p-6 rounded-lg hover:opacity-90 transition">
          <h3 className="text-xl font-bold mb-2">Manage Products</h3>
          <p className="text-sm">Add, edit or remove products</p>
        </Link>
        <Link to="/admin/orders" className="bg-secondary text-dark p-6 rounded-lg hover:opacity-90 transition">
          <h3 className="text-xl font-bold mb-2">Manage Orders</h3>
          <p className="text-sm">View and update order status</p>
        </Link>
        <Link to="/admin/coupons" className="bg-accent p-6 rounded-lg hover:opacity-90 transition">
          <h3 className="text-xl font-bold mb-2">Manage Coupons</h3>
          <p className="text-sm">Create and manage discount coupons</p>
        </Link>
      </div>
    </div>
  )
}
