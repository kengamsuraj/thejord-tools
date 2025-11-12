import { useState } from 'react';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      setError('');
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
    } catch (err) {
      setError('Error encoding: Invalid input');
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setError('');
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
    } catch (err) {
      setError('Error decoding: Invalid Base64 string');
      setOutput('');
    }
  };

  const handleConvert = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert('Copied to clipboard!');
    } catch (error) {
      alert('Failed to copy');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleSwap = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  return (
    <div className="min-h-screen bg-bg-darkest">
      <header className="bg-bg-dark border-b border-border sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-xl font-bold shadow-lg shadow-primary/40">
                ⚡
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
                THE JORD
              </span>
            </div>
            <div className="flex gap-6">
              <a href="/" className="text-text-secondary hover:text-primary-light transition-colors">
                ← Back to Tools
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">
            🔐 <span className="bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
              Base64
            </span> Encoder/Decoder
          </h1>
          <p className="text-text-muted text-lg">
            Encode or decode Base64 strings. All processing happens in your browser.
          </p>
        </div>

        <div className="bg-bg-surface rounded-xl p-3 mb-6 border border-border">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setMode('encode')}
              className={'px-4 py-2 rounded-lg font-semibold transition-all ' + (mode === 'encode'
                  ? 'bg-primary text-white shadow-lg shadow-primary/40'
                  : 'bg-bg-elevated text-text-secondary hover:bg-bg-dark hover:border-primary hover:text-primary-light border border-transparent')}
            >
              🔒 Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={'px-4 py-2 rounded-lg font-semibold transition-all ' + (mode === 'decode'
                  ? 'bg-primary text-white shadow-lg shadow-primary/40'
                  : 'bg-bg-elevated text-text-secondary hover:bg-bg-dark hover:border-primary hover:text-primary-light border border-transparent')}
            >
              🔓 Decode
            </button>
          </div>
        </div>

        <div className="bg-bg-surface rounded-xl border border-border overflow-hidden shadow-xl mb-6">
          <div className="bg-bg-elevated px-6 py-4 border-b border-border flex justify-between items-center">
            <h2 className="font-semibold text-text-primary text-lg">
              {mode === 'encode' ? 'Text to Base64' : 'Base64 to Text'}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-bg-elevated border border-border rounded-lg text-text-secondary hover:bg-bg-dark hover:border-primary hover:text-primary-light transition-all"
              >
                🗑️ Clear
              </button>
              <button
                onClick={handleSwap}
                disabled={!output}
                className="px-4 py-2 bg-bg-elevated border border-border rounded-lg text-text-secondary hover:bg-bg-dark hover:border-secondary hover:text-secondary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🔄 Swap
              </button>
              <button
                onClick={handleConvert}
                className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all"
              >
                {mode === 'encode' ? '🔒 Encode' : '🔓 Decode'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-border">
            <div className="bg-bg-surface">
              <div className="bg-bg-elevated px-6 py-3 border-b border-border flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shadow-md shadow-primary/40"></div>
                <span className="font-semibold text-text-secondary">
                  {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
                </span>
              </div>
              <div className="p-6">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                  className="w-full h-96 px-4 py-3 bg-bg-elevated border border-border rounded-lg text-text-primary font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
              <div className="bg-bg-dark px-6 py-3 border-t border-border flex justify-between items-center text-sm">
                <div className="text-text-muted">
                  {input.length} characters • {new Blob([input]).size} bytes
                </div>
              </div>
            </div>

            <div className="bg-bg-surface">
              <div className="bg-bg-elevated px-6 py-3 border-b border-border flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary shadow-md shadow-secondary/40"></div>
                <span className="font-semibold text-text-secondary">
                  {mode === 'encode' ? 'Base64 Output' : 'Decoded Text Output'}
                </span>
              </div>
              <div className="p-6">
                <textarea
                  value={output}
                  readOnly
                  placeholder="Output will appear here..."
                  className="w-full h-96 px-4 py-3 bg-bg-dark border border-border rounded-lg text-text-primary font-mono text-sm focus:outline-none resize-none"
                />
                {error && (
                  <div className="mt-4 p-4 bg-red-900/30 border border-red-500 rounded-lg flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold">
                      ✗
                    </div>
                    <span className="text-red-400">{error}</span>
                  </div>
                )}
              </div>
              <div className="bg-bg-dark px-6 py-3 border-t border-border flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    disabled={!output}
                    className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="text-text-muted text-sm">
                  {output && `${output.length} characters • ${new Blob([output]).size} bytes`}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface rounded-xl border border-border p-6">
          <h3 className="font-semibold text-text-primary text-lg mb-4 flex items-center gap-2">
            ℹ️ About Base64
          </h3>
          <div className="text-text-secondary space-y-2">
            <p>
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
              It's commonly used to encode data that needs to be stored or transferred over media designed to handle text.
            </p>
            <div className="mt-4">
              <h4 className="font-semibold text-text-primary mb-2">Common Use Cases:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Encoding images for data URIs in HTML/CSS</li>
                <li>Storing complex data in cookies or URLs</li>
                <li>Email attachments (MIME)</li>
                <li>API authentication tokens</li>
                <li>Embedding binary data in JSON or XML</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
