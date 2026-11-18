import { Container } from '../components/index.js'
import { ABOUT_IMAGE, ABOUT_INTRO, ABOUT_STORY, ABOUT_VALUES } from '../data/about.js'
import { useInView } from '../hooks/useInView.js'
import { useLanguage } from '../i18n/context.js'
import './About.css'

/** About */
function About() {
  const { pick } = useLanguage()
  const [introRef, introIn] = useInView({ threshold: 0 })
  const [imageRef, imageIn] = useInView()
  const [storyRef, storyIn] = useInView()
  const [valuesRef, valuesIn] = useInView()
  const visible = (inView) => (inView ? ' is-visible' : '')

  return (
    <div className="about">
      <section className="about__intro" aria-labelledby="about-title">
        <Container size="content">
          <div ref={introRef} className={`about__intro-grid${visible(introIn)}`}>
            <h1 id="about-title" className="about__title reveal" aria-label={pick(ABOUT_INTRO.title)}>
              <span className="about__title-line">
                {pick(ABOUT_INTRO.titleBefore)}{' '}
                <span className="about__pill" aria-hidden="true">
                  <img
                    src={ABOUT_INTRO.accent.src}
                    alt=""
                    width={ABOUT_INTRO.accent.width}
                    height={ABOUT_INTRO.accent.height}
                    loading="eager"
                    decoding="async"
                  />
                </span>{' '}
                {pick(ABOUT_INTRO.titleMiddle)}
              </span>{' '}
              <span className="about__title-line">{pick(ABOUT_INTRO.titleAfter)}</span>
            </h1>
            <p className="about__lead reveal" style={{ '--reveal-delay': '300ms' }}>
              {pick(ABOUT_INTRO.lead)}
            </p>
          </div>

          <figure ref={imageRef} className={`about__media reveal${visible(imageIn)}`}>
            <img
              src={ABOUT_IMAGE.src}
              alt={pick(ABOUT_IMAGE.alt)}
              width={ABOUT_IMAGE.width}
              height={ABOUT_IMAGE.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        </Container>
      </section>

      <section className="section about__story" aria-labelledby="about-story-title">
        <Container size="content">
          <div ref={storyRef} className={`about__split${visible(storyIn)}`}>
            <h2 id="about-story-title" className="about__heading reveal">
              {pick(ABOUT_STORY.title)}
            </h2>
            <div className="about__prose">
              {pick(ABOUT_STORY.paragraphs).map((paragraph, i) => (
                <p
                  key={paragraph}
                  className="reveal"
                  style={{ '--reveal-delay': `${280 + i * 240}ms` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section about__values" aria-labelledby="about-values-title">
        <Container size="content">
          <div ref={valuesRef} className={`about__values-grid${visible(valuesIn)}`}>
            <div className="about__values-intro">
              <h2 id="about-values-title" className="about__heading reveal">
                {pick(ABOUT_VALUES.title)}
              </h2>
            </div>
            <ol className="about__value-list" role="list">
              {ABOUT_VALUES.items.map((value, i) => (
                <li
                  key={value.number}
                  className="about__value reveal"
                  style={{ '--reveal-delay': `${300 + i * 260}ms` }}
                >
                  <span className="about__value-number" aria-hidden="true">
                    {String(value.number).padStart(2, '0')}
                  </span>
                  <div className="about__value-body">
                    <h3 className="about__value-title">{pick(value.label)}</h3>
                    <p className="about__value-text">{pick(value.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default About
