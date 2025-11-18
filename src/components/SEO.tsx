import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
}

export default function SEO({ title, description, path = '', noIndex = false }: SEOProps) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language
  const baseUrl = 'https://thejord.it'
  const canonicalUrl = `${baseUrl}${path}`

  // Default title and description
  const siteTitle = title || 'THEJORD.IT - Free Developer Tools'
  const siteDescription = description || 'Modern, fast, and free tools for developers. JSON formatter, Base64 encoder, RegExp tester, and more. 100% client-side, privacy-focused.'

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLang} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags */}
      <link rel="alternate" hrefLang="it" href={`${baseUrl}${path}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${path}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${path}`} />

      {/* Open Graph */}
      <meta property="og:locale" content={currentLang === 'it' ? 'it_IT' : 'en_US'} />
      <meta property="og:locale:alternate" content={currentLang === 'it' ? 'en_US' : 'it_IT'} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card */}
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />

      {/* No Index (if needed) */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  )
}
