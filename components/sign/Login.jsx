'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast, Toaster } from 'sonner'
import { TriangleAlert } from 'lucide-react'
import { signIn } from 'next-auth/react'

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPending(true)
    try {
      if (!email || !password) {
        toast.error('Email and password fields are required')
        return
      }
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (res?.ok) {
        toast.success('Login successful', { duration: 3000 })
        router.push('/shop')
      } else {
        setError('Failed to login user!')
        toast.error('Failed to login user!'), { duration: 3000 }
      }
    } catch (err) {
      toast.error('An unexpected error occurred.', { duration: 3000 })
    } finally {
      setPending(false)
    }
  }

  return (
    <div className='min-h-screen bg-transparent flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8'>
      <Toaster />
      <div className='w-full max-w-4xl bg-white shadow-xl mt-20 rounded-xl overflow-hidden flex flex-col md:flex-row'>
        <div className="w-full md:w-1/2 relative bg-green-50 flex flex-col items-center justify-center p-6 md:p-8 lg:p-10 overflow-hidden rounded-lg shadow-sm">
          <h1 className="text-[2rem] font-bold text-green-700 text-center mb-6 md:mb-8 font-serif tracking-wide">
          𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑾𝒂𝒉𝒐𝒎𝒆 𝑷𝒓𝒆𝒎𝒊𝒖𝒎 𝑷𝒊𝒈𝒔.
          </h1>

          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden border-2 border-green-200 shadow-md">
            <Image
              src="https://media.istockphoto.com/id/2096466604/photo/pigs-eating-healthy-food-in-a-biodynamic-farm.jpg?s=612x612&w=0&k=20&c=9X5aNZzqmq9S6O81qUJFLRAIin48L1W6CWbjG3xDTkA="
              alt="Happy pigs grazing at Wahome Premium Pigs farm"
              fill
              priority
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </div>

          
        </div>

        <Card className='md:w-1/2 bg-white/95 p-6 sm:p-8 border-none'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold text-green-700'>
              Login to your account
            </CardTitle>
            <CardDescription className='text-sm font-light text-gray-600'>
              Access your account with your credentials
            </CardDescription>
          </CardHeader>

          {/* Error Message */}
          {error && (
            <div className='bg-red-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-700 mb-6 mx-4 sm:mx-6'>
              <TriangleAlert className='h-4 w-4' />
              <p>
                {error === 'AccessDenied'
                  ? 'Access denied. Please check your credentials.'
                  : error === 'OAuthSignin error'
                    ? 'Google sign-in failed. Try again.'
                    : 'An error occurred. Please try again.'}
              </p>
            </div>
          )}

          <CardContent className='space-y-6 px-4 sm:px-6'>
            {/* Credentials Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='text-sm font-medium text-gray-700'>
                  Email
                </label>
                <Input
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={pending}
                  required
                  className='border-gray-300 focus:ring-green-500 focus:border-green-500'
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-sm font-medium text-gray-700'>
                  Password
                </label>
                <Input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={pending}
                  required
                  className='border-gray-300 focus:ring-green-500 focus:border-green-500'
                />
              </div>
              <Button
                type='submit'
                className='w-full bg-green-600 hover:bg-green-700 text-white'
                size='lg'
                disabled={pending}>
                {pending ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className='text-center text-sm text-gray-600'>
              Don’t have an account?{' '}
              <Link
                href='/register-new-account'
                className='text-green-600 hover:underline font-medium'
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}