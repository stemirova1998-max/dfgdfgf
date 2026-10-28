export const site = {
  brand: 'YARKO HAIR BEAUTY',
  brandMark: 'YARKO',
  brandSub: 'Hair Beauty',
  city: 'Сочи',
  instagramHandle: 'yarko_keratin',
  instagramUrl: 'https://instagram.com/yarko_keratin',
  phone: '+7 900 000-00-00',
  phoneHref: 'tel:+79000000000',
  whatsappUrl: 'https://wa.me/79000000000',
  /** Основной канал записи — WhatsApp. */
  bookingUrl: 'https://wa.me/79000000000',
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
      description: 'Гладкость и зеркальный блеск без пушистости.',
      price: 'от 5 000 ₽',
    },
    {
      id: 'botox',
      num: '02',
      title: 'Ботокс для волос',
      description: 'Интенсивное питание и уплотнение по всей длине.',
      price: 'от 3 500 ₽',
    },
    {
      id: 'reconstruction',
      num: '03',
      title: 'Реконструкция волос',
      description: 'Глубокое восстановление повреждённой структуры.',
      price: 'от 4 500 ₽',
    },
    {
      id: 'cold',
      num: '04',
      title: 'Холодное восстановление',
      description: 'Бережное питание и защита без нагрева.',
      price: 'от 4 000 ₽',
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
} as const

export const serviceMediaKeys = [
  'serviceKeratin',
  'serviceBotox',
  'serviceReconstruction',
  'serviceCold',
] as const
