import { Suspense } from 'react'
import { Loader } from '@/components/loader/Loader'
import About from '@/components/about/About'

export async function generateMetadata() {
  return {
    title: 'About Us | Wahome Premium Pigs',
    description: 'Raising pigs with purpose from farm to fork, we bring you closer to the source. Discover our passion for sustainable, eco-friendly farming and premium pig rearing',
    keywords: [
      "about wahome premium pigs",
      "organic pig farming Kenya",
      "sustainable pig farming",
      "antibiotic-free pork",
      "pig farming practices",
      "farm tours Nyeri",
      "pig breeding stock",
      "premium pork Kenya"
    ],
    robots: "index, follow",
    openGraph: {
      title: 'About Us | Wahome Premium Pigs',
      description: 'Raising pigs with purpose from farm to fork, we bring you closer to the source. Discover our passion for sustainable, eco-friendly farming and premium pig rearing',
      url: "https://farm-orpin-mu.vercel.app/about-us",
      siteName: "Wahome Premium Pigs",
      images: [
        {
          url: "https://farm-orpin-mu.vercel.app/logo-remove.png",
          width: 800,
          height: 600,
        },
        {
          url: "https://farm-orpin-mu.vercel.app/logo-remove.png",
          width: 1800,
          height: 1600,
          alt: "Wahome Premium Pigs",
        },
      ],
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: 'About Us | Wahome Premium Pigs',
      description: 'Raising pigs with purpose from farm to fork, we bring you closer to the source. Discover our passion for sustainable, eco-friendly farming and premium pig rearing',
      images: ["https://farm-orpin-mu.vercel.app/logo-remove.png"],
      site: "@WahomePigs",
      creator: "@WahomePigs",
    },
    authors: [{ name: "Wahome Joseph", url: "https://joseph-wachira-portfolio.vercel.app/" }],
    creator: "Wahome Premium Pigs",
    publisher: "Wahome Premium Pigs",
  }
}

export default function page() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <About/>
    </Suspense>
  )
}
