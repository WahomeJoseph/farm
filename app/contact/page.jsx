import Contact from '@/components/contact/Contact'
import { Suspense } from 'react'
import { Loader } from '@/components/loader/Loader'

export async function generateMetadata() {
  return {
    title: 'Contact Us | Wahome Premium Pigs',
    description: 'Get in touch with us for inquiries, orders, and more.',
  }
}

export default function page() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <Contact />
    </Suspense>
  )
}
