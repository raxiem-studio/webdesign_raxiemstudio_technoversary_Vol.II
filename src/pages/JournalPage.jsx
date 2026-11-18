import { ArticleCard } from '../components/index.js'
import { ARTICLES } from '../data/articles.js'
import { useLanguage } from '../i18n/context.js'
import ListingPage from './ListingPage.jsx'

/** Listing /journal. */
function JournalPage({ articles = ARTICLES }) {
  const { t } = useLanguage()
  return (
    <ListingPage
      id="journal-page"
      title={t('journalPage.title')}
      lead={t('journalPage.lead')}
      listLabel={t('journalPage.list')}
      items={articles}
      renderItem={(article) => <ArticleCard article={article} headingLevel={2} />}
    />
  )
}

export default JournalPage
