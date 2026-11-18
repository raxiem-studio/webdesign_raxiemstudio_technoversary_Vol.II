import { CLOSING_CTA } from '../../data/closing.js'
import { useLanguage } from '../../i18n/context.js'
import { useInView } from '../../hooks/useInView.js'
import { useScrollZoom } from '../../hooks/useScrollZoom.js'
import Button from '../Button/Button.jsx'
import Container from '../Container/Container.jsx'
import './ClosingCta.css'

/** CTA penutup di semua halaman: kartu foto dengan zoom ikut scroll dan reveal bertahap. */
function ClosingCta({ content = CLOSING_CTA }) {
  const [frameRef, inView] = useInView()
  const zoomRef = useScrollZoom()
  const { pick } = useLanguage()
  const { title, image, cta } = content

  return (
    <section className="closing-cta" aria-labelledby="closing-cta-title">
      <Container size="content">
        <div ref={frameRef} className={inView ? 'is-visible' : undefined}>
          <div ref={zoomRef} className="closing-cta__card on-dark reveal">
            <img
              className="closing-cta__image"
              src={image.src}
              alt={pick(image.alt)}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
            />
            <span className="closing-cta__scrim" aria-hidden="true" />
            <h2
              id="closing-cta-title"
              className="closing-cta__title reveal"
              style={{ '--reveal-delay': '400ms' }}
            >
              {pick(title)}
            </h2>
            {/* Bukan .reveal: parent yang fade bakal menyembunyikan blur glass sampai
                fade selesai. Tombol dianimasikan sendiri (lihat ClosingCta.css). */}
            <div className="closing-cta__action">
              <Button href={cta.href} size="lg" variant="glass">
                {pick(cta.label)}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ClosingCta
