import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANG, LANGUAGES, LanguageContext } from './context.js'
import { STRINGS } from './strings.js'

const STORAGE_KEY = 'jejak:lang'

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.some((l) => l.code === stored) ? stored : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

/** Bilingual content is written as `{ en: …, id: … }`. */
const isBilingual = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value) && 'en' in value && 'id' in value

/** Holds the chosen language; remembers it per browser and mirrors it on <html lang>. */
function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* Storage unavailable: the choice lasts for this visit only. */
    }
  }, [lang])

  const value = useMemo(() => {
    const { locale } = LANGUAGES.find((l) => l.code === lang)
    const dict = STRINGS[lang]
    const fallback = STRINGS[DEFAULT_LANG]

    const t = (key, vars) => {
      const text = dict[key] ?? fallback[key] ?? key
      return vars ? text.replace(/\{(\w+)\}/g, (match, name) => vars[name] ?? match) : text
    }
    const pick = (content) => (isBilingual(content) ? content[lang] : content)
    const formatNumber = (n, decimals = 0) =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(n)
    const formatDate = (iso) =>
      new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(
        new Date(`${iso}T00:00:00`),
      )

    return { lang, setLang, locale, t, pick, formatNumber, formatDate }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
