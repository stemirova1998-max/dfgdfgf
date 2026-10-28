export const site = {
  brand: 'YARKO HAIR BEAUTY',
  brandMark: 'YARKO',
  brandSub: 'Hair Beauty',
  city: 'Сочи',
  instagramHandle: 'yarko_keratin',
  instagramUrl: 'https://instagram.com/yarko_keratin',
  /** Канал записи. Пока контакты не предоставлены — запись через Instagram. */
  bookingUrl: 'https://instagram.com/yarko_keratin',
  nav: [
    { href: '#about', label: 'О мастере' },
    { href: '#services', label: 'Услуги' },
    { href: '#portfolio', label: 'Работы' },
  ],
  services: [
    {
      id: 'keratin',
      num: '01',
      title: 'Кератиновое выпрямление',
      description: 'Гладкость и зеркальный блеск без пушистости.',
      price: 'Стоимость уточняется',
    },
    {
      id: 'botox',
      num: '02',
      title: 'Ботокс для волос',
      description: 'Интенсивное питание и уплотнение по всей длине.',
      price: 'Стоимость уточняется',
    },
    {
      id: 'reconstruction',
      num: '03',
      title: 'Реконструкция волос',
      description: 'Глубокое восстановление повреждённой структуры.',
      price: 'Стоимость уточняется',
    },
    {
      id: 'cold',
      num: '04',
      title: 'Холодное восстановление',
      description: 'Бережное питание и защита без нагрева.',
      price: 'Стоимость уточняется',
    },
  ],
} as const

export const serviceMediaKeys = [
  'serviceKeratin',
  'serviceBotox',
  'serviceReconstruction',
  'serviceCold',
] as const
