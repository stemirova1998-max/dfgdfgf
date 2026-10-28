import Reveal from './Reveal'
import { site } from '../data/site'

function Booking() {
  return (
    <section className="booking" id="booking">
      <div className="container booking-inner">
        <Reveal>
          <p className="eyebrow eyebrow-light">Запись</p>
          <h2 className="booking-title">
            Ваши волосы заслуживают <em>особенного ухода</em>
          </h2>
          <p className="booking-sub">
            Выберите процедуру — подберём удобное время и ответим на все вопросы.
          </p>
          <div className="booking-actions">
            <a
              className="btn btn-light btn-lg"
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Записаться в WhatsApp
            </a>
            <a className="btn btn-ghost-light btn-lg" href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
          <div className="booking-links">
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
              @{site.instagramHandle}
            </a>
          </div>
          <p className="booking-note">
            Ежедневно · {site.city} · запись через WhatsApp и Instagram
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default Booking
