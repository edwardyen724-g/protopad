import React from 'react';
import { useQuery } from 'react-query';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabaseClient';
import { CodeEditor } from '@/components/CodeEditor';
import { LivePreview } from '@/components/LivePreview';

const supabase: SupabaseClient = createClient();

const CollaborationPage = () => {
  const { data: codeSnippets, error, isLoading } = useQuery('codeSnippets', async () => {
    const { data, error } = await supabase.from('code_snippets').select('*');
    if (error) throw new Error(error.message);
    return data;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Prototype faster, iterate smarter with ProtoPad.</h1>
      <div className="w-full max-w-4xl p-4 space-y-4">
        {codeSnippets.map(snippet => (
          <div key={snippet.id} className="border p-4 rounded shadow">
            <CodeEditor initialCode={snippet.code} />
            <LivePreview code={snippet.code} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationPage;