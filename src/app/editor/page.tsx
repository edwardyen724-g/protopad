import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { supabase } from '@/lib/supabaseClient';
import Editor from '@/components/Editor';
import LivePreview from '@/components/LivePreview';
import TemplateSelector from '@/components/TemplateSelector';
import { fetchTemplates } from '@/lib/fetchTemplates';
import { useAuth } from '@/context/AuthContext';

const EditorPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { data: templates, error: fetchError, isLoading: templatesLoading } = useQuery('templates', fetchTemplates);

  useEffect(() => {
    if (templates && templates.length > 0) {
      setSelectedTemplate(templates[0].id); // Select the first template by default
    }
  }, [templates]);

  if (templatesLoading) {
    return <div>Loading templates...</div>;
  }

  if (fetchError) {
    return <div>Error loading templates: {fetchError instanceof Error ? fetchError.message : String(fetchError)}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-3xl font-bold text-center mt-4">Prototype faster, iterate smarter with ProtoPad</h1>
      {user ? (
        <div className="flex flex-grow">
          <TemplateSelector templates={templates} onSelect={setSelectedTemplate} />
          <div className="flex-grow">
            {selectedTemplate && <Editor templateId={selectedTemplate} />}
            <LivePreview templateId={selectedTemplate} />
          </div>
        </div>
      ) : (
        <div className="text-center mt-4">Please log in to start prototyping.</div>
      )}
    </div>
  );
};

export default EditorPage;