'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'
import { TriangleAlert } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'

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
      const res = await axios.post('http://localhost:3000/api/auth/register', {
          username: form.username,
          email: form.email,
          password: form.password,
      }, {
        headers: { 'Content-Type': 'application/json' }
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

  const handleProvider = async (e, provider) => {
    e.preventDefault()
    setPending(true)
    setError(null)
    try {
      await signIn(provider, { callbackUrl: '/shop' })
      toast.success(`Signed in with ${provider} successfully!`, { duration: 3000 })
    } catch (err) {
      console.error(`Error signing in with ${provider}:`, err)
      const errorMsg = `Failed to sign up with ${provider}. Please try again.`
      setError(errorMsg)
      toast.error(errorMsg, {
        duration: 4000,
        icon: <TriangleAlert className='h-4 w-4' />,
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <div className='min-h-screen bg-transparent'>
      <div className='flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8'>
        <div className='w-full max-w-4xl bg-white shadow-xl mt-20 rounded-xl overflow-hidden flex flex-col md:flex-row'>
          <div className="md:w-1/2 relative h-64 md:h-auto bg-green-100/30 flex flex-col items-center justify-center p-8">
            <span className="text-[2rem] m-0 p-0 text-green-600">𝒲𝑒𝓁𝒸𝑜𝓂𝑒 𝒯𝑜 𝒲𝒶𝒽𝑜𝓂𝑒 𝒫𝓇𝑒𝓂𝒾𝓊𝓂 𝒫𝒾𝑔𝓈. 𝐸𝓃𝒿𝑜𝓎 𝒪𝓊𝓇 𝒫𝓇𝑜𝒹𝓊𝒸𝑒</span>
            <Image
              src="/sign-up.svg"
              alt="Wahome Premium Pigs Farm Illustration"
              width={400}
              height={400}
              className="object-contain object-center w-full h-full"
              priority
            />
          </div>
          <Card className='md:w-1/2 bg-white/95 p-6 sm:p-8 border-none'>
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl font-bold text-green-700'>
                Create Your Account
              </CardTitle>
              <CardDescription className='text-sm text-gray-600'>
                Sign up with email or Google
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
                    className='border-gray-300 focus:ring-green-500 focus:border-green-500'/>
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

              {/* Separator */}
              <div className='relative'>
                <Separator className='my-4' />
                <span className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500'>
                  or sign up with
                </span>
              </div>

              {/* Social Login Button */}
              <div className='flex justify-center'>
                <Button
                  variant='outline'
                  size='lg'
                  onClick={(e) => handleProvider(e, 'google')}
                  disabled={pending}
                  className='flex items-center gap-2 border-gray-300 hover:bg-green-100/30 pointer-cursor w-full max-w-xs'>
                  <FcGoogle className='h-5 w-5' />
                  Google
                </Button>
              </div>

              {/* Sign In Link */}
              <p className='text-center text-sm text-gray-600'>
                Already have an account?{' '}
                <Link
                  href='/sign-in'
                  className='text-green-600 hover:underline font-medium'
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}