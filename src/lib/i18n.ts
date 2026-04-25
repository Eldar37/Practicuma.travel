import type { ContentItem, DurationFilter, MapPointRecord, Tour, TourSort } from '@/lib/types';

export type Locale = 'ru' | 'ky' | 'en';
export type ThemeMode = 'light' | 'dark';

export const localeStorageKey = 'practicuma-locale';
export const themeStorageKey = 'practicuma-theme';

const localeIntlMap: Record<Locale, string> = {
  ru: 'ru-RU',
  ky: 'ky-KG',
  en: 'en-US'
};

export const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: 'ru', label: 'Русский' },
  { value: 'ky', label: 'Кыргызча' },
  { value: 'en', label: 'English' }
];

export const messages = {
  ru: {
    nav: {
      tours: 'Туры',
      map: 'Карта',
      content: 'Контент',
      about: 'О нас',
      login: 'Войти',
      logout: 'Выйти',
      partner: 'Стать партнёром',
      menu: 'Открыть мобильное меню'
    },
    controls: {
      themeLight: 'Светлая тема',
      themeDark: 'Тёмная тема',
      language: 'Язык'
    },
    footer: {
      tours: 'Туры',
      content: 'Контент',
      company: 'Компания',
      help: 'Помощь',
      hot: 'Горящие',
      weekend: 'Выходные',
      kyrgyzstan: 'По Кыргызстану',
      videos: 'Видео',
      blogs: 'Блоги',
      ai: 'AI-подбор',
      aboutPlatform: 'О платформе',
      partnership: 'Партнёрство',
      forGuides: 'Для гидов',
      payment: 'Оплата',
      contacts: 'Контакты',
      description:
        'Цифровая travel-платформа Кыргызстана, которая соединяет вдохновение, туры, бронирование и партнёрскую монетизацию в одном продукте.',
      copyright: '© 2024 Practicuma Travel. Все права защищены.',
      madeFor: 'Сделано для современной экосистемы туризма Кыргызстана.'
    },
    auth: {
      loginTitle: 'Вход по email',
      registerTitle: 'Регистрация по email',
      loginTab: 'Войти',
      registerTab: 'Регистрация',
      hint:
        'Для входа нужен email и пароль. Поддерживаются @gmail.com и @iuca.kg. Профиль создаётся локально в браузере и используется для бронирований на сайте.',
      email: 'Email',
      emailPlaceholder: 'name@gmail.com или name@iuca.kg',
      password: 'Пароль',
      passwordRegisterPlaceholder: 'Минимум 6 символов',
      passwordLoginPlaceholder: 'Введите пароль',
      cancel: 'Отмена',
      create: 'Создать аккаунт',
      missingCredentials: 'Введите email и пароль.',
      unsupportedDomain: 'Используйте email в домене @gmail.com или @iuca.kg.',
      registerDomain: 'Для регистрации используйте адрес вида name@gmail.com или name@iuca.kg.',
      shortPassword: 'Пароль должен содержать минимум 6 символов.',
      duplicateUser: 'Пользователь с таким email уже существует.',
      invalidCredentials: 'Аккаунт не найден или пароль введён неверно.'
    },
    home: {
      heroBadge: 'Цифровая платформа туризма Кыргызстана',
      heroTitle: 'Откройте настоящий Кыргызстан',
      heroDescription:
        'От вдохновения до поездки - в одной платформе. Контент, маршруты, AI-подбор и бронирование в одном travel-продукте.',
      findTour: 'Найти тур',
      mapView: 'Смотреть на карте',
      destination: 'Направление',
      dates: 'Даты',
      people: 'Люди',
      search: 'Найти',
      scrollHint: 'Листайте, чтобы увидеть экосистему платформы',
      howItWorks: 'Как это работает',
      howDescription:
        'Платформа соединяет контент, выбор тура, AI-подбор и бронирование в одном прозрачном пользовательском сценарии.',
      featuredTitle: 'Популярные подборки туров',
      featuredDescription:
        'Самые востребованные форматы: горящие выезды, weekend-trip и маршруты по всему Кыргызстану.',
      viewAll: 'Смотреть все',
      mapTitle: 'Исследуйте на карте',
      mapDescription:
        'Сначала посмотрите, где находится маршрут, а уже потом открывайте карточку тура и бронирование.',
      openMap: 'Открыть полную карту',
      regionView: 'Смотреть на карте',
      contentTitle: 'Вдохновение для поездки',
      contentDescription:
        'Видео, маршруты и истории от наших авторов. Контент сразу связан с реальными турами и регионами.',
      viewContent: 'Смотреть контент',
      ecosystemTitle: 'Экосистема Practicuma Travel',
      ecosystemDescription:
        'Три опоры продукта: контент создаёт спрос, платформа направляет пользователя, монетизация превращает интерес в реальные поездки.'
    },
    tours: {
      catalog: 'Каталог',
      toursTitle: 'Туры по Кыргызстану',
      toursDescription:
        'Гибкая выдача по категориям, бюджету, длительности и сложности. Все фильтры синхронизируются с URL.',
      found: 'Найдено',
      toursWord: 'туров',
      urlSynced: 'Сортировка и фильтры сохраняются в URL',
      destination: 'Направление',
      date: 'Дата',
      people: 'Людей',
      filters: 'Фильтры',
      filterHint: 'Настройте выдачу под поездку',
      category: 'Категория',
      price: 'Цена',
      upTo: 'до',
      duration: 'Длительность',
      difficulty: 'Сложность',
      groupSize: 'Размер группы',
      rating: 'Рейтинг',
      any: 'Любой',
      reset: 'Сбросить фильтры',
      apply: 'Применить',
      hot: 'Горящий',
      group: 'Группа',
      perPerson: '/ чел',
      details: 'Подробнее',
      priceLabel: 'Цена'
    },
    mapPage: {
      title: 'Карта Кыргызстана',
      description: 'Выбирайте регионы, туры и природные точки прямо с карты.',
      search: 'Поиск места...',
      all: 'Все',
      allRegions: 'Все регионы',
      empty: 'По выбранным фильтрам ничего не найдено.'
    },
    contentPage: {
      title: 'Вдохновение для поездки',
      description: 'Видео, блоги и AI-маршруты для тех, кто планирует Кыргызстан через идеи, сценарии и истории.',
      search: 'Поиск по видео, блогам и маршрутам',
      all: 'Все',
      videos: 'Видео',
      blogs: 'Блоги',
      aiRoutes: 'AI-маршруты',
      found: 'Найдено материалов',
      mixed: 'Микс видео, редакционных блогов и AI-подборок',
      views: 'просмотров',
      youtube: 'Смотреть на YouTube',
      linkedTour: 'Связанный тур'
    },
    account: {
      loading: 'Загружаем аккаунт...',
      title: 'Личный кабинет',
      guestDescription:
        'Войдите по email, чтобы видеть свои бронирования и использовать единый профиль при оформлении туров.',
      createAccount: 'Создать аккаунт',
      myBookings: 'Мои бронирования',
      confirmed: 'Подтверждено',
      noBookings: 'Пока нет подтверждённых бронирований.',
      chooseTour: 'Выбрать тур',
      stats: 'Статистика',
      bookings: 'Бронирований',
      total: 'Общая сумма',
      secure: 'Безопасный профиль',
      secureDescription:
        'Авторизация и история бронирований хранятся локально в браузере как mock-режим без внешнего бэкенда.'
    }
  },
  ky: {
    nav: {
      tours: 'Турлар',
      map: 'Карта',
      content: 'Контент',
      about: 'Биз жөнүндө',
      login: 'Кирүү',
      logout: 'Чыгуу',
      partner: 'Өнөктөш болуу',
      menu: 'Мобилдик менюну ачуу'
    },
    controls: {
      themeLight: 'Жарык тема',
      themeDark: 'Караңгы тема',
      language: 'Тил'
    },
    footer: {
      tours: 'Турлар',
      content: 'Контент',
      company: 'Компания',
      help: 'Жардам',
      hot: 'Ысык сунуштар',
      weekend: 'Дем алыш',
      kyrgyzstan: 'Кыргызстан боюнча',
      videos: 'Видеолор',
      blogs: 'Блогдор',
      ai: 'AI-тандоо',
      aboutPlatform: 'Платформа жөнүндө',
      partnership: 'Өнөктөштүк',
      forGuides: 'Гиддер үчүн',
      payment: 'Төлөм',
      contacts: 'Байланыштар',
      description:
        'Кыргызстандын санарип travel-платформасы: илхам, турлар, брондоо жана өнөктөш монетизациясы бир жерде.',
      copyright: '© 2024 Practicuma Travel. Бардык укуктар корголгон.',
      madeFor: 'Кыргызстандын заманбап туризм экосистемасы үчүн түзүлгөн.'
    },
    auth: {
      loginTitle: 'Email аркылуу кирүү',
      registerTitle: 'Email аркылуу катталуу',
      loginTab: 'Кирүү',
      registerTab: 'Катталуу',
      hint:
        'Кирүү үчүн email жана сырсөз керек. @gmail.com жана @iuca.kg колдоого алынат. Профиль браузерде локалдуу сакталат.',
      email: 'Email',
      emailPlaceholder: 'name@gmail.com же name@iuca.kg',
      password: 'Сырсөз',
      passwordRegisterPlaceholder: 'Кеминде 6 белги',
      passwordLoginPlaceholder: 'Сырсөздү киргизиңиз',
      cancel: 'Жокко чыгаруу',
      create: 'Аккаунт түзүү',
      missingCredentials: 'Email жана сырсөздү киргизиңиз.',
      unsupportedDomain: '@gmail.com же @iuca.kg домениндеги email колдонуңуз.',
      registerDomain: 'Катталуу үчүн name@gmail.com же name@iuca.kg форматын колдонуңуз.',
      shortPassword: 'Сырсөз кеминде 6 белгиден турушу керек.',
      duplicateUser: 'Мындай email менен колдонуучу мурунтан бар.',
      invalidCredentials: 'Аккаунт табылган жок же сырсөз туура эмес.'
    },
    home: {
      heroBadge: 'Кыргызстандын санарип туризм платформасы',
      heroTitle: 'Чыныгы Кыргызстанды ачыңыз',
      heroDescription:
        'Илхамдан сапарга чейин - бир платформада. Контент, маршруттар, AI-тандоо жана брондоо бир жерде.',
      findTour: 'Тур табуу',
      mapView: 'Картадан көрүү',
      destination: 'Багыт',
      dates: 'Даталар',
      people: 'Адамдар',
      search: 'Издөө',
      scrollHint: 'Платформанын экосистемасын көрүү үчүн ылдый түшүңүз',
      howItWorks: 'Бул кандай иштейт',
      howDescription:
        'Платформа контентти, тур тандоону, AI-тандоону жана брондоону бир ыңгайлуу сценарийге бириктирет.',
      featuredTitle: 'Таанымал тур топтомдору',
      featuredDescription:
        'Эң суроо-талаптагы форматтар: ысык сунуштар, дем алыш турлары жана Кыргызстан боюнча маршруттар.',
      viewAll: 'Баарын көрүү',
      mapTitle: 'Картадан изилдеңиз',
      mapDescription: 'Адегенде маршрут кайда экенин көрүп, андан кийин тур карточкасын жана брондоону ачыңыз.',
      openMap: 'Толук картаны ачуу',
      regionView: 'Картадан көрүү',
      contentTitle: 'Сапар үчүн илхам',
      contentDescription: 'Авторлорубуздан видеолор, маршруттар жана окуялар. Контент реалдуу турлар менен байланыштырылган.',
      viewContent: 'Контентти көрүү',
      ecosystemTitle: 'Practicuma Travel экосистемасы',
      ecosystemDescription:
        'Үч таяныч: контент суроо-талап жаратат, платформа багыттайт, монетизация кызыгууну реалдуу сапарга айлантат.'
    },
    tours: {
      catalog: 'Каталог',
      toursTitle: 'Кыргызстан боюнча турлар',
      toursDescription:
        'Категория, бюджет, узактык жана татаалдык боюнча ийкемдүү тандоо. Бардык фильтрлер URL менен синхрондолот.',
      found: 'Табылды',
      toursWord: 'тур',
      urlSynced: 'Иреттөө жана фильтрлер URL ичинде сакталат',
      destination: 'Багыт',
      date: 'Дата',
      people: 'Адам',
      filters: 'Фильтрлер',
      filterHint: 'Саякатка ылайыктап тандаңыз',
      category: 'Категория',
      price: 'Баасы',
      upTo: 'чейин',
      duration: 'Узактыгы',
      difficulty: 'Татаалдыгы',
      groupSize: 'Топтун өлчөмү',
      rating: 'Рейтинг',
      any: 'Каалаган',
      reset: 'Фильтрлерди тазалоо',
      apply: 'Колдонуу',
      hot: 'Ысык',
      group: 'Топ',
      perPerson: '/ адам',
      details: 'Толугураак',
      priceLabel: 'Баасы'
    },
    mapPage: {
      title: 'Кыргызстандын картасы',
      description: 'Аймактарды, турларды жана жаратылыш чекиттерин картадан тандаңыз.',
      search: 'Жерди издөө...',
      all: 'Баары',
      allRegions: 'Бардык аймактар',
      empty: 'Бул фильтрлер боюнча эч нерсе табылган жок.'
    },
    contentPage: {
      title: 'Сапар үчүн илхам',
      description: 'Кыргызстанды идея, сценарий жана окуялар аркылуу пландагандар үчүн видео, блог жана AI-маршруттар.',
      search: 'Видео, блог жана маршруттарды издөө',
      all: 'Баары',
      videos: 'Видеолор',
      blogs: 'Блогдор',
      aiRoutes: 'AI-маршруттар',
      found: 'Материал табылды',
      mixed: 'Видеолор, редакциялык блогдор жана AI-тандоолор аралашмасы',
      views: 'көрүү',
      youtube: 'YouTubeдан көрүү',
      linkedTour: 'Байланышкан тур'
    },
    account: {
      loading: 'Аккаунт жүктөлүүдө...',
      title: 'Жеке кабинет',
      guestDescription: 'Брондоолоруңузду көрүү жана бирдиктүү профилди колдонуу үчүн email менен кириңиз.',
      createAccount: 'Аккаунт түзүү',
      myBookings: 'Менин брондоолорум',
      confirmed: 'Тастыкталды',
      noBookings: 'Азырынча тастыкталган брондоолор жок.',
      chooseTour: 'Тур тандоо',
      stats: 'Статистика',
      bookings: 'Брондоолор',
      total: 'Жалпы сумма',
      secure: 'Коопсуз профиль',
      secureDescription:
        'Авторизация жана брондоо тарыхы браузерде локалдуу mock-режимде тышкы бэкендсиз сакталат.'
    }
  },
  en: {
    nav: {
      tours: 'Tours',
      map: 'Map',
      content: 'Content',
      about: 'About',
      login: 'Sign in',
      logout: 'Log out',
      partner: 'Become a partner',
      menu: 'Open mobile menu'
    },
    controls: {
      themeLight: 'Light mode',
      themeDark: 'Dark mode',
      language: 'Language'
    },
    footer: {
      tours: 'Tours',
      content: 'Content',
      company: 'Company',
      help: 'Help',
      hot: 'Hot deals',
      weekend: 'Weekend',
      kyrgyzstan: 'Across Kyrgyzstan',
      videos: 'Videos',
      blogs: 'Blogs',
      ai: 'AI matching',
      aboutPlatform: 'About the platform',
      partnership: 'Partnership',
      forGuides: 'For guides',
      payment: 'Payments',
      contacts: 'Contacts',
      description:
        'A digital travel platform for Kyrgyzstan that connects inspiration, tours, bookings, and partner monetization in one product.',
      copyright: '© 2024 Practicuma Travel. All rights reserved.',
      madeFor: 'Built for the modern tourism ecosystem of Kyrgyzstan.'
    },
    auth: {
      loginTitle: 'Sign in with email',
      registerTitle: 'Create account with email',
      loginTab: 'Sign in',
      registerTab: 'Register',
      hint:
        'Use your email and password. Both @gmail.com and @iuca.kg are supported. The profile is stored locally in your browser for bookings.',
      email: 'Email',
      emailPlaceholder: 'name@gmail.com or name@iuca.kg',
      password: 'Password',
      passwordRegisterPlaceholder: 'At least 6 characters',
      passwordLoginPlaceholder: 'Enter your password',
      cancel: 'Cancel',
      create: 'Create account',
      missingCredentials: 'Enter your email and password.',
      unsupportedDomain: 'Use an email in the @gmail.com or @iuca.kg domain.',
      registerDomain: 'Use an address like name@gmail.com or name@iuca.kg.',
      shortPassword: 'Password must contain at least 6 characters.',
      duplicateUser: 'A user with this email already exists.',
      invalidCredentials: 'Account not found or password is incorrect.'
    },
    home: {
      heroBadge: 'Digital tourism platform for Kyrgyzstan',
      heroTitle: 'Discover the real Kyrgyzstan',
      heroDescription:
        'From inspiration to trip planning in one platform. Content, routes, AI matching, and booking in a single travel product.',
      findTour: 'Find a tour',
      mapView: 'View on map',
      destination: 'Destination',
      dates: 'Dates',
      people: 'People',
      search: 'Search',
      scrollHint: 'Scroll to explore the platform ecosystem',
      howItWorks: 'How it works',
      howDescription:
        'The platform combines content, tour discovery, AI matching, and booking in one seamless user journey.',
      featuredTitle: 'Popular tour collections',
      featuredDescription:
        'The most requested formats: hot deals, weekend trips, and journeys across Kyrgyzstan.',
      viewAll: 'View all',
      mapTitle: 'Explore on the map',
      mapDescription:
        'See where the route is first, then open the tour card and booking flow.',
      openMap: 'Open full map',
      regionView: 'View on map',
      contentTitle: 'Inspiration for your trip',
      contentDescription:
        'Videos, routes, and stories from our authors. Every piece of content is linked to real tours and regions.',
      viewContent: 'View content',
      ecosystemTitle: 'The Practicuma Travel ecosystem',
      ecosystemDescription:
        'Three pillars: content creates demand, the platform guides the traveler, and monetization turns interest into real trips.'
    },
    tours: {
      catalog: 'Catalog',
      toursTitle: 'Tours across Kyrgyzstan',
      toursDescription:
        'Flexible discovery by category, budget, duration, and difficulty. All filters stay synced with the URL.',
      found: 'Found',
      toursWord: 'tours',
      urlSynced: 'Sorting and filters stay synced in the URL',
      destination: 'Destination',
      date: 'Date',
      people: 'People',
      filters: 'Filters',
      filterHint: 'Adjust the list to your trip',
      category: 'Category',
      price: 'Price',
      upTo: 'up to',
      duration: 'Duration',
      difficulty: 'Difficulty',
      groupSize: 'Group size',
      rating: 'Rating',
      any: 'Any',
      reset: 'Reset filters',
      apply: 'Apply',
      hot: 'Hot',
      group: 'Group',
      perPerson: '/ person',
      details: 'Details',
      priceLabel: 'Price'
    },
    mapPage: {
      title: 'Map of Kyrgyzstan',
      description: 'Choose regions, tours, and natural attractions directly from the map.',
      search: 'Search a place...',
      all: 'All',
      allRegions: 'All regions',
      empty: 'Nothing matches the selected filters.'
    },
    contentPage: {
      title: 'Inspiration for your trip',
      description: 'Videos, blogs, and AI routes for travelers planning Kyrgyzstan through ideas, stories, and scenarios.',
      search: 'Search videos, blogs, and routes',
      all: 'All',
      videos: 'Videos',
      blogs: 'Blogs',
      aiRoutes: 'AI routes',
      found: 'Items found',
      mixed: 'A mix of videos, editorial stories, and AI recommendations',
      views: 'views',
      youtube: 'Watch on YouTube',
      linkedTour: 'Linked tour'
    },
    account: {
      loading: 'Loading your account...',
      title: 'Account',
      guestDescription:
        'Sign in with email to see your bookings and use one profile while booking tours.',
      createAccount: 'Create account',
      myBookings: 'My bookings',
      confirmed: 'Confirmed',
      noBookings: 'No confirmed bookings yet.',
      chooseTour: 'Choose a tour',
      stats: 'Stats',
      bookings: 'Bookings',
      total: 'Total amount',
      secure: 'Secure profile',
      secureDescription:
        'Authentication and booking history are stored locally in the browser as a mock mode without an external backend.'
    }
  }
} as const;

