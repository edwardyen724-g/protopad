import React from 'react';
import Image from 'next/image';
import { SupabaseClient, createBrowserSupabaseClient } from '@supabase/supabase-js';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'tailwindcss/tailwind.css';

const supabase = createBrowserSupabaseClient();
const queryClient = new QueryClient();

const Page: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold">Prototype faster, iterate smarter with ProtoPad</h1>
          <p className="mt-4 text-xl text-gray-600">Rapid prototyping environment designed for small development teams in startups.</p>
        </header>
        <Image 
          src="/images/protopad-preview.png" 
          alt="ProtoPad Preview" 
          width={800} 
          height={450} 
          className="rounded-lg shadow-lg"
        />
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">MVP Features</h2>
          <ul className="list-disc list-inside mt-4">
            <li>Lightweight code editor with live preview functionality</li>
            <li>Instant setup with default templates for common frameworks</li>
            <li>Integrated debugging tools tailored for rapid feedback</li>
            <li>Collaboration features allowing real-time code sharing</li>
            <li>Version control integration with Git for easy tracking</li>
          </ul>
        </section>
        <footer className="mt-20">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} ProtoPad. All rights reserved.</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
};

export default Page;