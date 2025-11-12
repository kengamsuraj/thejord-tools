import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import JsonFormatter from './pages/JsonFormatter'
import Base64Tool from './pages/Base64Tool'
import RegexTester from './pages/RegexTester'
import HashGenerator from './pages/HashGenerator'
import UrlTool from './pages/UrlTool'
import MarkdownConverter from './pages/MarkdownConverter'
import ColorConverter from './pages/ColorConverter'
import LoremIpsumGenerator from './pages/LoremIpsumGenerator'
import DiffChecker from './pages/DiffChecker'

function Home() {
  return (
    <div className="min-h-screen bg-bg-darkest">
      <header className="bg-bg-dark border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-xl font-bold shadow-lg shadow-primary/40">
                ⚡
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
                THE JORD
              </span>
            </Link>
            <div className="flex gap-6">
              <Link to="/" className="text-text-secondary hover:text-primary-light transition-colors">Tools</Link>
              <a href="#" className="text-text-secondary hover:text-primary-light transition-colors">Blog</a>
              <a href="#" className="text-text-secondary hover:text-primary-light transition-colors">About</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
              Developer Tools
            </span>
          </h1>
          <p className="text-xl text-text-muted">
            Modern, fast, and free tools for developers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Link to="/json-formatter" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">JSON Formatter</h3>
            <p className="text-text-secondary">Format, validate and beautify JSON</p>
          </Link>

          <Link to="/base64" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">Base64 Encoder/Decoder</h3>
            <p className="text-text-secondary">Encode and decode Base64 strings</p>
          </Link>

          <Link to="/regex-tester" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">RegExp Tester</h3>
            <p className="text-text-secondary">Test regular expressions with pattern library</p>
          </Link>

          <Link to="/hash-generator" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🔑</div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">Hash Generator</h3>
            <p className="text-text-secondary">Generate MD5, SHA-1, SHA-256, SHA-512 hashes</p>
          </Link>

          <Link to="/url-tool" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🔗</div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">URL Encoder/Decoder</h3>
            <p className="text-text-secondary">Encode and decode URLs and components</p>
          </Link>

          <Link to="/markdown" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">Markdown to HTML</h3>
            <p className="text-text-secondary">Convert Markdown to HTML with live preview</p>
          </Link>

          <Link to="/color" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">Color Converter</h3>
            <p className="text-text-secondary">Pick colors and convert HEX, RGB, HSL, CMYK</p>
          </Link>

          <Link to="/lorem" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">Lorem Ipsum Generator</h3>
            <p className="text-text-secondary">Generate placeholder text for mockups</p>
          </Link>

          <Link to="/diff" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">Text Diff Checker</h3>
            <p className="text-text-secondary">Compare two texts and highlight differences</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/json-formatter" element={<JsonFormatter />} />
        <Route path="/base64" element={<Base64Tool />} />
        <Route path="/regex-tester" element={<RegexTester />} />
        <Route path="/hash-generator" element={<HashGenerator />} />
        <Route path="/url-tool" element={<UrlTool />} />
        <Route path="/markdown" element={<MarkdownConverter />} />
        <Route path="/color" element={<ColorConverter />} />
        <Route path="/lorem" element={<LoremIpsumGenerator />} />
        <Route path="/diff" element={<DiffChecker />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
