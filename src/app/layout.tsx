import './globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ProtoPad',
  description: 'Rapid prototyping environment designed for small development teams in startups.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}