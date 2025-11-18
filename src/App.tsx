import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CookieConsent from 'react-cookie-consent'
import { initGA, trackPageView } from './lib/analytics'
import { RoutePreloader } from './components/RoutePreloader'
import Footer from './components/Footer'
import LanguageSwitcher from './components/LanguageSwitcher'
import SEO from './components/SEO'

// Lazy load all page components for code splitting
const JsonFormatter = lazy(() => import('./pages/JsonFormatter'))
const Base64Tool = lazy(() => import('./pages/Base64Tool'))
const RegexTester = lazy(() => import('./pages/RegexTester'))
const HashGenerator = lazy(() => import('./pages/HashGenerator'))
const UrlTool = lazy(() => import('./pages/UrlTool'))
const MarkdownConverter = lazy(() => import('./pages/MarkdownConverter'))
const ColorConverter = lazy(() => import('./pages/ColorConverter'))
const LoremIpsumGenerator = lazy(() => import('./pages/LoremIpsumGenerator'))
const DiffChecker = lazy(() => import('./pages/DiffChecker'))
const CronBuilder = lazy(() => import('./pages/CronBuilder'))
const JsonSchemaConverter = lazy(() => import('./pages/JsonSchemaConverter'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Changelog = lazy(() => import('./pages/Changelog'))
const Privacy = lazy(() => import('./pages/Privacy'))

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-bg-darkest flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-text-secondary">Loading...</p>
      </div>
    </div>
  )
}

function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg-darkest">
      <SEO
        title="THEJORD.IT - Free Developer Tools"
        description="Modern, fast, and free tools for developers. JSON formatter, Base64 encoder, RegExp tester, and more. 100% client-side, privacy-focused."
        path="/"
      />
      <header className="bg-bg-dark border-b border-border sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img src="/logo.png" alt="The Jord Logo" className="h-12 w-auto" width="96" height="89" />
              </picture>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
                THE JORD
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-text-secondary hover:text-primary-light transition-colors">{t('nav.tools')}</Link>
              <Link to="/blog" className="text-text-secondary hover:text-primary-light transition-colors">{t('nav.blog')}</Link>
              <Link to="/about" className="text-text-secondary hover:text-primary-light transition-colors">{t('nav.about')}</Link>
              <Link to="/contact" className="text-text-secondary hover:text-primary-light transition-colors">{t('nav.contact')}</Link>
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
              {t('home.title')}
            </span>
          </h1>
          <p className="text-xl text-text-muted">
            {t('home.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Link to="/json-formatter" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">📄</div>
            <h2 className="text-xl font-bold mb-2 text-text-primary">{t('home.tools.jsonFormatter.name')}</h2>
            <p className="text-text-secondary">{t('home.tools.jsonFormatter.desc')}</p>
          </Link>

          <Link to="/base64" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🔐</div>
            <h2 className="text-xl font-bold mb-2 text-text-primary">{t('home.tools.base64.name')}</h2>
            <p className="text-text-secondary">{t('home.tools.base64.desc')}</p>
          </Link>

          <Link to="/regex-tester" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🔍</div>
            <h2 className="text-xl font-bold mb-2 text-text-primary">{t('home.tools.regexTester.name')}</h2>
            <p className="text-text-secondary">{t('home.tools.regexTester.desc')}</p>
          </Link>

          <Link to="/hash-generator" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🔑</div>
            <h2 className="text-xl font-bold mb-2 text-text-primary">{t('home.tools.hashGenerator.name')}</h2>
            <p className="text-text-secondary">{t('home.tools.hashGenerator.desc')}</p>
          </Link>

          <Link to="/url-tool" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🔗</div>
            <h2 className="text-xl font-bold mb-2 text-text-primary">{t('home.tools.urlTool.name')}</h2>
            <p className="text-text-secondary">{t('home.tools.urlTool.desc')}</p>
          </Link>

          <Link to="/markdown" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">📝</div>
            <h2 className="text-xl font-bold mb-2 text-text-primary">{t('home.tools.markdown.name')}</h2>
            <p className="text-text-secondary">{t('home.tools.markdown.desc')}</p>
          </Link>

          <Link to="/color" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🎨</div>
            <h2 className="text-xl font-bold mb-2 text-text-primary">{t('home.tools.color.name')}</h2>
            <p className="text-text-secondary">{t('home.tools.color.desc')}</p>
          </Link>

          <Link to="/lorem" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">📄</div>
            <h2 className="text-xl font-bold mb-2 text-text-primary">{t('home.tools.lorem.name')}</h2>
            <p className="text-text-secondary">{t('home.tools.lorem.desc')}</p>
          </Link>

          <Link to="/diff" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🔍</div>
            <h2 className="text-xl font-bold mb-2 text-text-primary">{t('home.tools.diff.name')}</h2>
            <p className="text-text-secondary">{t('home.tools.diff.desc')}</p>
          </Link>

          <Link to="/cron-builder" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">🕐</div>
            <h2 className="text-xl font-bold mb-2 text-text-primary">{t('home.tools.cron.name')}</h2>
            <p className="text-text-secondary">{t('home.tools.cron.desc')}</p>
          </Link>

          <Link to="/json-schema" className="bg-bg-surface border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="text-3xl mb-4">📋</div>
            <h2 className="text-xl font-bold mb-2 text-text-primary">{t('home.tools.jsonSchema.name')}</h2>
            <p className="text-text-secondary">{t('home.tools.jsonSchema.desc')}</p>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Analytics tracker component
function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search)
  }, [location])

  return null
}

function App() {
  // Check if user previously accepted cookies and init GA
  useEffect(() => {
    const cookieConsent = document.cookie.includes('CookieConsent=true')
    if (cookieConsent) {
      initGA()
    }
  }, [])

  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <RoutePreloader />
      <Suspense fallback={<PageLoader />}>
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
          <Route path="/cron-builder" element={<CronBuilder />} />
          <Route path="/json-schema" element={<JsonSchemaConverter />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Suspense>

      {/* Cookie Consent Banner */}
      <CookieConsent
        location="bottom"
        buttonText="Accetta"
        declineButtonText="Rifiuta"
        enableDeclineButton
        onAccept={() => {
          console.log('Cookie accettati')
          initGA()
          // Track initial page view after initialization
          setTimeout(() => trackPageView(window.location.pathname), 100)
        }}
        onDecline={() => {
          console.log('Cookie rifiutati')
        }}
        style={{
          background: '#1F2937',
          borderTop: '1px solid #374151',
        }}
        buttonStyle={{
          background: '#2563EB',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '600',
          borderRadius: '6px',
          padding: '10px 20px',
        }}
        declineButtonStyle={{
          background: '#374151',
          color: '#ffffff',
          fontSize: '14px',
          borderRadius: '6px',
          padding: '8px 16px',
        }}
        expires={365}
      >
        <span className="text-sm text-gray-300">
          Questo sito utilizza Google Analytics per migliorare l'esperienza utente e analizzare il traffico.{' '}
          <Link to="/privacy" className="text-primary-light hover:underline">
            Leggi la Privacy Policy
          </Link>
          .
        </span>
      </CookieConsent>
    </BrowserRouter>
  )
}

export default App
