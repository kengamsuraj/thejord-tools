import Layout from '../components/Layout'

export default function Privacy() {
  return (
    <Layout showFullNav={false}>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          <span className="bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
            Privacy Policy
          </span>
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
          <p className="text-sm text-text-muted">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Introduzione</h2>
            <p>
              Benvenuto su THEJORD.IT ("noi", "nostro" o "il sito"). Rispettiamo la tua privacy e ci impegniamo a proteggerla
              attraverso la nostra conformità con questa politica.
            </p>
            <p>
              Questa Privacy Policy descrive i tipi di informazioni che raccogliamo da te o che ci fornisci quando visiti
              il sito thejord.it e le nostre pratiche per raccogliere, utilizzare, mantenere, proteggere e divulgare tali informazioni.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. Informazioni che Raccogliamo</h2>

            <h3 className="text-xl font-semibold text-text-primary mb-2">2.1 Dati di Navigazione (Google Analytics)</h3>
            <p>
              Utilizziamo Google Analytics 4 per raccogliere informazioni su come utilizzi il nostro sito, inclusi:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Pagine visitate e durata della visita</li>
              <li>Dispositivo utilizzato (desktop, mobile, tablet)</li>
              <li>Browser e sistema operativo</li>
              <li>Paese e città di provenienza (basato su indirizzo IP anonimizzato)</li>
              <li>Sorgente del traffico (ricerca Google, link diretto, etc.)</li>
              <li>Interazioni con gli strumenti (tool utilizzati, funzionalità usate)</li>
            </ul>
            <p className="mt-4">
              <strong>Anonimizzazione IP:</strong> Utilizziamo la funzione di anonimizzazione IP di Google Analytics,
              che rimuove l'ultimo ottetto del tuo indirizzo IP prima che venga memorizzato.
            </p>

            <h3 className="text-xl font-semibold text-text-primary mb-2 mt-6">2.2 Dati Elaborati Localmente</h3>
            <p>
              Tutti i dati che inserisci nei nostri strumenti (JSON, Base64, testo, etc.) sono elaborati
              <strong> esclusivamente nel tuo browser</strong>. Non vengono mai inviati ai nostri server o a terze parti.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. Come Utilizziamo le Tue Informazioni</h2>
            <p>Utilizziamo le informazioni raccolte per:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Migliorare il sito:</strong> Capire quali strumenti sono più utilizzati per prioritizzare lo sviluppo</li>
              <li><strong>Ottimizzare l'esperienza:</strong> Analizzare il comportamento degli utenti per migliorare l'interfaccia</li>
              <li><strong>Decisioni strategiche:</strong> Decidere quali lingue supportare, quali paesi targetizzare, etc.</li>
              <li><strong>Monitorare le prestazioni:</strong> Identificare problemi tecnici e tempi di caricamento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Cookie e Tecnologie di Tracciamento</h2>
            <p>
              Utilizziamo i seguenti tipi di cookie:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Cookie di Consenso:</strong> Per ricordare la tua scelta riguardo ai cookie (365 giorni)
              </li>
              <li>
                <strong>Cookie di Google Analytics:</strong> Per raccogliere dati analitici (vedere{' '}
                <a
                  href="https://developers.google.com/analytics/devguides/collection/ga4/cookie-usage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:underline"
                >
                  documentazione ufficiale
                </a>
                )
              </li>
            </ul>
            <p className="mt-4">
              Puoi rifiutare i cookie in qualsiasi momento tramite le impostazioni del tuo browser o il banner dei cookie del sito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Condivisione dei Dati</h2>
            <p>
              <strong>Non vendiamo, affittiamo o scambiamo i tuoi dati personali con terze parti.</strong>
            </p>
            <p>
              I dati raccolti tramite Google Analytics sono soggetti alla{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light hover:underline"
              >
                Privacy Policy di Google
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. I Tuoi Diritti (GDPR)</h2>
            <p>
              Se risiedi nell'Unione Europea, hai i seguenti diritti:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Diritto di accesso:</strong> Puoi richiedere una copia dei dati che abbiamo su di te</li>
              <li><strong>Diritto di rettifica:</strong> Puoi richiedere la correzione di dati inesatti</li>
              <li><strong>Diritto alla cancellazione:</strong> Puoi richiedere la cancellazione dei tuoi dati</li>
              <li><strong>Diritto di opposizione:</strong> Puoi opporti al trattamento dei tuoi dati</li>
              <li><strong>Diritto alla portabilità:</strong> Puoi richiedere i tuoi dati in formato leggibile</li>
            </ul>
            <p className="mt-4">
              Per esercitare questi diritti, contattaci a:{' '}
              <a href="mailto:privacy@thejord.it" className="text-primary-light hover:underline">
                privacy@thejord.it
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">7. Sicurezza dei Dati</h2>
            <p>
              Implementiamo misure di sicurezza tecniche e organizzative per proteggere i tuoi dati, inclusi:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>HTTPS/TLS per tutte le comunicazioni</li>
              <li>Security headers (CSP, HSTS, X-Frame-Options)</li>
              <li>Elaborazione client-side dei dati degli strumenti</li>
              <li>Anonimizzazione IP in Google Analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">8. Link a Siti di Terze Parti</h2>
            <p>
              Il nostro sito può contenere link a siti di terze parti. Non siamo responsabili per le pratiche di privacy
              di questi siti. Ti consigliamo di leggere le loro privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">9. Modifiche a Questa Privacy Policy</h2>
            <p>
              Potremmo aggiornare questa Privacy Policy periodicamente. Ti informeremo di eventuali modifiche pubblicando
              la nuova Privacy Policy su questa pagina e aggiornando la data di "Ultimo aggiornamento".
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">10. Contatti</h2>
            <p>
              Per domande su questa Privacy Policy, contattaci:
            </p>
            <ul className="list-none space-y-2 ml-4 mt-4">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@thejord.it" className="text-primary-light hover:underline">
                  privacy@thejord.it
                </a>
              </li>
              <li>
                <strong>Sito:</strong>{' '}
                <a href="https://thejord.it" className="text-primary-light hover:underline">
                  https://thejord.it
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      </Layout>
  )
}
