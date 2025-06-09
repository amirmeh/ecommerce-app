import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import Auth from '@/modules/auth/components';
import ReactQueryProvider from '@/providers/ReactQuery';
import NavMenu from '@/components/navmenu';
import CartDropdown from '@/modules/cart/components/CartDropdown';

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
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      // afterSignOutUrl={'/after-signout'}
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
                </div>
                <div className="flex justify-between items-center w-full">
                  <NavMenu />
                  <div className="flex items-center justify-center gap-2">
                    <Auth />
                    <CartDropdown />
                  </div>
                </div>
              </header>

              <div className="px-20 py-10 mt-22">
                {children}
                <Toaster />
              </div>

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
