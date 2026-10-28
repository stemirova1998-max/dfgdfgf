import Media from './Media'
import Reveal from './Reveal'
import { media } from '../data/media'
import { site } from '../data/site'

function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <Reveal className="about-media-wrap">
          <Media slot={media.about} />
          <span className="about-media-caption">Мастер · {site.city}</span>
        </Reveal>

        <div className="about-copy">
          <Reveal>
            <p className="eyebrow">О мастере</p>
            <h2 className="section-title">
              Красота начинается <em>с заботы</em>
            </h2>
            <p className="lead">
              Для меня волосы — это часть вашего образа. Сначала я внимательно смотрю на их
              состояние, а потом предлагаю процедуру, которая подойдёт именно вам.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
