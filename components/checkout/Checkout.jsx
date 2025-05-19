'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast, Toaster } from 'sonner'
import { clearCart } from '@/lib/features/cart/Cartslice'

export const Checkout = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  const [loading, setLoading] = useState(false)
  const [orderStatus, setOrderStatus] = useState('pending')
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  // prefill shippingInfo for authenticated users
  useEffect(() => {
    if (session?.user) {
      setShippingInfo((prev) => ({
        ...prev,
        name: session.user.name || prev.name,
        email: session.user.email || prev.email
      }))
    }
  }, [session])

  if (status === "loading") {
    return <p className="text-center py-12 text-gray-600">Loading...</p>;
  }
  if (status === 'unauthenticated') {
    router.push('/sign-in')
    return null
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address) {
      toast.error('Please fill in all shipping details', { duration: 3000 })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) {
      toast.error('Please enter a valid email', { duration: 3000 })
      return
    }
    if (!/^\+?\d{10,15}$/.test(shippingInfo.phone)) {
      toast.error('Please enter a valid phone number', { duration: 3000 })
      return
    }
    if (cartItems.length === 0) {
      toast.error('Your cart is empty', { duration: 3000 })
      return
    }
    console.log('Cart Items', cartItems)

    setLoading(true)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user?.id || null,
          userEmail: shippingInfo.email,
          items: cartItems.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          shippingInfo,
          total,
          status: 'pending',
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        console.log('API Response:', data)
        throw new Error(data.message || 'Failed to place order')
      }
      toast.success('Order placed successfully!', { duration: 3000 })
      dispatch(clearCart())
      router.push(`/orders/${data.order._id}`)
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error(error.message || 'Failed to place order', { duration: 3000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8'>
      <Toaster />
      <h1 className='text-3xl font-bold text-green-700 text-center mb-8'>Checkout</h1>
      <div className='max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Shipping Info */}
        <div className='bg-white p-6 rounded-xl shadow-md'>
          <h2 className='text-xl font-semibold text-green-700 mb-4'>Shipping Information</h2>
          <form onSubmit={handlePlaceOrder} className='space-y-4'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                type='text'
                value={shippingInfo.name}
                onChange={handleInputChange}
                disabled={loading}
                className='border-green-600 focus:ring-green-500'
                placeholder='John Doe'
                required
              />
            </div>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                readOnly
                value={shippingInfo.email}
                onChange={handleInputChange}
                disabled={loading}
                className='border-green-600 focus:ring-green-500'
                placeholder='test@example.com'
                required
              />
            </div>
            <div>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                id='phone'
                name='phone'
                type='tel'
                value={shippingInfo.phone}
                onChange={handleInputChange}
                className='border-green-600 focus:ring-green-500'
                placeholder='07 123 456 789'
                required
              />
            </div>
            <div>
              <Label htmlFor='address'>Address</Label>
              <Input
                id='address'
                name='address'
                value={shippingInfo.address}
                onChange={handleInputChange}
                className='border-green-600 focus:ring-green-500'
                placeholder='123 Farm Road, Nairobi'
                required
              />
            </div>
            {/* Status Selection */}
            <div>
              <Label>Order Status</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="status-pending"
                    name="status"
                    value="pending"
                    checked={orderStatus === 'pending'}
                    onChange={() => setOrderStatus('pending')}
                    disabled
                    className="h-4 w-4 text-yellow-400 border-gray-300 focus:ring-yellow-500"
                  />
                  <label
                    htmlFor="status-cancelled"
                    className="ml-2 flex items-center justify-center text-sm text-gray-700">
                    Pending
                    <span className="ml-1 inline-block h-3 w-3 rounded-full bg-yellow-500"></span>
                  </label>
                </div>
              </div>
            </div>
            <Button
              type='submit'
              className='w-full bg-green-600 hover:bg-green-700 text-white'
              disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className='bg-white p-6 rounded-xl shadow-md'>
          <h2 className='text-xl font-semibold text-green-700 mb-4'>Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className='text-gray-600'>Your cart is empty</p>
          ) : (
            <div className='space-y-4'>
              {cartItems.map((item, index) => (
                <div key={`${item.productId}-${index}`} className='flex justify-between'>
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                  <span className=''>{item.status}</span>
                </div>
              ))}
              <div className='border-t pt-4'>
                <div className='flex justify-between font-semibold'>
                  <span>Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}