type MessageTree = (typeof messages)[Locale];

export const getMessage = (locale: Locale, path: string) => {
  const keys = path.split('.');
  let current: unknown = messages[locale];

  for (const key of keys) {
    if (!current || typeof current !== 'object' || !(key in current)) {
      return path;
    }

    current = (current as Record<string, unknown>)[key];
  }

  return typeof current === 'string' ? current : path;
};

export const tourCategoryLabelsByLocale: Record<Locale, Record<Tour['category'], string>> = {
  ru: {
    burning: 'Горящие',
    weekend: 'Выходные',
    kyrgyzstan: 'Кыргызстан',
    trekking: 'Треккинг',
    cultural: 'Культурные'
  },
  ky: {
    burning: 'Ысык сунуштар',
    weekend: 'Дем алыш',
    kyrgyzstan: 'Кыргызстан',
    trekking: 'Треккинг',
    cultural: 'Маданий'
  },
  en: {
    burning: 'Hot deals',
    weekend: 'Weekend',
    kyrgyzstan: 'Kyrgyzstan',
    trekking: 'Trekking',
    cultural: 'Cultural'
  }
};

export const difficultyLabelsByLocale: Record<Locale, Record<Tour['difficulty'], string>> = {
  ru: { easy: 'Легкий', medium: 'Средний', hard: 'Сложный' },
  ky: { easy: 'Жеңил', medium: 'Орточо', hard: 'Татаал' },
  en: { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
};

export const durationLabelsByLocale: Record<Locale, Record<DurationFilter, string>> = {
  ru: { '1-day': '1 день', '2-3-days': '2-3 дня', '4-7-days': '4-7 дней', '7-plus': '7+ дней' },
  ky: { '1-day': '1 күн', '2-3-days': '2-3 күн', '4-7-days': '4-7 күн', '7-plus': '7+ күн' },
  en: { '1-day': '1 day', '2-3-days': '2-3 days', '4-7-days': '4-7 days', '7-plus': '7+ days' }
};

export const sortLabelsByLocale: Record<Locale, Record<TourSort, string>> = {
  ru: {
    popular: 'По популярности',
    'price-asc': 'Сначала дешевле',
    'price-desc': 'Сначала дороже',
    rating: 'По рейтингу'
  },
  ky: {
    popular: 'Популярдуулугу боюнча',
    'price-asc': 'Арзаныраак биринчи',
    'price-desc': 'Кымбатыраак биринчи',
    rating: 'Рейтинг боюнча'
  },
  en: {
    popular: 'Most popular',
    'price-asc': 'Price: low to high',
    'price-desc': 'Price: high to low',
    rating: 'Highest rated'
  }
};

export const mapTypeLabelsByLocale: Record<Locale, Record<MapPointRecord['type'], string>> = {
  ru: { attraction: 'Достопримечательность', region: 'Регион', tour: 'Тур' },
  ky: { attraction: 'Көрүүгө жер', region: 'Аймак', tour: 'Тур' },
  en: { attraction: 'Attraction', region: 'Region', tour: 'Tour' }
};

export const regionLabelsByLocale: Record<
  Locale,
  Record<'Bishkek' | 'Issyk-Kul' | 'Osh' | 'Naryn' | 'Batken' | 'Talas' | 'Jalal-Abad' | 'Chuy', string>
> = {
  ru: {
    Bishkek: 'Бишкек',
    'Issyk-Kul': 'Иссык-Куль',
    Osh: 'Ош',
    Naryn: 'Нарын',
    Batken: 'Баткен',
    Talas: 'Талас',
    'Jalal-Abad': 'Джалал-Абад',
    Chuy: 'Чуй'
  },
  ky: {
    Bishkek: 'Бишкек',
    'Issyk-Kul': 'Ысык-Көл',
    Osh: 'Ош',
    Naryn: 'Нарын',
    Batken: 'Баткен',
    Talas: 'Талас',
    'Jalal-Abad': 'Жалал-Абад',
    Chuy: 'Чүй'
  },
  en: {
    Bishkek: 'Bishkek',
    'Issyk-Kul': 'Issyk-Kul',
    Osh: 'Osh',
    Naryn: 'Naryn',
    Batken: 'Batken',
    Talas: 'Talas',
    'Jalal-Abad': 'Jalal-Abad',
    Chuy: 'Chuy'
  }
};

export const groupSizeOptionsByLocale: Record<
  Locale,
  Array<{ value: '' | '1-4' | '5-8' | '9-12' | '13+'; label: string }>
> = {
  ru: [
    { value: '', label: 'Любая группа' },
    { value: '1-4', label: '1-4 человека' },
    { value: '5-8', label: '5-8 человек' },
    { value: '9-12', label: '9-12 человек' },
    { value: '13+', label: '13+ человек' }
  ],
  ky: [
    { value: '', label: 'Каалаган топ' },
    { value: '1-4', label: '1-4 адам' },
    { value: '5-8', label: '5-8 адам' },
    { value: '9-12', label: '9-12 адам' },
    { value: '13+', label: '13+ адам' }
  ],
  en: [
    { value: '', label: 'Any group size' },
    { value: '1-4', label: '1-4 people' },
    { value: '5-8', label: '5-8 people' },
    { value: '9-12', label: '9-12 people' },
    { value: '13+', label: '13+ people' }
  ]
};

export const contentTypeLabelsByLocale: Record<Locale, Record<'all' | ContentItem['type'], string>> = {
  ru: { all: 'Все', video: 'Видео', blog: 'Блоги', 'ai-route': 'AI-маршруты' },
  ky: { all: 'Баары', video: 'Видеолор', blog: 'Блогдор', 'ai-route': 'AI-маршруттар' },
  en: { all: 'All', video: 'Videos', blog: 'Blogs', 'ai-route': 'AI routes' }
};

export const formatCurrencyByLocale = (amount: number, currency: Tour['currency'], locale: Locale) => {
  if (currency === 'USD') {
    return new Intl.NumberFormat(localeIntlMap[locale], {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  }

  const unit = locale === 'en' ? 'som' : 'сом';
  return `${new Intl.NumberFormat(localeIntlMap[locale]).format(amount)} ${unit}`;
};

export const formatCompactNumberByLocale = (value: number, locale: Locale) =>
  new Intl.NumberFormat(localeIntlMap[locale], { notation: 'compact', maximumFractionDigits: 1 }).format(value);

export const formatReadableDateByLocale = (date: string, locale: Locale) =>
  new Intl.DateTimeFormat(localeIntlMap[locale], { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date));

export const formatDateRangeByLocale = (startDate: string, endDate: string, locale: Locale) =>
  `${formatReadableDateByLocale(startDate, locale)} - ${formatReadableDateByLocale(endDate, locale)}`;

export const emailDomainAllowed = (email: string) =>
  /^[a-z0-9._%+-]+@(gmail\.com|iuca\.kg)$/i.test(email.trim().toLowerCase());
