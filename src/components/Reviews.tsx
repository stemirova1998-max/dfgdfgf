import Reveal from './Reveal'
import { site } from '../data/site'

function Stars() {
  return (
    <span className="review-stars" aria-hidden="true">
      {'★'.repeat(5)}
    </span>
  )
}

function Reviews() {
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Отзывы</p>
            <h2 className="section-title">
              Что говорят <em>клиенты</em>
            </h2>
          </div>
        </Reveal>

        <div className="reviews-grid">
          {site.reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 80}>
              <article className="review-card">
                <Stars />
                <p className="review-text">«{review.text}»</p>
                <span className="review-name">{review.name}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
