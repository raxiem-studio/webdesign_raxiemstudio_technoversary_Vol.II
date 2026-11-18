import { DestinationCard } from '../components/index.js'
import { DESTINATIONS } from '../data/destinations.js'
import { useLanguage } from '../i18n/context.js'
import ListingPage from './ListingPage.jsx'

/** /destinations listing. */
function DestinationsPage({ destinations = DESTINATIONS }) {
  const { t } = useLanguage()
  return (
    <ListingPage
      id="destinations-page"
      title={t('destinationsPage.title')}
      lead={t('destinationsPage.lead')}
      listLabel={t('destinationsPage.list')}
      items={destinations}
      renderItem={(destination) => <DestinationCard destination={destination} />}
    />
  )
}

export default DestinationsPage
