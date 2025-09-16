import Blog from '@/components/blog/Blog'
import React from 'react'

export async function generateMetadata() {
  return {
    title: 'Our Blogs | Wahome Premium Pigs - Learn more about profitable pig farming practices',
    description: 'Explore our blog for insights on sustainable pig farming, animal welfare, and industry trends.',
    openGraph: {
      title: 'Our Blogs | Wahome Premium Pigs',
      description: 'Stay updated with the latest trends and insights in pig farming through our informative blog posts.',
      url: 'https://farm-orpin-mu.vercel.app/our-blogs',
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
      title: 'Our Blogs | Wahome Premium Pigs',
      description: 'Stay updated with the latest trends and insights in pig farming through our informative blog posts.',
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
    <>
      <Blog />
    </>
  )
}
