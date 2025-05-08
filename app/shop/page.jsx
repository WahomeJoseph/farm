import Shop from '@/components/shop/Shop'
import { Suspense } from 'react'
import { Loader } from '@/components/loader/Loader'

export async function generateMetadata() {
  return {
    title: 'Shop | Wahome Premium Pigs',
    description: 'Explore and purchase our premium pigs and farm products.',
  }
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <Shop />
    </Suspense>
  )
}
