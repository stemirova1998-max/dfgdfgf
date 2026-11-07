import Reveal from './Reveal'
import Media from './Media'
import { media } from '../data/media'
import type { MediaSlot } from '../data/media'
import { site, serviceMediaKeys } from '../data/site'
import { scrollToHash } from '../lib/scroll'

function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Услуги</p>
            <h2 className="section-title">
              Процедуры для <em>здоровых</em> волос
            </h2>
          </div>
        </Reveal>

        <div className="services-grid">
          {site.services.map((service, index) => {
            // У новой услуги, добавленной через админку, может не быть фото — показываем заглушку
            const slot: MediaSlot =
              media[serviceMediaKeys[index]] ??
              { src: null, alt: service.title, label: service.title, ratio: '3 / 4' }

            return (
              <Reveal key={service.id || index} delay={index * 80}>
                <article className="service-card glow-card">
                  <div className="service-media">
                    <Media slot={slot} style={{ aspectRatio: '3 / 4' }} />
                    <span className="service-num">{service.num}</span>
                  </div>
                  <div className="service-body">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.description}</p>
                    <div className="service-foot">
                      <span className="service-price">{service.price}</span>
                      <span className="service-duration">{service.duration}</span>
                      <a
                        className="btn btn-ghost btn-sm"
                        href="#booking"
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToHash('#booking')
                        }}
                      >
                        Записаться
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services