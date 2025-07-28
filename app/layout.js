import "./globals.css";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./Provider";
import { Navbar } from "@/components/nav/Nav";
import CheckSession from "@/components/sign/CheckSession";
import Footer from "@/components/hero/Footer";

export const metadata = {
  title: {
    default: "Wahome Premium Pigs",
  },
  description: "Wahome Premium Pigs - Your leading source for premium pig breeds in Kenya and quality pork suppliers. Get scalable pig farming tips make profits with our expert advice and resources.",
  keywords: "Wahome Premium Pigs, pig farming, premium pigs, pork suppliers, Kenya, pig breeds, scalable farming, farming tips, quality pork, profitable farming",
  authors: [{ name: "Wahome Premium Pigs" }],
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
