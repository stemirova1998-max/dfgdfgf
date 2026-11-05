import Reveal from './Reveal'
import { site } from '../data/site'

function Advantages() {
  return (
    <section className="section advantages" id="advantages">
      <div className="container">
        <div className="advantages-panel">
          {site.advantages.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <article className="advantage-card glow-card">
                <span className="advantage-num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="advantage-body">
                  <h3 className="advantage-title">{item.title}</h3>
                  <p className="advantage-text">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Advantages
