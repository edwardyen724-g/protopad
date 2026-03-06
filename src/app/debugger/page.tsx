import React, { useEffect, useState } from 'react';
import { getAuth } from '@supabase/supabase-js';
import { useQuery } from 'react-query';
import { Editor } from 'react-simple-code-editor';
import { compileCode } from '../../lib/compiler'; // Assuming a compiler utility for evaluating code
import { useToast } from '../../context/ToastContext'; // Toast context for notifications

const Debugger: React.FC = () => {
  const [code, setCode] = useState<string>('console.log("Hello, ProtoPad!");');
  const [output, setOutput] = useState<string>('');
  const { addToast } = useToast();
  
  const auth = getAuth();
  const user = auth.currentUser;

  const { data: templates, error: templateError } = useQuery('fetchTemplates', fetchTemplates);

  useEffect(() => {
    if (templateError) {
      addToast('Error fetching templates: ' + (templateError instanceof Error ? templateError.message : String(templateError)));
    }
  }, [templateError, addToast]);
  
  const handleRunCode = async () => {
    try {
      const result = await compileCode(code);
      setOutput(result);
    } catch (err) {
      addToast('Error running code: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">ProtoPad Debugger</h1>
      <textarea
        className="mt-4 w-full h-32 p-2 border border-gray-300 rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleRunCode}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Run Code
      </button>
      <div className="mt-4 w-full p-2 border border-gray-300 rounded">
        <h2 className="font-semibold">Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Debugger;