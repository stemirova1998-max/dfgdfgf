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
    src: null,
    alt: 'Мастер YARKO HAIR BEAUTY',
    label: 'Фото: мастер',
    ratio: '4 / 5',
  },
  serviceKeratin: {
    src: null,
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
  serviceReconstruction: {
    src: null,
    alt: 'Реконструкция волос — результат',
    label: 'Фото: реконструкция',
    ratio: '4 / 3',
  },
  serviceCold: {
    src: null,
    alt: 'Холодное восстановление — результат',
    label: 'Фото: холодное восстановление',
    ratio: '4 / 3',
  },
  gallery: [
    {
      src: null,
      alt: 'Работа 1 — гладкие волосы',
      label: 'Работа 1',
    },
    {
      src: null,
      alt: 'Работа 2 — текстура волос',
      label: 'Работа 2',
    },
    {
      src: null,
      alt: 'Работа 3 — блеск волос',
      label: 'Работа 3',
    },
    {
      src: null,
      alt: 'Работа 4 — объём и гладкость',
      label: 'Работа 4',
    },
    {
      src: null,
      alt: 'Работа 5 — восстановление',
      label: 'Работа 5',
    },
    {
      src: null,
      alt: 'Работа 6 — результат процедуры',
      label: 'Работа 6',
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
  serviceReconstruction: MediaSlot
  serviceCold: MediaSlot
  gallery: MediaSlot[]
  before: MediaSlot
  after: MediaSlot
}
