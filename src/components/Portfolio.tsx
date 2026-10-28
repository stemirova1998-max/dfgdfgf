import Media from './Media'
import Reveal from './Reveal'
import { media } from '../data/media'

function Portfolio() {
  return (
    <section className="section portfolio" id="portfolio">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Работы</p>
            <h2 className="section-title">
              Результаты, которые <em>говорят сами</em>
            </h2>
          </div>
        </Reveal>

        <div className="gallery">
          {media.gallery.map((slot, index) => (
            <Reveal key={slot.label} delay={index * 60} className="g-item">
              <Media slot={slot} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
