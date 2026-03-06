import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Editor } from 'lib/editor'; // Assuming there's an editor component located in lib/editor
import { fetchTemplates } from 'lib/fetchTemplates'; // Function to fetch default templates

const LivePreview = dynamic(() => import('lib/LivePreview'), { ssr: false });

const Page: React.FC = () => {
  const supabase = useSupabaseClient();
  const { data: templates = [], isLoading } = useQuery('fetchTemplates', fetchTemplates);

  useEffect(() => {
    // Effect to handle any initialization logic for enhancing the editor
    if (templates.length > 0) {
      // You can initialize the editor with the first template or any other business logic needed
    }
  }, [templates]);

  if (isLoading) {
    return <div>Loading templates...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Prototype faster, iterate smarter with ProtoPad</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <Editor templates={templates} />
        </div>
        <div>
          <LivePreview />
        </div>
      </div>
    </div>
  );
};

export default Page;