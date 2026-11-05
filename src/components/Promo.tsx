import Reveal from './Reveal'
import { site } from '../data/site'
import { scrollToHash } from '../lib/scroll'

function Promo() {
  return (
    <section className="section promo" id="promo">
      <div className="container">
        <Reveal>
          <article className="promo-card glow-card">
            <div className="promo-body">
              <div className="promo-meta">
                <span className="promo-badge">{site.promo.badge}</span>
                <span className="promo-until">{site.promo.until}</span>
              </div>
              <p className="eyebrow">{site.promo.subtitle}</p>
              <h2 className="promo-title">{site.promo.title}</h2>
              <p className="promo-text">{site.promo.text}</p>
              <ul className="promo-list">
                {site.promo.procedures.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="promo-aside">
              <p className="promo-note">{site.promo.note}</p>
              <a
                className="btn btn-primary btn-sm"
                href="#booking"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHash('#booking')
                }}
              >
                Записаться по акции
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

export default Promo
