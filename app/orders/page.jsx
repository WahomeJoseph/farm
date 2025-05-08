import Orders from '@/components/orders/Orders'
import { Suspense } from 'react'
import { Loader } from '@/components/loader/Loader'

export async function generateMetadata() {
  return {
    title: 'Orders | Wahome Premium Pigs',
    description: 'Manage and view your orders for our premium pigs and farm products.',
  }
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
        <Orders/>
    </Suspense>
  )
}
