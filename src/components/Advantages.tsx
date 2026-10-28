import Reveal from './Reveal'
import { site } from '../data/site'

function Advantages() {
  return (
    <section className="section advantages" id="advantages">
      <div className="container">
        <div className="advantages-grid">
          {site.advantages.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <article className="advantage-card">
                <span className="advantage-num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="advantage-title">{item.title}</h3>
                <p className="advantage-text">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Advantages
