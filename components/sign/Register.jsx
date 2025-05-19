'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast, Toaster } from 'sonner'
import { TriangleAlert } from 'lucide-react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

export const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setPending(true)

    // Client-side validation
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      toast.error('Passwords do not match', { duration: 4000 })
      setPending(false)
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long')
      toast.error('Password must be at least 8 characters long', { duration: 4000 })
      setPending(false)
      return
    }

    try {
      // Register user
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Account registered successfully!', {
          duration: 4000,
        })

        // Auto-login after registration
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: form.email,
          password: form.password,
        })

        if (signInResult?.ok) {
          toast.success('Signed in successfully!', { duration: 4000 })
          router.push('/shop')
        } else {
          const errorMsg = signInResult?.error || 'Failed to sign in after registration'
          setError(errorMsg)
          toast.error(errorMsg, { duration: 4000 })
        }
      } else {
        const errorMsg = data.message || 'An error occurred. Please try again.'
        setError(errorMsg)
        toast.error(errorMsg, { duration: 4000 })
      }
    } catch (err) {
      console.error('Registration error:', err)
      const errorMsg = 'An unexpected error occurred. Please try again.'
      setError(errorMsg)
      toast.error(errorMsg, {
        duration: 5000,
        icon: <TriangleAlert className='h-4 w-4' />,
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <div className='min-h-screen bg-transparent flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8'>
      <Toaster />
      <div className='w-full max-w-4xl bg-white shadow-xl mt-20 rounded-xl overflow-hidden flex flex-col md:flex-row'>
        {/* image */}
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
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-green-200 rounded-full opacity-20"></div>
          <div className="absolute -top-2 -left-2 w-24 h-24 bg-green-100 rounded-full opacity-30"></div>
        </div>
        <Card className='md:w-1/2 bg-white/95 p-6 sm:p-8 border-none'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold text-green-700'>
              Create Your Account
            </CardTitle>
            <CardDescription className='text-sm font-light text-gray-600'>
              Sign up account with your credentials
            </CardDescription>
          </CardHeader>

          {/* Error Message */}
          {error && (
            <div className='bg-red-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-700 mb-6 mx-4 sm:mx-6'>
              <TriangleAlert className='h-4 w-4' />
              <p>{error}</p>
            </div>
          )}

          <CardContent className='space-y-6 px-4 sm:px-6'>
            {/* Signup Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='username'
                  className='text-sm font-medium text-gray-700'>
                  Username
                </label>
                <Input
                  id='username'
                  type='text'
                  placeholder='johndoe'
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  disabled={pending}
                  required
                  className='border-gray-300 focus:ring-green-500 focus:border-green-500'
                />
              </div>
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
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
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
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  disabled={pending}
                  required
                  className='border-gray-300 focus:ring-green-500 focus:border-green-500' />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='confirmPassword'
                  className='text-sm font-medium text-gray-700'>
                  Confirm Password
                </label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='••••••••'
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
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
                {pending ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>

            {/* Sign In Link */}
            <p className='text-center text-sm text-gray-600'>
              Already have an account?{' '}
              <Link
                href='/sign-in'
                className='text-green-600 hover:underline font-medium'>
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}