import React from 'react';
import { useSupabaseClient } from '@supabase/supabase-js';
import { useQuery } from 'react-query';
import { debounce } from 'lodash';
import Editor from 'react-simple-code-editor';
import { useUser } from '@/context/UserContext'; // Assuming there's a context for user authentication

const CollaborationPage: React.FC = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const fetchCollaborationData = async () => {
    if (!user) throw new Error('User not authenticated');
    const { data, error } = await supabase
      .from('collaborations')
      .select('*')
      .eq('user_id', user.id);

    if (error) throw new Error(error.message);
    return data;
  };

  const { data: collaborationData, error } = useQuery('collaborationData', fetchCollaborationData);

  const handleCodeChange = debounce((code: string) => {
    // Handle the code change (e.g., save to state or send to server)
  }, 500);

  if (error) return <div>Error: {error instanceof Error ? error.message : String(error)}</div>;

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 p-4 text-white">
        <h1 className="text-2xl font-bold">Prototype faster, iterate smarter with ProtoPad</h1>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-gray-100 p-4">
          <h2 className="text-lg font-semibold">Your Collaborations</h2>
          <ul>
            {collaborationData?.map((collab) => (
              <li key={collab.id} className="p-2 border-b">{collab.name}</li>
            ))}
          </ul>
        </aside>
        <div className="flex-1 p-4">
          <h2 className="text-lg font-semibold">Code Editor</h2>
          <Editor
            value=""
            onValueChange={handleCodeChange}
            highlight={(code) => code} // Basic highlighting
            padding={10}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default CollaborationPage;