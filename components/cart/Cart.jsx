import React, { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster, toast } from 'sonner'
import CartIcon from './CartIcon'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../components/ui/sheet'
import { Button } from '../ui/button'
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react'
import { Input } from '../ui/input'
import Link from 'next/link'
import Image from 'next/image'
import { clearCart, removeItem, updateQuantity } from '@/lib/features/cart/Cartslice'

export default function Cart() {
  const [openCart, setOpenCart] = useState(false)
  const { pending } = useFormStatus()
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return
    dispatch(updateQuantity({ id, quantity: Number(quantity) }))
  }

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id))
    toast.success('Item removed from cart')
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast.success('Cart has been cleared!')
  }

  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <>
      <Toaster position="top-right" richColors />
      <Sheet open={openCart} onOpenChange={setOpenCart}>
        <SheetTrigger asChild>
          <Button
            className="fixed top-30 right-6 text-white rounded-full p-3 shadow-lg flex items-center gap-2 relative"
            aria-label="Shopping Cart">
            <CartIcon className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Your Shopping Cart</SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
              <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm mb-6">Start shopping to add items</p>
              <Button
                asChild
                className="mt-4 bg-amber-600 text-white hover:bg-amber-700">
                <Link href="/shop">Shop Now</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto py-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.addedAt || item.quantity}`}
                    className="flex items-center gap-4 p-3 mb-3 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                    {item.image && (
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">KES {item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || pending}
                          className="h-8 w-8">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          max={item.stockQuantity}
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(item.id, Math.max(1, Math.min(item.stockQuantity, Number(e.target.value))))
                          }
                          className="w-16 h-8 text-center"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stockQuantity || pending}
                          className="h-8 w-8">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-medium text-amber-600">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">Subtotal ({itemCount} items)</p>
                  <p className="text-lg font-bold text-amber-700">
                    KES {total.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleClearCart}
                    className="flex-1 text-red-600 hover:bg-red-50">
                    Clear Cart
                  </Button>
                  <Button
                    asChild
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                    <Link href="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}