import Reveal from './Reveal'
import Media from './Media'
import { media } from '../data/media'
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
          {site.services.map((service, index) => (
            <Reveal key={service.id} delay={index * 80}>
              <article className="service-card">
                <div className="service-media">
                  <Media slot={media[serviceMediaKeys[index]]} />
                </div>
                <div className="service-body">
                  <span className="service-num">{service.num}</span>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                  <div className="service-foot">
                    <span className="service-price">{service.price}</span>
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
