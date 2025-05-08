import { Suspense } from 'react'
import { Loader } from '@/components/loader/Loader'
import { Checkout } from '@/components/checkout/Checkout'

export async function generateMetadata() {
  return {
    title: 'Checkout | Wahome Premium Pigs',
    description: 'Complete your purchase and enjoy our premium products.',
  }
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <Checkout />
    </Suspense>
  )
}
