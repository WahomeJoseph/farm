import Gallery from '@/components/products/Gallery'
import React from 'react'

export async function generateMetadata() {
  return {
    title: 'Our Farm Gallery | Wahome Premium Pigs - Explore Our Farm and Livestock',
    description: 'Discover our farm through our gallery showcasing healthy pigs, sustainable farming practices, and quality livestock.',
    openGraph: {
      title: 'Our Farm Gallery | Wahome Premium Pigs',
      description: 'Explore our farm and livestock through our gallery, highlighting our commitment to quality and sustainability in pig farming.',
      url: 'https://farm-orpin-mu.vercel.app/our-farm-gallery',
      siteName: 'Wahome Premium Pigs',
      images: [
        {
          url: 'https://media.istockphoto.com/id/1248963859/photo/pig-farms-in-confinement-mode.jpg?s=612x612&w=0&k=20&c=WvY9pkZW75vzmevYzXxTSKo9oe1I5KjL4v1djBXtbUg=',
          width: 800,
          height: 600,
          alt: 'Wahome Premium Pigs Farm',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    robots: 'index, follow',
    twitter: {
      card: 'summary_large_image',
      title: 'Our Farm Gallery | Wahome Premium Pigs',
      description: 'Explore our farm and livestock through our gallery, highlighting our commitment to quality and sustainability in pig farming.',
      images: ['https://media.istockphoto.com/id/1248963859/photo/pig-farms-in-confinement-mode.jpg?s=612x612&w=0&k=20&c=WvY9pkZW75vzmevYzXxTSKo9oe1I5KjL4v1djBXtbUg='],
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
    <div>
      <Gallery />
    </div>
  )
}
