import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SupabaseProvider } from '../context/SupabaseContext';

const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();

export const metadata = {
  title: 'ProtoPad',
  description: 'Rapid prototyping environment designed for small development teams in startups.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <QueryClientProvider client={queryClient}>
          <SupabaseProvider>
            <div className="container mx-auto p-4">
              <header className="mb-8">
                <h1 className="text-4xl font-bold">Prototype faster, iterate smarter with ProtoPad.</h1>
                <p className="text-lg mt-2">{metadata.description}</p>
              </header>
              {children}
            </div>
          </SupabaseProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}