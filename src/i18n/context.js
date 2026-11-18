import { createContext, useContext } from 'react'

/**
 * Bahasa situs. Default English (audiens internasional).
 * `locale` dipakai untuk format angka dan tanggal.
 */
export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', locale: 'en-GB' },
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia', locale: 'id-ID' },
]

export const DEFAULT_LANG = 'en'

export const LanguageContext = createContext(null)

/**
 * { lang, setLang, locale, t, pick, formatNumber, formatDate }
 * - t('key', { var })  → teks antarmuka dari strings.js
 * - pick(value)        → value[lang] untuk konten dua bahasa `{ en, id }`, selain itu value apa adanya
 */
export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return value
}
