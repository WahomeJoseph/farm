import "./globals.css";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./Provider";
import { Navbar } from "@/components/nav/Nav";
import CheckSession from "@/components/sign/CheckSession";
import Footer from "@/components/hero/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: {
    default: "Wahome Premium Pigs - Organic Pig Farming | Antibiotic-Free Pork | Profitable Pig Farming Tips ",
    template: "%s | Wahome Premium Pigs"
  },
  description: "Wahome Premium Pigs - Kenya's leading organic pig farm specializing in antibiotic-free pork production. Certified breeding stock, farm tours, and sustainable pig farming training in Nyeri.",
  keywords: [
    "organic pig farming Kenya",
    "antibiotic-free pigs",
    "piglets for sale Nyeri",
    "pig breeding stock",
    "sustainable pig farming",
    "Kenya pig farm",
    "premium pork Kenya"
  ],

  // open graph metadata
  openGraph: {
    title: "Wahome Premium Pigs - Organic Pig Farming | Antibiotic-Free Pork | Profitable Pig Farming Tips ",
    description: "Wahome Premium Pigs - Kenya's leading organic pig farm specializing in antibiotic-free pork production. Certified breeding stock, farm tours, and sustainable pig farming training in Nyeri.",
    url: "https://farm-orpin-mu.vercel.app",
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

  // twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: "Wahome Premium Pigs - Organic Pig Farming | Antibiotic-Free Pork | Profitable Pig Farming Tips ",
    description: "Wahome Premium Pigs - Kenya's leading organic pig farm specializing in antibiotic-free pork production. Certified breeding stock, farm tours, and sustainable pig farming training in Nyeri.",
    images: ["https://farm-orpin-mu.vercel.app/logo-remove.png"],
    site: "@WahomePigs",
    creator: "@WahomePigs",
  },

  authors: [{ name: "Wahome Joseph", url: "https://joseph-wachira-portfolio.vercel.app/" }],
  creator: "Wahome Premium Pigs",
  publisher: "Wahome Joseph",
  
  // google site verification
  verification: {
    google: "Lc_S4Dhiz8Yq2NnzllOqQSGeK_0AFLLb2oVmoB44jy4",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="translated-ltr">
      <SessionProvider>
        <StoreProvider>
          <body>
            <CheckSession />
            <Navbar />
            {children}
            <SpeedInsights />
            <Footer />
          </body>
        </StoreProvider>
      </SessionProvider>
    </html>
  );
}
