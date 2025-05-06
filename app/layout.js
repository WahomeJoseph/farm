import "./globals.css";
import StoreProvider from "./Provider";
import { Navbar } from "@/components/nav/Nav";
import { SessionProvider } from "next-auth/react";

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
