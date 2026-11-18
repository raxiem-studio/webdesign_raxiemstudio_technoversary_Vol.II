import { useMemo, useRef } from 'react'
import { ClosingCta, Footer, Navigation } from './components/index.js'
import { findArticle } from './data/articles.js'
import { findDestination } from './data/destinations.js'
import {
  FOOTER_ADDRESS,
  FOOTER_COLUMNS,
  FOOTER_CONTACTS,
  FOOTER_TAGLINE,
  LEGAL_LINKS,
  NAV_CTA,
  NAV_LINKS,
} from './data/navigation.js'
import { images } from './data/images.js'
import { useLanguage } from './i18n/context.js'
import About from './pages/About.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import ContactPage from './pages/ContactPage.jsx'
import Credits from './pages/Credits.jsx'
import DestinationDetail from './pages/DestinationDetail.jsx'
import DestinationsPage from './pages/DestinationsPage.jsx'
import Home from './pages/Home.jsx'
import JournalPage from './pages/JournalPage.jsx'
import NotFound from './pages/NotFound.jsx'
import { pageTitle, usePageChange, usePath } from './router.js'

/* `titleKey` names the page title in src/i18n/strings.js. */
const PAGES = {
  '/': { Page: Home, titleKey: null },
  '/destinations': { Page: DestinationsPage, titleKey: 'destinationsPage.title' },
  '/about': { Page: About, titleKey: 'aboutPage.title' },
  '/journal': { Page: JournalPage, titleKey: 'journalPage.title' },
  '/contact': { Page: ContactPage, titleKey: 'contact.title' },
  '/credits': { Page: Credits, titleKey: 'credits.title' },
}

/** Resolves a path to its page component, title and props. Unknown paths render the 404 page. */
function resolve(path, t, pick) {
  const page = PAGES[path]
  if (page) return { Page: page.Page, name: page.titleKey && t(page.titleKey), props: {} }
  const slug = path.match(/^\/destinations\/([^/]+)$/)?.[1]
  const destination = slug && findDestination(slug)
  if (destination) {
    return { Page: DestinationDetail, name: pick(destination.name), props: { destination } }
  }
  const articleSlug = path.match(/^\/journal\/([^/]+)$/)?.[1]
  const article = articleSlug && findArticle(articleSlug)
  if (article) {
    return { Page: ArticleDetail, name: pick(article.title), props: { article } }
  }
  return { Page: NotFound, name: t('notFound.title'), props: {} }
}

/** App shell: navigation, routed page, closing CTA and footer. */
function App() {
  const { lang, t, pick } = useLanguage()
  const path = usePath()
  const mainRef = useRef(null)
  const { Page, name, props } = resolve(path, t, pick)
  usePageChange(path, pageTitle(name, t('site.title')), mainRef)

  // Stable per language: Navigation's scroll spy re-subscribes when `links` changes.
  const navLinks = useMemo(
    () => NAV_LINKS.map((link) => ({ ...link, label: pick(link.label) })),
    [pick],
  )
  const navCta = useMemo(() => ({ ...NAV_CTA, label: pick(NAV_CTA.label) }), [pick])
  const footerColumns = useMemo(
    () =>
      FOOTER_COLUMNS.map((column) => ({
        title: pick(column.title),
        links: column.links.map((link) => ({ ...link, label: pick(link.label) })),
      })),
    [pick],
  )
  const legalLinks = useMemo(
    () => LEGAL_LINKS.map((link) => ({ ...link, label: pick(link.label) })),
    [pick],
  )

  const isHome = Page === Home

  return (
    <>
      <a href="#konten-utama" className="skip-link">
        {t('site.skipLink')}
      </a>
      {/* Transparent nav only over the Home hero. */}
      <Navigation links={navLinks} cta={navCta} inverse={isHome} path={path} noActive={Page === NotFound} />
      <main id="konten-utama" ref={mainRef} tabIndex={-1}>
        {/* Keyed by path so entrance animations replay on navigation. */}
        <Page key={path} {...props} />
        {/* Hidden on Contact (it would link to itself) and on the 404 page. */}
        {Page !== ContactPage && Page !== NotFound && <ClosingCta key={`cta-${path}`} />}
      </main>
      <Footer
        background={images.heroTegalalang}
        tagline={FOOTER_TAGLINE[lang]}
        address={FOOTER_ADDRESS}
        contacts={FOOTER_CONTACTS}
        columns={footerColumns}
        legalLinks={legalLinks}
        wordmark="oversized"
      />
    </>
  )
}

export default App
