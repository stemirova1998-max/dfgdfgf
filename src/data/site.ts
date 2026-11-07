export const site: {
  brand: string
  brandMark: string
  brandSub: string
  city: string
  address: string
  phone: string
  phoneHref: string
  instagramHandle: string
  instagramUrl: string
  telegramUrl: string
  telegramHandle: string
  vkUrl: string
  vkHandle: string
  bookingUrl: string
  nav: Array<{ href: string; label: string }>
  advantages: Array<{ title: string; text: string }>
  services: Array<{ id: string; num: string; title: string; description: string; price: string; duration: string }>
  reviews: Array<{ name: string; text: string }>
  promo: { badge: string; until: string; title: string; subtitle: string; text: string; procedures: string[]; note: string }
} = {
  brand: 'YARKO HAIR BEAUTY',
  brandMark: 'YARKO',
  brandSub: 'Hair Beauty',
  city: 'Сочи',
  address: 'Сочи, переулок Рахманинова, 47, 7',
  instagramHandle: 'yarko_keratin',
  instagramUrl: 'https://instagram.com/yarko_keratin',
  telegramUrl: 'https://t.me/yarko_tati',
  telegramHandle: '@yarko_tati',
  vkUrl: 'https://vk.ru/yar_0608',
  vkHandle: '@yar_0608',
  phone: '+7 999 601-34-26',
  phoneHref: 'tel:+79996013426',
  /** Основной канал записи — Telegram. */
  bookingUrl: 'https://t.me/yarko_tati',
  promo: {
    badge: 'Скидка 40%',
    until: 'до 15 ноября',
    title: 'Гладкие волосы за 3 500 ₽',
    subtitle: 'Модельная акция YARKO',
    text: 'Ищу моделей для портфолио. Кератин, ботокс или нанопластика — 3 500 ₽ независимо от длины волос. Нужны фото и видео результата. Мест мало.',
    procedures: ['Кератиновое выпрямление', 'Ботокс для волос', 'Нанопластика'],
    note: 'Перед записью подберу процедуру под состояние волос.',
  },
  nav: [
    { href: '#about', label: 'О мастере' },
    { href: '#services', label: 'Услуги' },
    { href: '#portfolio', label: 'Работы' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#contacts', label: 'Контакты' },
  ],
  advantages: [
    {
      title: 'Гарантия результата',
      text: 'Отвечаю за качество процедур и состояние волос после них.',
    },
    {
      title: 'Профессиональная косметика',
      text: 'Работаю на проверенных составах для кератина и ботокса.',
    },
    {
      title: 'Индивидуальный подбор',
      text: 'Подбираю процедуру под тип и состояние именно ваших волос.',
    },
    {
      title: 'Бесплатная консультация',
      text: 'Диагностика волос и рекомендации — бесплатно.',
    },
  ],
  services: [
    {
      id: 'keratin',
      num: '01',
      title: 'Кератиновое выпрямление',
      description: 'Гладкость, блеск и послушность. Результат от 4 до 6 месяцев.',
      price: '2 500 ₽',
      duration: '3 ч',
    },
    {
      id: 'botox',
      num: '02',
      title: 'Ботокс для волос',
      description: 'Мягкость, блеск и меньше пушистости. Облегчает расчёсывание и укладку.',
      price: '2 500 ₽',
      duration: '3 ч',
    },
    {
      id: 'permanent',
      num: '03',
      title: 'Перманентное выпрямление волос',
      description: 'Стойкая гладкость на несколько месяцев. Прямые волосы без ежедневной укладки.',
      price: '2 500 ₽',
      duration: '3 ч',
    },
    {
      id: 'nanoplasty',
      num: '04',
      title: 'Нанопластика',
      description: 'Длительное выпрямление, гладкость и послушность волос.',
      price: '2 500 ₽',
      duration: '3 ч',
    },
    {
      id: 'cold',
      num: '05',
      title: 'Холодное восстановление',
      description: 'Уход для сухих и повреждённых волос без утюжка.',
      price: '2 500 ₽',
      duration: '2 ч',
    },
    {
      id: 'extensions',
      num: '06',
      title: 'Наращивание волос',
      description: 'Длина и густота. Блестящие термонити — 100 ₽ за прядь.',
      price: '3 000 ₽',
      duration: '5 ч',
    },
    {
      id: 'encapsulation',
      num: '07',
      title: 'Капсуляция волос',
      description: 'Подготовка прядей к капсульному наращиванию. Цена зависит от количества прядей.',
      price: '10 ₽',
      duration: '4 ч',
    },
  ],
  reviews: [
    {
      name: 'Анна',
      text: 'Кератин сделали идеально — волосы гладкие и блестят уже месяц. Очень довольна!',
    },
    {
      name: 'Мария',
      text: 'Очень внимательный подход. Подобрали ботокс — волосы стали плотнее и живее.',
    },
    {
      name: 'Кристина',
      text: 'Реконструкция реально спасла мои пересушенные волосы. Результат видно сразу.',
    },
  ],
}

/**
 * Подменяет данные сайта значениями из админки.
 * Вызывается ДО первого рендера — клиент сразу видит актуальные данные.
 */
export function applySiteData(data: Record<string, unknown> | null) {
  if (!data || typeof data !== 'object') return
  const d = data as Record<string, unknown> & { phone: string }

  // Обновляем телефон и ссылку tel:
  if (d.phone && typeof d.phone === 'string') {
    const digits = d.phone.replace(/[\s\-\(\)]/g, '')
    site.phone = d.phone
    site.phoneHref = 'tel:' + digits
  }

  // Текстовые поля
  if (d.city) site.city = d.city as string
  if (d.address) site.address = d.address as string
  if (d.bookingUrl) site.bookingUrl = d.bookingUrl as string
  if (d.instagramHandle) site.instagramHandle = d.instagramHandle as string
  if (d.instagramUrl) site.instagramUrl = d.instagramUrl as string
  if (d.telegramUrl) site.telegramUrl = d.telegramUrl as string
  if (d.vkUrl) site.vkUrl = d.vkUrl as string

  // Массивы
  if (Array.isArray(d.services)) site.services = d.services as typeof site.services
  if (Array.isArray(d.reviews)) site.reviews = d.reviews as typeof site.reviews
  if (Array.isArray(d.advantages)) site.advantages = d.advantages as typeof site.advantages

  // Промо
  if (d.promo && typeof d.promo === 'object') {
    const promo = d.promo as Record<string, unknown>
    if (promo.badge) site.promo.badge = promo.badge as string
    if (promo.until) site.promo.until = promo.until as string
    if (promo.title) site.promo.title = promo.title as string
    if (promo.subtitle) site.promo.subtitle = promo.subtitle as string
    if (promo.text) site.promo.text = promo.text as string
    if (Array.isArray(promo.procedures)) site.promo.procedures = promo.procedures as string[]
    if (promo.note) site.promo.note = promo.note as string
  }
}

export const serviceMediaKeys = [
  'serviceKeratin',
  'serviceBotox',
  'servicePermanent',
  'serviceNanoplasty',
  'serviceCold',
  'serviceExtensions',
  'serviceEncapsulation',
] as const
