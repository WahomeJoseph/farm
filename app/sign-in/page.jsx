import React from 'react'
import { SignIn } from '@/components/sign/Login'
import { Suspense } from 'react'
import { Loader } from '@/components/loader/Loader'

export default function page() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <SignIn />
    </Suspense>
  )
}
