import Editor from '@monaco-editor/react';

interface MonacoJsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

export default function MonacoJsonEditor({
  value,
  onChange,
  readOnly = false,
  height = '400px'
}: MonacoJsonEditorProps) {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <Editor
      height={height}
      defaultLanguage="json"
      value={value}
      onChange={handleEditorChange}
      theme="vs-dark"
      loading={
        <div className="flex items-center justify-center h-full bg-bg-dark">
          <div className="text-text-secondary">Loading editor...</div>
        </div>
      }
      options={{
        readOnly,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        formatOnPaste: true,
        formatOnType: true,
        suggest: {
          showKeywords: true,
        },
        quickSuggestions: {
          other: true,
          comments: false,
          strings: true,
        },
      }}
    />
  );
}
