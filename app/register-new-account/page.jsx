import React from 'react'
import { SignUp } from '@/components/sign/Register'
import { Suspense } from 'react'
import { Loader } from '@/components/loader/Loader'

export async function generateMetadata() {
  return {
    title: 'Register New Account | Wahome Premium Pigs',
    description: 'Create a ane account to explore our premium products and services.',
    openGraph: {
      title: 'Register New Account | Wahome Premium Pigs',
      description: 'Create a new account to explore our premium products and services.',
      url: 'https://farm-orpin-mu.vercel.app/register-new-account',
      siteName: 'Wahome Premium Pigs',
      images: [
        {
          url: 'https://farm-orpin-mu.vercel.app/logo-remove.png',
          width: 800,
          height: 600,
          alt: 'Wahome Premium Pigs',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    robots: 'index, follow',
    twitter: {
      card: 'summary_large_image',
      title: 'Register New Account | Wahome Premium Pigs',
      description: 'Create a new account to explore our premium products and services.',
      images: ['https://farm-orpin-mu.vercel.app/logo-remove.png'],
      site: '@WahomePigs',
      creator: '@WahomePigs',
    },
    authors: [{ name: 'Wahome Joseph', url: 'https://joseph-wachira-portfolio.vercel.app/' }],
    creator: 'Wahome Premium Pigs',
    publisher: 'Wahome Premium Pigs',
  }
}

export default function page() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
        <SignUp />
    </Suspense>
  )
}
