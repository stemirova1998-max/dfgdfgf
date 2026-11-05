import { useEffect } from 'react'

const SELECTOR = '.glow-card'
const REACH = 320

interface CachedCard {
  el: HTMLElement
  left: number
  top: number
  width: number
  height: number
}

/**
 * Один глобальный слушатель mousemove обновляет CSS-переменные
 * --mouse-x / --mouse-y на каждой карточке .glow-card.
 *
 * Позиции карточек закэшированы и обновляются на scroll / resize
 * (чтобы не читать layout на каждое движение мыши). На каждый кадр
 * mousemove обновляются только карточки, до которых курсор ближе
 * чем REACH px — это экономит setProperty-вызовы.
 *
 * Схема идентична .interactive-card на kodacode.ru.
 */
function CursorGlow() {
  useEffect(() => {
    let cards: CachedCard[] = []
    let movePending = false
    let rectsPending = false
    let lastX = 0
    let lastY = 0

    const refreshRects = () => {
      cards = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).map((el) => {
        const rect = el.getBoundingClientRect()
        return { el, left: rect.left, top: rect.top, width: rect.width, height: rect.height }
      })
    }

    const scheduleRects = () => {
      if (rectsPending) return
      rectsPending = true
      requestAnimationFrame(() => {
        rectsPending = false
        refreshRects()
      })
    }

    const onMove = (event: MouseEvent) => {
      lastX = event.clientX
      lastY = event.clientY
      if (movePending) return

      movePending = true
      requestAnimationFrame(() => {
        movePending = false
        for (const card of cards) {
          if (card.width === 0 || card.height === 0) continue

          const dx = lastX - card.left
          const dy = lastY - card.top
          if (dx < -REACH || dy < -REACH || dx > card.width + REACH || dy > card.height + REACH) {
            continue
          }

          card.el.style.setProperty('--mouse-x', `${(dx / card.width) * 100}%`)
          card.el.style.setProperty('--mouse-y', `${(dy / card.height) * 100}%`)
        }
      })
    }

    refreshRects()

    let resizeObserver: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleRects)
      resizeObserver.observe(document.body)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', scheduleRects, { passive: true })
    window.addEventListener('resize', scheduleRects)

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', scheduleRects)
      window.removeEventListener('resize', scheduleRects)
      resizeObserver?.disconnect()
    }
  }, [])

  return null
}

export default CursorGlow
