import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/user')
      setOrders(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl mb-4">No orders yet</h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-dark-light rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Order ID: {order._id}</p>
                <p className="text-sm text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">₹{order.totalAmount}</p>
                <p className={`text-sm ${
                  order.orderStatus === 'delivered' ? 'text-green-500' :
                  order.orderStatus === 'cancelled' ? 'text-red-500' : 'text-yellow-500'
                }`}>
                  {order.orderStatus.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="border-t border-dark-lighter pt-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 bg-dark-lighter rounded flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.product?.title || 'Product'}</p>
                    <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
