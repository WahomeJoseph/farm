import Contact from '@/components/contact-us/Contact'
import { Suspense } from 'react'
import { Loader } from '@/components/loader/Loader'

export async function generateMetadata() {
  return {
    title: 'Contact Us | Wahome Premium Pigs',
    description: 'Get in touch with us for inquiries, orders, and more.',
    keywords: [
      "contact wahome premium pigs",
      "inquiries wahome pigs",
      "orders wahome pigs",
      "customer support wahome pigs",
      "farm tours contact",
      "pig breeding stock inquiries",
      "sustainable pig farming contact"
    ],
    robots: "index, follow",
    openGraph: {
      title: 'Contact Us | Wahome Premium Pigs',
      description: 'Get in touch with us for inquiries, orders, and more.',
      url: "https://farm-orpin-mu.vercel.app/contact-us",
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
      title: 'Contact Us | Wahome Premium Pigs',
      description: 'Get in touch with us for inquiries, orders, and more.',
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
      <Contact />
    </Suspense>
  )
}
