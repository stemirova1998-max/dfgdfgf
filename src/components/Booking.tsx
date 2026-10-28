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
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Записаться на процедуру
            </a>
          </div>
          <p className="booking-note">Запись через Instagram · WhatsApp и Telegram — скоро</p>
        </Reveal>
      </div>
    </section>
  )
}

export default Booking
