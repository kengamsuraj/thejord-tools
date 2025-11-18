import Layout from '../components/Layout'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'question'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Construct email mailto link
    const subject = encodeURIComponent(`[THEJORD.IT] ${formData.type.toUpperCase()}: ${formData.subject}`)
    const body = encodeURIComponent(
      `Nome: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Tipo: ${formData.type}\n\n` +
      `Messaggio:\n${formData.message}\n\n` +
      `---\n` +
      `Inviato da thejord.it/contact`
    )

    window.location.href = `mailto:admin@thejord.it?subject=${subject}&body=${body}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Layout currentPage="contact">

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
              Contattaci
            </span>
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Hai domande, suggerimenti o hai trovato un bug? Siamo qui per aiutarti!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="bg-bg-surface border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-text-primary">💬 Come Contattarci</h2>

              <div className="space-y-4">
                <a
                  href="mailto:admin@thejord.it"
                  className="flex items-start gap-4 p-4 bg-bg-dark border border-border rounded-lg hover:border-primary transition-colors"
                >
                  <span className="text-2xl">📧</span>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">Email</h3>
                    <p className="text-text-secondary text-sm mb-2">Per domande generali e supporto</p>
                    <p className="text-primary-light">admin@thejord.it</p>
                  </div>
                </a>

                <a
                  href="https://github.com/thejord-it/thejord-tools/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-bg-dark border border-border rounded-lg hover:border-primary transition-colors"
                >
                  <span className="text-2xl">🐛</span>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">GitHub Issues</h3>
                    <p className="text-text-secondary text-sm mb-2">Per bug report e feature request</p>
                    <p className="text-primary-light">github.com/thejord-it/thejord-tools</p>
                  </div>
                </a>

                <a
                  href="https://github.com/thejord-it/thejord-tools/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-bg-dark border border-border rounded-lg hover:border-primary transition-colors"
                >
                  <span className="text-2xl">💭</span>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">GitHub Discussions</h3>
                    <p className="text-text-secondary text-sm mb-2">Per domande alla community</p>
                    <p className="text-primary-light">Partecipa alle discussioni</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Security Contact */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                <span>🔒</span>
                Security Vulnerabilities
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                Se hai trovato una vulnerabilità di sicurezza, <strong>NON</strong> aprire una issue pubblica.
              </p>
              <p className="text-text-secondary text-sm">
                Invia una email a:{' '}
                <a href="mailto:admin@thejord.it" className="text-red-400 hover:text-red-300">
                  admin@thejord.it
                </a>
                {' '}con oggetto "SECURITY"
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-bg-surface border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">📝 Invia un Messaggio</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                  placeholder="Il tuo nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                  placeholder="tua@email.com"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-text-secondary mb-2">
                  Tipo
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="question">Domanda</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Altro</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                  Oggetto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                  placeholder="Breve descrizione"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                  Messaggio
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Scrivi qui il tuo messaggio..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-bg-darkest font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Invia Messaggio
              </button>

              <p className="text-xs text-text-muted text-center">
                Cliccando "Invia Messaggio" si aprirà il tuo client email con il messaggio pre-compilato.
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-bg-surface border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-text-primary">❓ Domande Frequenti</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-text-primary mb-2">Come posso contribuire al progetto?</h3>
              <p className="text-text-secondary">
                THEJORD.IT è open source! Puoi contribuire aprendo issue, proponendo feature o inviando pull request su{' '}
                <a href="https://github.com/thejord-it/thejord-tools" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                  GitHub
                </a>
                . Leggi la nostra{' '}
                <a href="https://github.com/thejord-it/thejord-tools/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                  Contributing Guide
                </a>
                {' '}per maggiori informazioni.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-text-primary mb-2">I miei dati sono al sicuro?</h3>
              <p className="text-text-secondary">
                Assolutamente sì! Tutti gli strumenti di THEJORD.IT funzionano interamente nel browser.
                Nessun dato viene mai inviato ai nostri server. Leggi la nostra{' '}
                <a href="https://github.com/thejord-it/thejord-tools/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                  Security Policy
                </a>
                .
              </p>
            </div>

            <div>
              <h3 className="font-bold text-text-primary mb-2">Posso self-hostare THEJORD.IT?</h3>
              <p className="text-text-secondary">
                Certo! Il progetto è open source e include configurazioni Docker e Kubernetes.
                Trovi le istruzioni nel{' '}
                <a href="https://github.com/thejord-it/thejord-tools#readme" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                  README
                </a>
                .
              </p>
            </div>

            <div>
              <h3 className="font-bold text-text-primary mb-2">Quanto costa usare THEJORD.IT?</h3>
              <p className="text-text-secondary">
                THEJORD.IT è completamente gratuito e sempre lo sarà. Non ci sono piani premium, nessun limite di utilizzo, nessuna registrazione richiesta.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-text-primary mb-2">Posso richiedere un nuovo tool?</h3>
              <p className="text-text-secondary">
                Certamente! Apri una{' '}
                <a href="https://github.com/thejord-it/thejord-tools/issues/new" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                  feature request su GitHub
                </a>
                {' '}o contattaci via email. Valutiamo tutte le proposte!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      </Layout>
  )
}
