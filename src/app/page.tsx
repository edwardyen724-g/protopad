import React from 'react';
import { useQuery } from 'react-query';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Page: React.FC = () => {
  const { data, error, isLoading } = useQuery('features', async () => {
    const { data, error } = await supabase
      .from('features')
      .select('*');

    if (error) throw new Error(error.message);
    return data;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error instanceof Error ? error.message : String(error)}</div>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Prototype faster, iterate smarter with ProtoPad</h1>
        <p className="mt-2 text-lg text-gray-700">Rapid prototyping environment designed for small development teams in startups.</p>
      </header>
      <section className="w-full max-w-2xl p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">MVP Features</h2>
        <ul className="mt-4 space-y-2">
          <li>🔹 Lightweight code editor with live preview functionality</li>
          <li>🔹 Instant setup with default templates for common frameworks</li>
          <li>🔹 Integrated debugging tools tailored for rapid feedback</li>
          <li>🔹 Collaboration features allowing real-time code sharing</li>
          <li>🔹 Version control integration with Git for easy tracking</li>
        </ul>
      </section>
      <footer className="mt-8">
        <p className="text-gray-500">© {new Date().getFullYear()} ProtoPad. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Page;