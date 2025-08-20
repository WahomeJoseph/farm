import "./globals.css";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./Provider";
import { Navbar } from "@/components/nav/Nav";
import CheckSession from "@/components/sign/CheckSession";
import Footer from "@/components/hero/Footer";

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
  authors: [{ name: "Wahome Joseph", url: "https://joseph-wachira-portfolio.vercel.app/" }],
  creator: "Wahome Premium Pigs",
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
            <Footer/>
          </body>
        </StoreProvider>
      </SessionProvider>
    </html>
  );
}
