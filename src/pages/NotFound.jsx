import { Button, Container } from '../components/index.js'
import { useInView } from '../hooks/useInView.js'
import { useLanguage } from '../i18n/context.js'
import './NotFound.css'

/** 404 */
function NotFound() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({ threshold: 0 })

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <Container size="content">
        <div ref={ref} className={`not-found__inner${inView ? ' is-visible' : ''}`}>
          <p className="not-found__code reveal" aria-hidden="true">
            404
          </p>
          <h1 id="not-found-title" className="not-found__title reveal" style={{ '--reveal-delay': '160ms' }}>
            {t('notFound.title')}
          </h1>
          <p className="not-found__lead reveal" style={{ '--reveal-delay': '280ms' }}>
            {t('notFound.lead')}
          </p>
          <div className="not-found__actions reveal" style={{ '--reveal-delay': '400ms' }}>
            <Button href="/" size="lg">
              {t('notFound.home')}
            </Button>
            <Button href="/destinations" size="lg" variant="secondary">
              {t('notFound.destinations')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default NotFound
