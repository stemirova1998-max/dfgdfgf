import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applySiteData } from './data/site'

/**
 * Загружаем данные из админки до первого рендера,
 * чтобы клиент сразу видел актуальные тексты и цены.
 * Если загрузка не удалась — показываем сайт с дефолтными данными.
 */
async function bootstrap() {
  try {
    const res = await fetch('api.php', { cache: 'no-store' })
    if (res.ok) {
      applySiteData(await res.json())
    }
  } catch {
    // Сервер не отдал данные (например, локально) — оставляем дефолт
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

bootstrap()
