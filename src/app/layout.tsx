import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import Auth from '@/components/auth';
import ReactQueryProvider from '@/providers/ReactQuery';
import CartDropdown from '@/components/cart';
import NavMenu from '@/components/navmenu';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tehran Apple Store',
  description: 'E-Commerce to buy apple company products',
};

export default function RootLayout({
  children, // slot for ads
  ads, // slot for children
}: Readonly<{
  children: React.ReactNode;
  ads: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          headerTitle: {
            color: '#00f',
          },
          formButtonPrimary: {
            fontSize: 16,
            // backgroundColor: '#000',
            // '&:hover': {
            //   backgroundColor: '#f00',
            // },
          },
        },
      }}
    >
      <ReactQueryProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <main className="flex flex-col justify-between min-h-screen">
              <header className="fixed flex flex-col items-center shadow-xl bg-gray-50 px-20 w-full py-1.5 gap-y-2 z-40">
                <div className="flex justify-between items-center w-full">
                  <Link href="/" className="font-bold text-2xl">
                    <div className="flex items-center gap-3">
                      <MonitorSmartphone />
                      Tehran Apple Store
                    </div>
                  </Link>
                  <div className="flex items-center justify-center gap-2">
                    <Auth />
                    <CartDropdown />
                  </div>
                </div>
                <div className="flex justify-start items-center w-full">
                  <NavMenu />
                </div>
              </header>

              <div className="px-20 mt-28">
                {children}
                <Toaster />
              </div>
              {/* <div className="my-10 mx-auto flex justify-center">{ads}</div> */}

              <footer className="bg-black w-full text-white flex items-center justify-center h-10">
                <p>
                  Copyright &copy; 2025 Tehran Apple Store. All rights reserved.
                </p>
              </footer>
            </main>
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
