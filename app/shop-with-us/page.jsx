import Shop from '@/components/shop/Shop'
import { Suspense } from 'react'
import { Loader } from '@/components/loader/Loader'

export async function generateMetadata() {
  return {
    title: 'Our Shop | Wahome Premium Pigs',
    description: 'Explore and purchase our premium pigs and farm products. Place your order now.',
    openGraph: {
      title: 'Our Shop | Wahome Premium Pigs',
      description: 'Explore and purchase our premium pigs and farm products. Place your order now.',
      url: 'https://farm-orpin-mu.vercel.app/shop-with-us',
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
      title: 'Our Shop | Wahome Premium Pigs',
      description: 'Explore and purchase our premium pigs and farm products. Place your order now.',
      images: ['https://farm-orpin-mu.vercel.app/logo-remove.png'],
      site: '@WahomePigs',
      creator: '@WahomePigs',
    },
    authors: [{ name: 'Wahome Joseph', url: 'https://joseph-wachira-portfolio.vercel.app/' }],
    creator: 'Wahome Premium Pigs',
    publisher: 'Wahome Premium Pigs',
  }
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <Shop />
    </Suspense>
  )
}
