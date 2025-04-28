'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ProductCard } from '@/components/products/ProductCard'
import { Cart } from '@/components/cart/Cart'
import { Loader } from '@/components/loader/Loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function Shop() {
  const router = useRouter()
  const {data: session, status} = useSession()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const categories = ['All', 'Piglets', 'Gilts', 'Boars', 'Sows', 'Manure']

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in')
    } else if (status === 'authenticated') {
      async function fetchProducts() {
        try {
          setLoading(true)
          const result = await fetch('/api/products', { cache: 'no-store' })
          const data = await result.json()
          setProducts(data.products || [])
  
        } catch (error) {
          console.error('Error fetching products:', error)
          setError('Failed to fetch products!')
        } finally {
          setLoading(false)
        }
      }
      fetchProducts()
    }
  }, [status, router])

  // filter products by category and search term
  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearchTerm
  })
  return (
    <>
      <div className='min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-green-700 text-center mb-8'>Shop Our Products</h1>
        {error && (
          <p className='text-center text-red-600 mb-4' role='alert'>
            {error}
          </p>
        )}

        {/* filter and search */}
        <div className='mb-4'>
          {/* search */}
          <div className='relative max-w-md mx-auto mb-4'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5' />
            <Input
              type='text'
              placeholder='Search products...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 border-green-600 focus:ring-green-500 text-green-700'
              aria-label='Search products by name'
            />
          </div>
          {/* filter */}
          <div className='flex flex-wrap justify-center gap-2 mb-8'>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`${selectedCategory === category
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'text-green-700 border-green-600 hover:bg-green-100'
                  } px-4 py-2 rounded-md`}
                onClick={() => setSelectedCategory(category)}>
                {category}
              </Button>
            ))}
          </div>
        </div>
        {/* product grid */}
        {loading ? <Loader /> : (
          filteredProducts.length === 0 ? (
            <p className='text-center text-red-600'>No products found!</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-12 sm:gap-8 sm:p-8 mt-0 md:p-12'>
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )
        )}
        <Cart />
      </div>
    </>
  )
}