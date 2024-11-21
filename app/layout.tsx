import { Inter } from 'next/font/google';
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Providers from "./providers";

//import type { Metadata } from "next";
//import localFont from "next/font/local";

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

