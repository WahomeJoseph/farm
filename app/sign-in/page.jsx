import React from 'react'
import { SignIn } from '@/components/sign/Login'
import { Suspense } from 'react'
import { Loader } from '@/components/loader/Loader'

export async function generateMetadata() {
  return {
    title: 'Sign In | Wahome Premium Pigs',
    description: 'Access your account to explore our premium products and services.',
  }
}

export default function page() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <SignIn />
    </Suspense>
  )
}
