export interface MediaSlot {
  /** Путь к изображению в public (например '/images/hero.jpg'). null — показывается заглушка. */
  src: string | null
  alt: string
  /** Подпись для временной заглушки — описывает, какой оригинал сюда вставить. */
  label: string
  /** CSS aspect-ratio, например '4 / 5'. */
  ratio?: string
}

/**
 * Единая точка подключения фотографий.
 * Когда появятся оригиналы — положи их в public/images и укажи путь в поле `src`.
 */
export const media = {
  hero: {
    src: null,
    alt: 'Роскошные гладкие блестящие волосы после процедуры',
    label: 'Фото: гладкие блестящие волосы',
    ratio: '4 / 5',
  },
  about: {
    src: 'images/master.jpg',
    alt: 'Мастер YARKO HAIR BEAUTY',
    label: 'Фото: мастер',
    ratio: '4 / 5',
  },
  serviceKeratin: {
    src: 'images/db05deb0-dfe7-4f74-99be-7795bfa599c3.jpg',
    alt: 'Кератиновое выпрямление — результат',
    label: 'Фото: кератин',
    ratio: '4 / 3',
  },
  serviceBotox: {
    src: null,
    alt: 'Ботокс для волос — результат',
    label: 'Фото: ботокс',
    ratio: '4 / 3',
  },
  servicePermanent: {
    src: 'images/1.jpg',
    alt: 'Перманентное выпрямление волос — результат',
    label: 'Фото: перманентное выпрямление',
    ratio: '4 / 3',
  },
  serviceNanoplasty: {
    src: null,
    alt: 'Нанопластика волос — результат',
    label: 'Фото: нанопластика',
    ratio: '4 / 3',
  },
  serviceCold: {
    src: null,
    alt: 'Холодное восстановление — результат',
    label: 'Фото: холодное восстановление',
    ratio: '4 / 3',
  },
  serviceExtensions: {
    src: null,
    alt: 'Наращивание волос — результат',
    label: 'Фото: наращивание',
    ratio: '4 / 3',
  },
  serviceEncapsulation: {
    src: null,
    alt: 'Капсуляция волос',
    label: 'Фото: капсуляция',
    ratio: '4 / 3',
  },
gallery: [
    {
      src: 'images/cbd33a17-5f52-4981-bef2-9b9bd5ddd3f8.jpg',
      alt: 'Работа 1 — гладкие волосы',
      label: 'Работа 1',
    },
    {
      src: 'images/2.jpg',
      alt: 'Работа 2 — текстура волос',
      label: 'Работа 2',
    },
    {
      src: 'images/3.jpg',
      alt: 'Работа 3 — блеск волос',
      label: 'Работа 3',
    },
    {
      src: 'images/work-4.png',
      alt: 'Работа 4 — объём и гладкость',
      label: 'Работа 4',
    },
  ],
  before: {
    src: null,
    alt: 'Волосы до процедуры',
    label: 'Фото: до',
  },
  after: {
    src: null,
    alt: 'Волосы после процедуры',
    label: 'Фото: после',
  },
} satisfies {
  hero: MediaSlot
  about: MediaSlot
  serviceKeratin: MediaSlot
  serviceBotox: MediaSlot
  servicePermanent: MediaSlot
  serviceNanoplasty: MediaSlot
  serviceCold: MediaSlot
  serviceExtensions: MediaSlot
  serviceEncapsulation: MediaSlot
  gallery: MediaSlot[]
  before: MediaSlot
  after: MediaSlot
}

/** Фотографии в hero-блоке: три ряда. Пути — относительно public/. */
export const heroPhotos = [
  'images/7a85be06-419e-4867-81aa-2e9f1a7705aa.jpg',
  'images/d37419e4-1fb5-4579-9c34-2249dda5f4f1.jpg',
] as const
