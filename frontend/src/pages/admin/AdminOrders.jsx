import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/all')
      setOrders(data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status })
      fetchOrders()
    } catch (error) {
      alert('Failed to update status')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-dark-light rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <div>
                <p className="font-bold">{order.user?.name || 'Customer'}</p>
                <p className="text-sm text-gray-400">Order ID: {order._id}</p>
                <p className="text-sm text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">₹{order.totalAmount}</p>
                <select
                  value={order.orderStatus}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="mt-2 bg-dark border border-dark-lighter rounded px-3 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="border-t border-dark-lighter pt-4">
              {order.items.map((item, idx) => (
                <p key={idx} className="text-sm">
                  {item.product?.title || 'Product'} × {item.quantity} = ₹{item.price * item.quantity}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}