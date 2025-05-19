'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { updateQuantity, removeItem, clearCart } from '@/lib/features/cart/Cartslice'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

export const Cart = () => {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    dispatch(updateQuantity({ productId, quantity: Number(quantity) }))
  }

  const handleRemoveItem = (productId) => {
    dispatch(removeItem(productId))
    toast.success('Item removed from cart', { duration: 3000 })
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast.success('Cart cleared', { duration: 3000 })
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          className='fixed top-30 right-6 bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-full p-3 shadow-lg flex items-center gap-2'>
          <ShoppingCart size={30}/>
          Cart ({items.length})
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full max-w-md bg-white p-6 sm:p-8'>
        <SheetHeader>
          <SheetTitle className='text-2xl font-bold text-green-700 uppercase'>Your Cart</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full text-center text-gray-600'>
            <ShoppingCart className='h-12 w-12 text-gray-400 mb-4' />
            <p className='text-lg font-medium'>Your cart is empty</p>
            <p className='text-sm'>Add some fresh produce to get started!</p>
            <Button
              asChild
              className='mt-4 bg-green-600 text-white hover:bg-green-700'>
              <Link href='/shop'>Shop Now</Link>
            </Button>
          </div>
        ) : (
          <div className='mt-6 space-y-6'>
            {/* Cart Items */}
            {items.map((item, index) => (
              <div key={item.productId ? `${item.productId}-${item.quantity}` : `fallback-key-${index}`} className='flex shadow-sm hover:shadow-md p-2 items-center gap-4'>
                <div className='flex-1'>
                  <p className='font-semibold text-gray-800'>{item.name}</p>
                  <p className='text-sm text-gray-600'>KES {item.price.toLocaleString()}</p>
                  {/* Quantity Control */}
                  <div className='flex items-center gap-2 mt-2'>
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 0 || pending}
                      className='h-8 w-8 border-gray-300 hover:bg-gray-100'>
                      <Minus className='h-4 w-4' />
                    </Button>
                    <Input
                      type='text'
                      min='1'
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.productId, Number(e.target.value))}
                      className='w-16 h-8 text-center border-gray-300 focus:ring-green-500 focus:border-green-500'
                      disabled={pending} />
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                      disabled={pending}
                      className='h-8 w-8 border-gray-300 hover:bg-gray-100'>
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => handleRemoveItem(item.productId)}
                  className='text-red-600 hover:bg-red-100'
                  disabled={pending}>
                  <Trash2 className='h-5 w-5' />
                </Button>
              </div>
            ))}
            <Separator className='my-4' />
            <div className='flex justify-between items-center'>
              <p className='text-lg font-bold text-green-700'>
                Total: KES {total.toLocaleString()}
              </p>
              <Button
                variant='ghost'
                onClick={handleClearCart}
                className='text-red-600 hover:text-red-700 hover:bg-red-100'
                disabled={pending}>
                Clear Cart
              </Button>
            </div>
            <Button
              asChild
              className="w-full bg-green-600 hover:bg-green-700 text-white disabled:bg-green-400"
              disabled={items.length === 0}>
              <Link href="/checkout">
                {pending ? 'Checking out..' : 'Proceed to Checkout'}
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}