import React from 'react';
import { useQuery } from 'react-query';
import { supabase } from '../../lib/supabaseClient';
import { CodeEditor } from '../../components/CodeEditor';
import { DebugConsole } from '../../components/DebugConsole';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DebuggerPage = () => {
  const { data: templates, error, isLoading } = useQuery('templates', async () => {
    const { data, error } = await supabase
      .from('templates')
      .select('*');
      
    if (error) throw new Error(error.message);
    return data;
  });

  React.useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [error]);

  if (isLoading) return <div>Loading templates...</div>;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Prototype faster, iterate smarter with ProtoPad</h1>
      <CodeEditor templates={templates} />
      <DebugConsole />
      <ToastContainer />
    </div>
  );
};

export default DebuggerPage;