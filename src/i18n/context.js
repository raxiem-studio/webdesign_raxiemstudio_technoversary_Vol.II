import { createContext, useContext } from 'react'

/** Bahasa */
export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', locale: 'en-GB' },
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia', locale: 'id-ID' },
]

export const DEFAULT_LANG = 'en'

export const LanguageContext = createContext(null)

/** useLanguage */
export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return value
}
