import "./globals.css";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./Provider";
import { Navbar } from "@/components/nav/Nav";

export const metadata = {
  title: {
    default: "Wahome Premium Pigs",
  },
  description: "Wahome Premium Pigs - Your source for premium pigs and quality farm products.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="translated-ltr">
      <SessionProvider>
        <StoreProvider>
          <body>
            <Navbar />
            {children}
          </body>
        </StoreProvider>
      </SessionProvider>
    </html>
  );
}
