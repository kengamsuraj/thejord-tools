import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import translationIT from './locales/it.json'
import translationEN from './locales/en.json'

const resources = {
  it: {
    translation: translationIT
  },
  en: {
    translation: translationEN
  }
}

i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources,
    fallbackLng: 'it', // Italian first
    supportedLngs: ['it', 'en'],
    detection: {
      order: ['localStorage', 'navigator'], // Check localStorage first, then browser
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    interpolation: {
      escapeValue: false // React already escapes
    }
  })

export default i18n
