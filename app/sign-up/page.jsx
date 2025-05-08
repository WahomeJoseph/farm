import React from 'react'
import { SignUp } from '@/components/sign/Register'
import { Suspense } from 'react'
import { Loader } from '@/components/loader/Loader'

export async function generateMetadata() {
  return {
    title: 'Sign Up | Wahome Premium Pigs',
    description: 'Create an account to explore our premium products and services.',
  }
}

export default function page() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
        <SignUp />
    </Suspense>
  )
}
