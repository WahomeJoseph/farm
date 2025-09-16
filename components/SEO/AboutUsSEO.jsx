import React from 'react';

export async function generateMetadata() {
  return {
    title: 'About Us | Wahome Premium Pigs - Learn more about profitable pig farming practices',
    description: 'Learn about our sustainable farming practices and commitment to quality.',
    openGraph: {
      title: 'About Us | Wahome Premium Pigs',
      description: 'Our commitment to animal welfare, environmental stewardship, and customer satisfaction drives everything we do. We take pride in every step of our process, from breeding to raising to delivering the finest pork products.',
      url: 'https://farm-orpin-mu.vercel.app/about-us',
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
    twitter: {
      card: 'summary_large_image',
      title: 'About Us | Wahome Premium Pigs',
      description: 'Our commitment to animal welfare, environmental stewardship, and customer satisfaction drives everything we do. We take pride in every step of our process, from breeding to raising to delivering the finest pork products.',
      images: ['https://media.istockphoto.com/id/1248963859/photo/pig-farms-in-confinement-mode.jpg?s=612x612&w=0&k=20&c=WvY9pkZW75vzmevYzXxTSKo9oe1I5KjL4v1djBXtbUg='],
      site: '@WahomePigs',
      creator: '@WahomePigs',
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://farm-orpin-mu.vercel.app/#organization",
      "name": "Wahome Premium Pigs",
      "url": "https://farm-orpin-mu.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://farm-orpin-mu.vercel.app/logo-remove.png"
      },
      "description": "Sustainable pig farming in Kenya, providing high-quality, eco-friendly pork products.",
      "foundingDate": "2023",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Kenya"
      },
      "employee": [
        {
          "@type": "Person",
          "name": "John Wahome",
          "jobTitle": "Owner Founder & Lead Farmer",
          "description": "John's passion for farming started in childhood, and he now leads our team with over 5 years of experience. He drives our eco-friendly initiatives, from waste management to sustainable feed sourcing.",
          "image": "https://farm-orpin-mu.vercel.app/john.jpeg"
        },
        {
          "@type": "Person",
          "name": "John",
          "jobTitle": "Farm Manager & Farm Hand",
          "description": "John oversees daily operations, ensuring our pigs are raised with care and our farm runs smoothly. He ensures the pigs are fed and does basic veterinary work including pigs breeding and farrowing.",
          "image": "https://farm-orpin-mu.vercel.app/john.jpeg"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://farm-orpin-mu.vercel.app/about-us",
      "url": "https://farm-orpin-mu.vercel.app/about-us",
      "name": "About Us | Wahome Premium Pigs",
      "isPartOf": {
        "@id": "https://farm-orpin-mu.vercel.app/#website"
      },
      "about": {
        "@id": "https://farm-orpin-mu.vercel.app/#organization"
      },
      "description": "Learn about our sustainable farming practices and commitment to quality.",
      "breadcrumb": {
        "@id": "https://farm-orpin-mu.vercel.app/about-us#breadcrumb"
      },
      "inLanguage": "en-US",
      "potentialAction": [
        {
          "@type": "ReadAction",
          "target": ["https://farm-orpin-mu.vercel.app/about-us"]
        }
      ]
    }
  ]
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
