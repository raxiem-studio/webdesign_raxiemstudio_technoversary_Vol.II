import { createContext, useContext } from 'react'

/**
 * Site languages. English is the default (international audience).
 * `locale` drives number and date formatting.
 */
export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', locale: 'en-GB' },
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia', locale: 'id-ID' },
]

export const DEFAULT_LANG = 'en'

export const LanguageContext = createContext(null)

/**
 * { lang, setLang, locale, t, pick, formatNumber, formatDate }
 * - t('key', { var })  → interface string from strings.js
 * - pick(value)        → value[lang] for bilingual `{ en, id }` content, else value
 */
export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return value
}
