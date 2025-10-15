import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Cart() {
  const { cart, updateQuantity, getTotal, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  })

  const handleApplyCoupon = async () => {
    try {
      const { data } = await axios.post('/api/coupons/validate', { code: couponCode })
      setDiscount(data.discount)
      alert(`Coupon applied! ${data.discount}% off`)
    } catch (error) {
      alert('Invalid coupon code')
    }
  }

  const handleCheckout = async (paymentMethod) => {
    if (!user) {
      navigate('/login')
      return
    }

    const items = cart.map(item => ({
      product: item._id,
      quantity: item.quantity,
      price: item.discountPrice || item.price
    }))

    const total = getTotal()
    const finalAmount = total - (total * discount / 100)

    try {
      const { data } = await axios.post('/api/orders', {
        items,
        totalAmount: finalAmount,
        shippingAddress: shippingInfo,
        paymentMethod
      })

      if (paymentMethod === 'razorpay') {
        if (!window.Razorpay) {
          alert('Razorpay SDK not loaded. Please refresh the page.')
          return
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || data.razorpayKey || 'rzp_test_key',
          amount: data.razorpayOrder.amount,
          currency: 'INR',
          name: 'SurMuk eCom',
          order_id: data.razorpayOrder.id,
          handler: async function (response) {
            try {
              await axios.post('/api/orders/verify', {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                orderDbId: data.order._id
              })
              clearCart()
              navigate('/orders')
            } catch (error) {
              alert('Payment verification failed. Please contact support.')
            }
          },
          modal: {
            ondismiss: function() {
              alert('Payment cancelled. Your order has been saved and you can complete payment later.')
            }
          }
        }
        const rzp = new window.Razorpay(options)
        rzp.on('payment.failed', function (response) {
          alert('Payment failed: ' + response.error.description)
        })
        rzp.open()
      } else {
        clearCart()
        navigate('/orders')
      }
    } catch (error) {
      alert('Checkout failed')
      console.error(error)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="bg-primary px-6 py-2 rounded">
          Continue Shopping
        </button>
      </div>
    )
  }

  const total = getTotal()
  const finalAmount = total - (total * discount / 100)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <div key={item._id} className="bg-dark-light rounded-lg p-4 mb-4 flex gap-4">
              <div className="w-24 h-24 bg-dark-lighter rounded flex items-center justify-center">
                <span className="text-3xl">📦</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-primary font-bold">₹{item.discountPrice || item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="bg-dark-lighter px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="w-12 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="bg-dark-lighter px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-dark-light rounded-lg p-6 mb-4">
            <h3 className="font-bold mb-4">Apply Coupon</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon Code"
                className="flex-1 bg-dark border border-dark-lighter rounded px-3 py-2"
              />
              <button onClick={handleApplyCoupon} className="bg-primary px-4 py-2 rounded">
                Apply
              </button>
            </div>
          </div>

          <div className="bg-dark-light rounded-lg p-6 mb-4">
            <h3 className="font-bold mb-4">Shipping Address</h3>
            <input
              type="text"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
              className="w-full bg-dark border border-dark-lighter rounded px-3 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="City"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
              className="w-full bg-dark border border-dark-lighter rounded px-3 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="State"
              value={shippingInfo.state}
              onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
              className="w-full bg-dark border border-dark-lighter rounded px-3 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={shippingInfo.pincode}
              onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
              className="w-full bg-dark border border-dark-lighter rounded px-3 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="Phone"
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
              className="w-full bg-dark border border-dark-lighter rounded px-3 py-2"
            />
          </div>

          <div className="bg-dark-light rounded-lg p-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between mb-2 text-green-500">
                <span>Discount ({discount}%)</span>
                <span>-₹{(total * discount / 100).toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-dark-lighter pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total</span>
                <span className="text-primary">₹{finalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              onClick={() => handleCheckout('razorpay')}
              className="w-full bg-primary py-3 rounded-lg mb-2 hover:bg-red-700 transition"
            >
              Pay with Razorpay
            </button>
            <button
              onClick={() => handleCheckout('cod')}
              className="w-full bg-dark-lighter py-3 rounded-lg hover:bg-dark transition"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
