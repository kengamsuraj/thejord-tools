import { Link } from 'react-router-dom'

export default function About() {
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
              <Link to="/blog" className="text-text-secondary hover:text-primary-light transition-colors">Blog</Link>
              <Link to="/about" className="text-primary-light">About</Link>
              <Link to="/contact" className="text-text-secondary hover:text-primary-light transition-colors">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
              About THEJORD.IT
            </span>
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            L'alternativa italiana a IT-Tools. Strumenti per sviluppatori con focus su privacy e semplicità.
          </p>
        </div>

        {/* Mission Section */}
        <section className="bg-bg-surface border border-border rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">🎯 La Nostra Missione</h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            THEJORD.IT nasce con l'obiettivo di fornire agli sviluppatori italiani (e non solo)
            una suite di strumenti online gratuiti, veloci e <strong className="text-primary-light">rispettosi della privacy</strong>.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed">
            Crediamo che gli strumenti di sviluppo debbano essere:
          </p>
          <ul className="list-none space-y-3 mt-4">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <strong className="text-text-primary">Rispetto della Privacy</strong>
                <p className="text-text-secondary">Tutto il processing avviene nel browser. I tuoi dati non vengono mai inviati ai nostri server.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <strong className="text-text-primary">Veloci</strong>
                <p className="text-text-secondary">Ottimizzati per performance. Niente attese, niente latenza.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎨</span>
              <div>
                <strong className="text-text-primary">Intuitivi</strong>
                <p className="text-text-secondary">UI pulita e moderna. Niente fronzoli, solo funzionalità.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🌍</span>
              <div>
                <strong className="text-text-primary">Open Source</strong>
                <p className="text-text-secondary">Codice pubblico su GitHub. Audit, contributi e trasparenza.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Tech Stack Section */}
        <section className="bg-bg-surface border border-border rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">🏗️ Stack Tecnologico</h2>
          <p className="text-text-secondary mb-6">
            THEJORD.IT è costruito con tecnologie moderne e performanti:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-bg-dark border border-border rounded-lg p-4">
              <h3 className="text-lg font-bold text-primary-light mb-2">Frontend</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• React 18.2.0 - UI library</li>
                <li>• TypeScript 5.2.2 - Type safety</li>
                <li>• Vite 4.5.0 - Build tool</li>
                <li>• Tailwind CSS 3.3.5 - Styling</li>
              </ul>
            </div>
            <div className="bg-bg-dark border border-border rounded-lg p-4">
              <h3 className="text-lg font-bold text-primary-light mb-2">Infrastructure</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• Docker - Containerization</li>
                <li>• Kubernetes (K3s) - Orchestration</li>
                <li>• Nginx - Web server</li>
                <li>• Cloudflare Tunnel - Secure ingress</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Open Source Section */}
        <section className="bg-bg-surface border border-border rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">💻 Open Source</h2>
          <p className="text-text-secondary mb-4">
            THEJORD.IT è completamente open source e disponibile su GitHub sotto licenza MIT.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://github.com/thejord-it/thejord-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-bg-darkest px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
            <a
              href="https://github.com/thejord-it/thejord-tools/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-bg-dark border border-border hover:border-primary text-text-primary px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Report Bug / Request Feature
            </a>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="bg-bg-surface border border-border rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">🗺️ Roadmap</h2>
          <p className="text-text-secondary mb-6">
            Stiamo costantemente migliorando THEJORD.IT. Ecco cosa abbiamo in programma:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✅</span>
              <div>
                <strong className="text-text-primary">Fase 1: Foundation (Completata)</strong>
                <p className="text-text-secondary">9 strumenti essenziali, deployment Docker/K3s, SEO e security</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✅</span>
              <div>
                <strong className="text-text-primary">Fase 2: Testing & CI/CD (Completata)</strong>
                <p className="text-text-secondary">82 tests totali (61 unit + 21 E2E), GitHub Actions automatizzato</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 text-xl">📋</span>
              <div>
                <strong className="text-text-primary">Fase 3: Next.js Migration (Prossimamente)</strong>
                <p className="text-text-secondary">SSR/SSG per SEO 9/10, migliore indicizzazione</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 text-xl">📋</span>
              <div>
                <strong className="text-text-primary">Fase 4: Backend & Features</strong>
                <p className="text-text-secondary">PDF tools, Blog, User authentication, Issue tracking</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 text-xl">📋</span>
              <div>
                <strong className="text-text-primary">Fase 5: Advanced Tools</strong>
                <p className="text-text-secondary">20+ tool totali, API pubblica, Analytics</p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section className="bg-bg-surface border border-border rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">🔒 Privacy & Security</h2>
          <p className="text-text-secondary mb-4">
            La tua privacy è importante per noi. Ecco come proteggiamo i tuoi dati:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <strong className="text-text-primary">100% Client-Side Processing</strong>
                <p className="text-text-secondary">Tutto il processing degli strumenti avviene nel tuo browser. I tuoi dati (JSON, Base64, Hash, ecc.) non vengono mai inviati ai nostri server.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 text-xl">ℹ️</span>
              <div>
                <strong className="text-text-primary">Google Analytics 4</strong>
                <p className="text-text-secondary">Utilizziamo Google Analytics per comprendere come viene utilizzato il sito (pagine visitate, durata sessioni). Nessun dato personale o contenuto degli strumenti viene tracciato.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <strong className="text-text-primary">Nessun Account Richiesto</strong>
                <p className="text-text-secondary">Non richiediamo registrazioni. Nessuna email, password o informazione personale necessaria.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <strong className="text-text-primary">Security Headers</strong>
                <p className="text-text-secondary">CSP, HSTS, Permissions-Policy configurati per massima sicurezza (9/10 security score).</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <strong className="text-text-primary">Open Source & Auditabile</strong>
                <p className="text-text-secondary">Il codice è pubblico su GitHub. Puoi verificare tu stesso che i dati rimangono nel browser e non ci siano backdoor.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">💬 Hai domande o suggerimenti?</h2>
          <p className="text-text-secondary mb-6">
            Siamo sempre felici di ricevere feedback dalla community!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-bg-darkest px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contattaci
            </Link>
            <a
              href="https://github.com/thejord-it/thejord-tools/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-bg-dark border border-border hover:border-primary text-text-primary px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Apri una Issue su GitHub
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-bg-dark border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-text-muted">
          <p className="mb-2">Made with ❤️ in Italy 🇮🇹</p>
          <p className="text-sm">
            <a href="https://github.com/thejord-it/thejord-tools" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light transition-colors">
              Open Source
            </a>
            {' • '}
            <Link to="/about" className="hover:text-primary-light transition-colors">About</Link>
            {' • '}
            <Link to="/contact" className="hover:text-primary-light transition-colors">Contact</Link>
            {' • '}
            <a href="https://github.com/thejord-it/thejord-tools/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light transition-colors">
              Security
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
