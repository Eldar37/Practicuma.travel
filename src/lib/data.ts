import type { ContentItem, Guide, MapPointRecord, Tour } from '@/lib/types';

export const guides: Guide[] = [
  {
    id: 'guide-aida',
    name: 'Аида Турдубекова',
    photo: 'https://i.pravatar.cc/100?img=11',
    rating: 4.9,
    certified: true,
    languages: ['Русский', 'Кыргызский', 'English'],
    bio: 'Организует семейные и культурные маршруты по северу Кыргызстана, умеет превращать сложную логистику в спокойное путешествие.',
    toursCount: 48
  },
  {
    id: 'guide-bekzat',
    name: 'Бекзат Сатыбалдиев',
    photo: 'https://i.pravatar.cc/100?img=12',
    rating: 4.8,
    certified: true,
    languages: ['Русский', 'English', 'Deutsch'],
    bio: 'Горный гид с акцентом на альпинизм и высотные треки. Ведет группы к базовым лагерям и удаленным долинам.',
    toursCount: 61
  },
  {
    id: 'guide-elina',
    name: 'Элина Джумабек',
    photo: 'https://i.pravatar.cc/100?img=32',
    rating: 4.7,
    certified: true,
    languages: ['Русский', 'English'],
    bio: 'Специализируется на маршрутном контенте и storytelling-турах: озера, каньоны, локальная гастрономия и ремесла.',
    toursCount: 37
  },
  {
    id: 'guide-nurlan',
    name: 'Нурлан Абдраимов',
    photo: 'https://i.pravatar.cc/100?img=15',
    rating: 4.9,
    certified: true,
    languages: ['Русский', 'Кыргызский', 'Türkçe'],
    bio: 'Южное направление, исторические города и маршруты по следам Шелкового пути. Хорошо работает с mixed-группами.',
    toursCount: 54
  },
  {
    id: 'guide-ayperi',
    name: 'Айпери Маматова',
    photo: 'https://i.pravatar.cc/100?img=25',
    rating: 4.8,
    certified: true,
    languages: ['Русский', 'English', 'Français'],
    bio: 'Проводник по кочевой культуре и устойчивому туризму. Ведет камерные выезды в юртовые лагеря и деревни.',
    toursCount: 42
  }
];

const imageSet = (seed: string) => [
  `https://picsum.photos/seed/${seed}-1/1200/800`,
  `https://picsum.photos/seed/${seed}-2/1200/800`,
  `https://picsum.photos/seed/${seed}-3/1200/800`,
  `https://picsum.photos/seed/${seed}-4/1200/800`,
  `https://picsum.photos/seed/${seed}-5/1200/800`
];

export const tours: Tour[] = [
  {
    id: 'tour-issyk-hot-weekend',
    title: 'Горящий тур: Иссык-Куль за выходные',
    slug: 'goryashchiy-tur-issyk-kul-za-vyhodnye',
    category: 'burning',
    description:
      'Быстрый выезд к Иссык-Кулю для тех, кто хочет перезагрузиться за два дня: дорога из Бишкека, пляж, закат на пирсе и короткие остановки в Чолпон-Ате.',
    shortDescription:
      'Двухдневный экспресс-тур к Иссык-Кулю с комфортным трансфером, отдыхом у воды и вечерним променадом.',
    price: 8500,
    currency: 'KGS',
    duration: '2 дня / 1 ночь',
    difficulty: 'easy',
    groupSize: { min: 2, max: 14 },
    startDate: '2026-06-14',
    endDate: '2026-06-15',
    location: 'Иссык-Куль, Чолпон-Ата',
    coordinates: { lat: 42.45, lng: 77 },
    images: imageSet('lake-kyrgyz-hot'),
    highlights: ['Пляжный отдых у Иссык-Куля', 'Вечер в Чолпон-Ате', 'Трансфер туда-обратно', 'Идеально для короткого отпуска'],
    includes: ['Трансфер из Бишкека', 'Проживание 1 ночь', 'Сопровождение координатора', 'Завтрак'],
    excludes: ['Личные расходы', 'Обеды и ужины', 'Входные билеты в музеи'],
    itinerary: [
      {
        day: 1,
        title: 'Выезд к озеру',
        description: 'Ранний выезд из Бишкека, остановка на панорамной точке и заселение у озера.',
        activities: ['Сбор группы', 'Переезд', 'Прогулка по берегу', 'Вечерний отдых']
      },
      {
        day: 2,
        title: 'Чолпон-Ата и возвращение',
        description: 'Свободное время у воды, прогулка по Чолпон-Ате и обратный трансфер.',
        activities: ['Завтрак', 'Чолпон-Ата', 'Пляж', 'Возвращение в Бишкек']
      }
    ],
    guide: guides[0],
    rating: 4.8,
    reviewCount: 126,
    isHot: true,
    tags: ['озеро', 'выходные', 'семья']
  },
  {
    id: 'tour-altyn-arashan-weekend',
    title: 'Тур выходного дня: Алтын Арашан',
    slug: 'tur-vyhodnogo-dnya-altyn-arashan',
    category: 'weekend',
    description:
      'Классический маршрут к горячим источникам Алтын-Арашана: трек через хвойную долину, ночевка в гостевом доме и живые виды на снежные вершины.',
    shortDescription:
      'Трехдневный выезд в Алтын-Арашан с треком по ущелью, ночевкой и купанием в источниках.',
    price: 4500,
    currency: 'KGS',
    duration: '3 дня / 2 ночи',
    difficulty: 'medium',
    groupSize: { min: 4, max: 10 },
    startDate: '2026-07-04',
    endDate: '2026-07-06',
    location: 'Алтын-Арашан, Каракол',
    coordinates: { lat: 42.65, lng: 78.4 },
    images: imageSet('altyn-arashan'),
    highlights: ['Горячие источники', 'Альпийская долина', 'Небольшая группа', 'Вид на Терскей Ала-Тоо'],
    includes: ['Трансфер Каракол - старт трека', 'Гид', 'Ночевка', 'Питание по программе'],
    excludes: ['Прокат личного снаряжения', 'Страховка', 'Личные расходы'],
    itinerary: [
      {
        day: 1,
        title: 'Переезд и старт трека',
        description: 'Сбор в Караколе, короткий трансфер к началу тропы и пеший переход в долину.',
        activities: ['Брифинг', 'Трек 8 км', 'Заселение', 'Ужин']
      },
      {
        day: 2,
        title: 'Источники и радиальный выход',
        description: 'Свободное утро у горячих источников и прогулка к панорамной точке.',
        activities: ['Купание', 'Радиальный трек', 'Фото-стопы', 'Вечер у печи']
      },
      {
        day: 3,
        title: 'Спуск в Каракол',
        description: 'Спокойный спуск обратно и возвращение в город к вечеру.',
        activities: ['Завтрак', 'Спуск', 'Трансфер', 'Финал тура']
      }
    ],
    guide: guides[2],
    rating: 4.7,
    reviewCount: 74,
    isHot: false,
    tags: ['трек', 'источники', 'каракол']
  },
  {
    id: 'tour-silk-road',
    title: 'Великий шёлковый путь: 7 дней',
    slug: 'velikiy-shelkovyy-put-7-dney',
    category: 'kyrgyzstan',
    description:
      'Недельный маршрут через древние города, караванные дороги и высокогорные долины. Тур соединяет исторический контекст, локальную кухню и ключевые точки страны.',
    shortDescription:
      'Семидневное путешествие по маршрутам Шелкового пути: Бишкек, Таш-Рабат, Нарын, Иссык-Куль и Ош.',
    price: 45000,
    currency: 'KGS',
    duration: '7 дней / 6 ночей',
    difficulty: 'medium',
    groupSize: { min: 4, max: 12 },
    startDate: '2026-08-12',
    endDate: '2026-08-18',
    location: 'Бишкек - Нарын - Таш-Рабат - Ош',
    coordinates: { lat: 41.4286, lng: 75.9908 },
    images: imageSet('silk-road-kyrgyzstan'),
    highlights: ['История караванных путей', 'Таш-Рабат', 'Южный Кыргызстан', 'Панорамные переезды'],
    includes: ['Транспорт по маршруту', 'Проживание', 'Завтраки', 'Экскурсионная программа'],
    excludes: ['Авиабилеты до Кыргызстана', 'Часть обедов и ужинов', 'Личные расходы'],
    itinerary: [
      {
        day: 1,
        title: 'Бишкек',
        description: 'Прилет, знакомство с городом и вводная лекция по маршруту.',
        activities: ['Встреча', 'Сити-тур', 'Ужин-знакомство']
      },
      {
        day: 2,
        title: 'Переезд в Нарын',
        description: 'Дорога через ущелья и перевалы с остановками в панорамных точках.',
        activities: ['Трансфер', 'Фото-стопы', 'Нарын']
      },
      {
        day: 3,
        title: 'Таш-Рабат',
        description: 'Выезд к караван-сараю и прогулка по окрестностям.',
        activities: ['Таш-Рабат', 'Исторический маршрут', 'Юртовый лагерь']
      },
      {
        day: 4,
        title: 'Сон-Куль',
        description: 'Высокогорное озеро и знакомство с кочевой культурой.',
        activities: ['Переезд', 'Сон-Куль', 'Конные прогулки']
      },
      {
        day: 5,
        title: 'Иссык-Куль',
        description: 'Спуск к озеру и вечерняя прогулка по северному берегу.',
        activities: ['Трансфер', 'Берег озера', 'Локальная кухня']
      },
      {
        day: 6,
        title: 'Перелет или переезд в Ош',
        description: 'Переход к южной части маршрута и вечер в древнем городе.',
        activities: ['Дорога', 'Ош', 'Вечерняя экскурсия']
      },
      {
        day: 7,
        title: 'Финал в Оше',
        description: 'Священная гора Сулайман-Тоо и завершение программы.',
        activities: ['Исторический центр', 'Сулайман-Тоо', 'Завершение']
      }
    ],
    guide: guides[3],
    rating: 4.9,
    reviewCount: 58,
    isHot: false,
    tags: ['история', 'маршрут', 'неделя']
  },
  {
    id: 'tour-lenin-peak',
    title: 'Треккинг к пику Ленина',
    slug: 'trekking-k-piku-lenina',
    category: 'trekking',
    description:
      'Серьезный многодневный трек к базовому лагерю пика Ленина через высокогорные долины Памира. Для тех, кто хочет настоящую экспедиционную атмосферу.',
    shortDescription:
      'Высотный трек к базовому лагерю пика Ленина с акклиматизацией, поддержкой гида и палаточным лагерем.',
    price: 65000,
    currency: 'KGS',
    duration: '8 дней / 7 ночей',
    difficulty: 'hard',
    groupSize: { min: 3, max: 8 },
    startDate: '2026-07-20',
    endDate: '2026-07-27',
    location: 'Памир, базовый лагерь пика Ленина',
    coordinates: { lat: 39.79, lng: 72.87 },
    images: imageSet('lenin-peak'),
    highlights: ['Высотный трек', 'Памирские панорамы', 'Базовый лагерь', 'Поддержка на маршруте'],
    includes: ['Трансферы по программе', 'Палаточный лагерь', 'Питание на треке', 'Горный гид'],
    excludes: ['Личное снаряжение', 'Страховка повышенного риска', 'Персональный porter'],
    itinerary: [
      {
        day: 1,
        title: 'Прибытие в Ош',
        description: 'Сбор команды, проверка снаряжения и брифинг по безопасности.',
        activities: ['Встреча', 'Проверка экипировки', 'Брифинг']
      },
      {
        day: 2,
        title: 'Переезд к базовому лагерю',
        description: 'Долгий, но живописный трансфер через южные долины.',
        activities: ['Трансфер', 'Лагерь', 'Акклиматизация']
      },
      {
        day: 3,
        title: 'Радиальный выход',
        description: 'Первый акклиматизационный день на тропах вокруг лагеря.',
        activities: ['Радиальный трек', 'Отработка темпа', 'Ночевка']
      },
      {
        day: 4,
        title: 'Подход к перевалу',
        description: 'Набор высоты и работа с дыханием на маршруте.',
        activities: ['Трек 12 км', 'Привал', 'Фото-точки']
      },
      {
        day: 5,
        title: 'Панорама на пик',
        description: 'Главный день маршрута с лучшими видами на Ленин Peak.',
        activities: ['Высотный выход', 'Панорамная точка', 'Возвращение']
      },
      {
        day: 6,
        title: 'Резерв и восстановление',
        description: 'Буферный день на случай погоды или дополнительного выхода.',
        activities: ['Отдых', 'Резерв', 'Лекция гида']
      },
      {
        day: 7,
        title: 'Спуск',
        description: 'Сбор лагеря и обратный переход.',
        activities: ['Сбор лагеря', 'Трек вниз', 'Трансфер']
      },
      {
        day: 8,
        title: 'Возвращение в Ош',
        description: 'Финальный переезд и завершение программы.',
        activities: ['Ош', 'Разбор маршрута', 'Вылет']
      }
    ],
    guide: guides[1],
    rating: 4.9,
    reviewCount: 31,
    isHot: false,
    tags: ['экспедиция', 'высота', 'памир']
  },
  {
    id: 'tour-nomads',
    title: 'Кочевники: юрты и степи',
    slug: 'kochevniki-yurty-i-stepi',
    category: 'cultural',
    description:
      'Теплый культурный маршрут в юртовый лагерь с мастер-классами, традиционной кухней и знакомством с кочевыми обычаями.',
    shortDescription:
      'Культурный тур с проживанием в юртах, ремесленными мастер-классами и знакомством с кочевой жизнью.',
    price: 12000,
    currency: 'KGS',
    duration: '2 дня / 1 ночь',
    difficulty: 'easy',
    groupSize: { min: 2, max: 16 },
    startDate: '2026-06-21',
    endDate: '2026-06-22',
    location: 'Сон-Куль',
    coordinates: { lat: 41.85, lng: 75.14 },
    images: imageSet('nomads-yurt'),
    highlights: ['Юртовый лагерь', 'Национальная кухня', 'Конные прогулки', 'Живое общение с хозяевами'],
    includes: ['Трансфер', 'Проживание в юрте', 'Ужин и завтрак', 'Мастер-класс'],
    excludes: ['Личные покупки', 'Дополнительные конные прогулки', 'Страховка'],
    itinerary: [
      {
        day: 1,
        title: 'Путь к Сон-Кулю',
        description: 'Дорога к высокогорному озеру и знакомство с семьей-хозяевами лагеря.',
        activities: ['Переезд', 'Заселение', 'Традиционный ужин']
      },
      {
        day: 2,
        title: 'Кочевая культура',
        description: 'Утренний быт в лагере, мастер-класс и возвращение.',
        activities: ['Чай в юрте', 'Мастер-класс', 'Фото-сессия', 'Возвращение']
      }
    ],
    guide: guides[4],
    rating: 4.8,
    reviewCount: 88,
    isHot: false,
    tags: ['культура', 'юрты', 'сон-куль']
  },
  {
    id: 'tour-skazka-barskoon',
    title: 'Каньон Сказка + Барскоон',
    slug: 'kanon-skazka-barskoon',
    category: 'weekend',
    description:
      'Насыщенный маршрут вдоль южного берега Иссык-Куля: красные скалы Сказки, водопады Барскоона и дорога с лучшими видами на озеро.',
    shortDescription:
      'Комбинированный weekend-тур по каньону Сказка и ущелью Барскоон с фотостопами и легкими прогулками.',
    price: 5500,
    currency: 'KGS',
    duration: '2 дня / 1 ночь',
    difficulty: 'easy',
    groupSize: { min: 2, max: 12 },
    startDate: '2026-07-11',
    endDate: '2026-07-12',
    location: 'Сказка, Барскоон',
    coordinates: { lat: 42.27, lng: 77.55 },
    images: imageSet('skazka-barskoon'),
    highlights: ['Красные каньоны', 'Водопады Барскоона', 'Южный берег Иссык-Куля', 'Легкий маршрут'],
    includes: ['Транспорт', 'Гид', 'Ночевка', 'Завтрак'],
    excludes: ['Обеды и ужины', 'Сувениры', 'Дополнительные активности'],
    itinerary: [
      {
        day: 1,
        title: 'Каньон Сказка',
        description: 'Прогулка по каньону, съемка на закате и вечер у южного берега.',
        activities: ['Переезд', 'Трек по каньону', 'Фотосъемка']
      },
      {
        day: 2,
        title: 'Барскоон',
        description: 'Водопады и горные виды перед обратной дорогой.',
        activities: ['Ущелье Барскоон', 'Водопады', 'Возвращение']
      }
    ],
    guide: guides[2],
    rating: 4.6,
    reviewCount: 63,
    isHot: false,
    tags: ['каньон', 'водопады', 'иссык-куль']
  },
  {
    id: 'tour-cholpon-ata-hot',
    title: 'Горящий: Горное Чолпон-Ата',
    slug: 'goryashchiy-gornoe-cholpon-ata',
    category: 'burning',
    description:
      'Акционный тур на ближайший уикенд: совмещает отдых на северном берегу Иссык-Куля и короткие выезды в горные панорамы вокруг Чолпон-Аты.',
    shortDescription:
      'Горящее предложение на северный берег Иссык-Куля с видом на горы и легкой прогулкой.',
    price: 6000,
    currency: 'KGS',
    duration: '2 дня / 1 ночь',
    difficulty: 'easy',
    groupSize: { min: 2, max: 14 },
    startDate: '2026-06-07',
    endDate: '2026-06-08',
    location: 'Чолпон-Ата',
    coordinates: { lat: 42.65, lng: 77.08 },
    images: imageSet('cholpon-ata-hot'),
    highlights: ['Северный берег Иссык-Куля', 'Панорамы Чолпон-Аты', 'Быстрый формат', 'Комфортный трансфер'],
    includes: ['Трансфер', 'Ночевка', 'Сопровождение', 'Завтрак'],
    excludes: ['Входные билеты', 'Личные расходы', 'Страховка'],
    itinerary: [
      {
        day: 1,
        title: 'Переезд и прогулка',
        description: 'Выезд из Бишкека, заселение и закатная прогулка по набережной.',
        activities: ['Дорога', 'Заселение', 'Набережная']
      },
      {
        day: 2,
        title: 'Горные виды',
        description: 'Легкий выезд на смотровые точки и возвращение.',
        activities: ['Смотровые площадки', 'Кофе-стоп', 'Обратный путь']
      }
    ],
    guide: guides[0],
    rating: 4.7,
    reviewCount: 54,
    isHot: true,
    tags: ['hot', 'иссык-куль', 'панорамы']
  },
  {
    id: 'tour-ala-archa-day',
    title: 'Ала-Арча: однодневный трек',
    slug: 'ala-archa-odnodnevnyy-trek',
    category: 'weekend',
    description:
      'Короткий и динамичный выезд из Бишкека в национальный парк Ала-Арча: свежий воздух, ущелье, водопады и горная река в формате одного дня.',
    shortDescription:
      'Однодневный трек в Ала-Арчу для тех, кто хочет быстро уйти в горы без длинной подготовки.',
    price: 2500,
    currency: 'KGS',
    duration: '1 день',
    difficulty: 'medium',
    groupSize: { min: 2, max: 18 },
    startDate: '2026-05-30',
    endDate: '2026-05-30',
    location: 'Ала-Арча, Чуй',
    coordinates: { lat: 42.55, lng: 74.48 },
    images: imageSet('ala-archa-day'),
    highlights: ['Нацпарк рядом с Бишкеком', 'Маршрут за один день', 'Подходит новичкам', 'Горная река и лес'],
    includes: ['Трансфер', 'Гид', 'Перекус', 'Вход в парк'],
    excludes: ['Полноценный обед', 'Личные расходы', 'Трекинговые палки'],
    itinerary: [
      {
        day: 1,
        title: 'Трек в Ала-Арче',
        description: 'Ранний выезд, маршрут по ущелью, пикник и возвращение в Бишкек к вечеру.',
        activities: ['Сбор группы', 'Трек', 'Пикник', 'Возвращение']
      }
    ],
    guide: guides[1],
    rating: 4.8,
    reviewCount: 142,
    isHot: false,
    tags: ['бишкек', 'один день', 'трек']
  },
  {
    id: 'tour-osh-city',
    title: 'Ош — древний город',
    slug: 'osh-drevniy-gorod',
    category: 'kyrgyzstan',
    description:
      'Городской маршрут по южной столице: базар, Сулайман-Тоо, ремесленные кварталы и гастрономия Оша с сильным историческим контекстом.',
    shortDescription:
      'Короткий, но насыщенный городской тур по древнему Ошу с историей, кухней и главными символами города.',
    price: 25000,
    currency: 'KGS',
    duration: '3 дня / 2 ночи',
    difficulty: 'easy',
    groupSize: { min: 2, max: 15 },
    startDate: '2026-09-05',
    endDate: '2026-09-07',
    location: 'Ош',
    coordinates: { lat: 40.5283, lng: 72.7985 },
    images: imageSet('osh-city'),
    highlights: ['Сулайман-Тоо', 'Ошский базар', 'Южная кухня', 'Исторический центр'],
    includes: ['Проживание', 'Экскурсии', 'Трансфер из аэропорта', 'Завтраки'],
    excludes: ['Перелет до Оша', 'Личные расходы', 'Часть питания'],
    itinerary: [
      {
        day: 1,
        title: 'Исторический центр',
        description: 'Заселение и прогулка по центру с вводной экскурсией.',
        activities: ['Встреча', 'Исторический центр', 'Ужин']
      },
      {
        day: 2,
        title: 'Сулайман-Тоо и базар',
        description: 'Главная культурная точка города и гастрономический маршрут по рынку.',
        activities: ['Сулайман-Тоо', 'Базар', 'Дегустации']
      },
      {
        day: 3,
        title: 'Ремесленные кварталы',
        description: 'Финальная прогулка по мастерским и завершение программы.',
        activities: ['Мастерские', 'Свободное время', 'Финал']
      }
    ],
    guide: guides[3],
    rating: 4.7,
    reviewCount: 49,
    isHot: false,
    tags: ['ош', 'город', 'история']
  },
  {
    id: 'tour-song-kul',
    title: 'Сон-Куль: ночь у кочевников',
    slug: 'son-kul-noch-u-kochevnikov',
    category: 'kyrgyzstan',
    description:
      'Высокогорное озеро, лошади на пастбищах, юрты и звездное небо без городского света. Тур для тех, кто хочет почувствовать простор страны.',
    shortDescription:
      'Путешествие на Сон-Куль с ночевкой в юртовом лагере, конными прогулками и видом на бескрайние пастбища.',
    price: 18000,
    currency: 'KGS',
    duration: '3 дня / 2 ночи',
    difficulty: 'easy',
    groupSize: { min: 2, max: 10 },
    startDate: '2026-08-01',
    endDate: '2026-08-03',
    location: 'Сон-Куль, Нарын',
    coordinates: { lat: 41.85, lng: 75.14 },
    images: imageSet('song-kul-yurt'),
    highlights: ['Юртовый лагерь', 'Звездное небо', 'Конные прогулки', 'Высокогорные пастбища'],
    includes: ['Трансфер', 'Проживание', 'Питание', 'Гид-сопровождение'],
    excludes: ['Личные покупки', 'Страховка', 'Индивидуальные активности'],
    itinerary: [
      {
        day: 1,
        title: 'Путь к озеру',
        description: 'Переезд из Бишкека или Нарына, заселение и знакомство с лагерем.',
        activities: ['Трансфер', 'Юртовый лагерь', 'Ужин']
      },
      {
        day: 2,
        title: 'День на пастбищах',
        description: 'Свободный день с конными прогулками и съемкой на рассвете или закате.',
        activities: ['Конная прогулка', 'Пикник', 'Вечер у костра']
      },
      {
        day: 3,
        title: 'Возвращение',
        description: 'Спуск с плато и завершение тура.',
        activities: ['Завтрак', 'Сборы', 'Возвращение']
      }
    ],
    guide: guides[4],
    rating: 4.9,
    reviewCount: 96,
    isHot: false,
    tags: ['озеро', 'юрты', 'кыргызстан']
  },
  {
    id: 'tour-boom-hot',
    title: 'Горящий: Боомское ущелье',
    slug: 'goryashchiy-boomskoe-ushchele',
    category: 'burning',
    description:
      'Быстрый и бюджетный выезд через Боомское ущелье: скальные виды, река Чу и короткие прогулки по одному из самых узнаваемых транзитных участков страны.',
    shortDescription:
      'Недорогой горящий однодневный маршрут по Боомскому ущелью с панорамами и фотостопами.',
    price: 3500,
    currency: 'KGS',
    duration: '1 день',
    difficulty: 'easy',
    groupSize: { min: 2, max: 18 },
    startDate: '2026-05-24',
    endDate: '2026-05-24',
    location: 'Боомское ущелье',
    coordinates: { lat: 42.1, lng: 75.9 },
    images: imageSet('boom-gorge'),
    highlights: ['Бюджетный формат', 'Фотостопы в ущелье', 'Быстрый выезд из Бишкека', 'Подходит новичкам'],
    includes: ['Трансфер', 'Сопровождение', 'Перекус'],
    excludes: ['Полный обед', 'Личные расходы', 'Страховка'],
    itinerary: [
      {
        day: 1,
        title: 'Однодневный выезд',
        description: 'Поездка по ущелью с остановками на видовых точках и финальным чаепитием.',
        activities: ['Сбор группы', 'Дорога', 'Фотостопы', 'Возвращение']
      }
    ],
    guide: guides[0],
    rating: 4.5,
    reviewCount: 39,
    isHot: true,
    tags: ['горящий', 'ущелье', 'один день']
  },
  {
    id: 'tour-naryn-tash-rabat',
    title: 'Нарын + крепость Таш-Рабат',
    slug: 'naryn-krepost-tash-rabat',
    category: 'kyrgyzstan',
    description:
      'Путешествие в сердце Кыргызстана: горный Нарын, дороги через перевалы и одна из самых атмосферных исторических локаций страны — Таш-Рабат.',
    shortDescription:
      'Трехдневный маршрут в Нарын и Таш-Рабат с акцентом на природу, историю и спокойный темп поездки.',
    price: 22000,
    currency: 'KGS',
    duration: '3 дня / 2 ночи',
    difficulty: 'medium',
    groupSize: { min: 2, max: 10 },
    startDate: '2026-09-18',
    endDate: '2026-09-20',
    location: 'Нарын, Таш-Рабат',
    coordinates: { lat: 40.83, lng: 75.24 },
    images: imageSet('naryn-tash-rabat'),
    highlights: ['Таш-Рабат', 'Нарынские панорамы', 'История караванов', 'Юртовая ночь'],
    includes: ['Транспорт', 'Проживание', 'Гид', 'Часть питания'],
    excludes: ['Личные расходы', 'Страховка', 'Дополнительные активности'],
    itinerary: [
      {
        day: 1,
        title: 'Переезд в Нарын',
        description: 'Дорога из Бишкека с остановками на перевалах и вечер в Нарыне.',
        activities: ['Трансфер', 'Фото-стопы', 'Нарын']
      },
      {
        day: 2,
        title: 'Таш-Рабат',
        description: 'Экскурсия к караван-сараю и прогулка по долине.',
        activities: ['Историческая экскурсия', 'Долина', 'Юртовый лагерь']
      },
      {
        day: 3,
        title: 'Возвращение',
        description: 'Спокойное утро и обратный путь в Бишкек.',
        activities: ['Завтрак', 'Возвращение', 'Финал тура']
      }
    ],
    guide: guides[3],
    rating: 4.8,
    reviewCount: 67,
    isHot: false,
    tags: ['нарын', 'таш-рабат', 'история']
  }
];

export const mapPoints: MapPointRecord[] = [
  {
    id: 'point-bishkek',
    name: 'Бишкек',
    type: 'region',
    coordinates: { lat: 42.8746, lng: 74.5698 },
    description: 'Стартовая точка многих маршрутов, городской хаб и вход в горные выезды по северу страны.',
    image: 'https://picsum.photos/seed/bishkek-city/800/600',
    rating: 4.7,
    region: 'Bishkek'
  },
  {
    id: 'point-issyk-kul',
    name: 'Иссык-Куль',
    type: 'region',
    coordinates: { lat: 42.45, lng: 77 },
    description: 'Главное озеро Кыргызстана и ключевая зона weekend-туров, пляжного и семейного отдыха.',
    image: 'https://picsum.photos/seed/lake-kyrgyz/800/600',
    rating: 4.9,
    region: 'Issyk-Kul'
  },
  {
    id: 'point-ala-archa',
    name: 'Ала-Арча',
    type: 'tour',
    coordinates: { lat: 42.55, lng: 74.48 },
    description: 'Национальный парк рядом с Бишкеком, идеален для коротких треков и однодневных выездов.',
    tourId: 'tour-ala-archa-day',
    image: 'https://picsum.photos/seed/ala-archa-map/800/600',
    rating: 4.8,
    region: 'Chuy'
  },
  {
    id: 'point-altyn-arashan',
    name: 'Алтын-Арашан',
    type: 'tour',
    coordinates: { lat: 42.65, lng: 78.4 },
    description: 'Легендарная долина с горячими источниками и треккинговой атмосферой рядом с Караколом.',
    tourId: 'tour-altyn-arashan-weekend',
    image: 'https://picsum.photos/seed/altyn-map/800/600',
    rating: 4.8,
    region: 'Issyk-Kul'
  },
  {
    id: 'point-karakol',
    name: 'Каракол',
    type: 'region',
    coordinates: { lat: 42.49, lng: 78.39 },
    description: 'Город-гейтвей к восточному Иссык-Кулю, треккингу и альпийским долинам.',
    image: 'https://picsum.photos/seed/karakol/800/600',
    rating: 4.7,
    region: 'Issyk-Kul'
  },
  {
    id: 'point-song-kul',
    name: 'Сон-Куль',
    type: 'tour',
    coordinates: { lat: 41.85, lng: 75.14 },
    description: 'Высокогорное озеро и юртовые лагеря для тех, кто хочет увидеть кочевой Кыргызстан.',
    tourId: 'tour-song-kul',
    image: 'https://picsum.photos/seed/song-kul-map/800/600',
    rating: 4.9,
    region: 'Naryn'
  },
  {
    id: 'point-osh',
    name: 'Ош',
    type: 'region',
    coordinates: { lat: 40.5283, lng: 72.7985 },
    description: 'Древний город юга с сильной историей, рынками и доступом к памирским маршрутам.',
    image: 'https://picsum.photos/seed/osh/800/600',
    rating: 4.8,
    region: 'Osh'
  },
  {
    id: 'point-tash-rabat',
    name: 'Таш-Рабат',
    type: 'tour',
    coordinates: { lat: 40.83, lng: 75.24 },
    description: 'Средневековый караван-сарай в высокогорной долине, один из символов Шелкового пути.',
    tourId: 'tour-naryn-tash-rabat',
    image: 'https://picsum.photos/seed/tash-rabat/800/600',
    rating: 4.9,
    region: 'Naryn'
  },
  {
    id: 'point-naryn',
    name: 'Нарын',
    type: 'region',
    coordinates: { lat: 41.4286, lng: 75.9908 },
    description: 'Горный центр страны, связующий узел маршрутов к Сон-Кулю и Таш-Рабату.',
    image: 'https://picsum.photos/seed/naryn/800/600',
    rating: 4.6,
    region: 'Naryn'
  },
  {
    id: 'point-toktogul',
    name: 'Токтогул',
    type: 'attraction',
    coordinates: { lat: 41.87, lng: 72.94 },
    description: 'Юго-западный водохранилищный ландшафт и важная точка маршрутов в сторону Джалал-Абада.',
    image: 'https://picsum.photos/seed/toktogul/800/600',
    rating: 4.4,
    region: 'Jalal-Abad'
  },
  {
    id: 'point-cholpon-ata',
    name: 'Чолпон-Ата',
    type: 'tour',
    coordinates: { lat: 42.65, lng: 77.08 },
    description: 'Курортный город на северном берегу Иссык-Куля с быстрыми weekend-маршрутами.',
    tourId: 'tour-cholpon-ata-hot',
    image: 'https://picsum.photos/seed/cholpon-ata/800/600',
    rating: 4.7,
    region: 'Issyk-Kul'
  },
  {
    id: 'point-skazka',
    name: 'Каньон Сказка',
    type: 'tour',
    coordinates: { lat: 42.27, lng: 77.55 },
    description: 'Красные скалы и фантастические формы рельефа на южном берегу Иссык-Куля.',
    tourId: 'tour-skazka-barskoon',
    image: 'https://picsum.photos/seed/skazka-map/800/600',
    rating: 4.8,
    region: 'Issyk-Kul'
  },
  {
    id: 'point-barskaun',
    name: 'Барскоон',
    type: 'attraction',
    coordinates: { lat: 42.12, lng: 77.6 },
    description: 'Ущелье с каскадом водопадов и прохладным хвойным микроклиматом.',
    image: 'https://picsum.photos/seed/barskaun-map/800/600',
    rating: 4.7,
    region: 'Issyk-Kul'
  },
  {
    id: 'point-jeti-oguz',
    name: 'Жети-Огуз',
    type: 'attraction',
    coordinates: { lat: 42.38, lng: 78.23 },
    description: 'Красные скалы и зеленая долина, одна из самых узнаваемых природных открыток Кыргызстана.',
    image: 'https://picsum.photos/seed/jeti-oguz/800/600',
    rating: 4.8,
    region: 'Issyk-Kul'
  },
  {
    id: 'point-lenin-peak',
    name: 'Базовый лагерь пика Ленина',
    type: 'tour',
    coordinates: { lat: 39.79, lng: 72.87 },
    description: 'Высотный регион юга страны и входная точка в одну из самых известных экспедиционных зон Центральной Азии.',
    tourId: 'tour-lenin-peak',
    image: 'https://picsum.photos/seed/lenin-map/800/600',
    rating: 4.9,
    region: 'Batken'
  }
];

export const contentItems: ContentItem[] = [
  {
    id: 'content-1',
    type: 'video',
    title: 'LAKE ISSYK-KUL, KYRGYZSTAN (русские субтитры)',
    description: 'Реальное YouTube-видео про Иссык-Куль: атмосфера озера, дорога и взгляд путешественника на регион.',
    thumbnail: 'https://i.ytimg.com/vi/B-BqTsZnzqY/hqdefault.jpg',
    author: 'Peter Santenello',
    date: '2026-04-05',
    views: 131712,
    linkedTourId: 'tour-issyk-hot-weekend',
    tags: ['video', 'issyk-kul', 'weekend'],
    youtubeId: 'B-BqTsZnzqY',
    externalUrl: 'https://www.youtube.com/watch?v=B-BqTsZnzqY'
  },
  {
    id: 'content-2',
    type: 'blog',
    title: 'Алтын-Арашан без перегруза: что взять в короткий трек',
    description: 'Разбираем экипировку и темп для маршрута, который часто недооценивают новички.',
    thumbnail: 'https://picsum.photos/seed/content-altyn-blog/800/600',
    author: 'Элина Джумабек',
    date: '2026-03-18',
    readTime: '6 мин',
    views: 6340,
    linkedTourId: 'tour-altyn-arashan-weekend',
    tags: ['blog', 'trekking', 'packing']
  },
  {
    id: 'content-3',
    type: 'ai-route',
    title: 'AI-маршрут: 3 дня в горах с детьми и бюджетом до 15 000 сом',
    description: 'Сценарий семейного маршрута с мягким треком, теплыми ночевками и разумной логистикой.',
    thumbnail: 'https://picsum.photos/seed/content-ai-family/800/600',
    author: 'AI Planner',
    date: '2026-04-10',
    views: 9120,
    linkedTourId: 'tour-altyn-arashan-weekend',
    tags: ['ai', 'family', 'budget']
  },
  {
    id: 'content-4',
    type: 'video',
    title: 'Staying in a yurt in Kyrgyzstan! (SON KUL LAKE KYRGYZSTAN)',
    description: 'Реальное YouTube-видео о ночевке в юрте на Сон-Куле и атмосфере высокогорного лагеря.',
    thumbnail: 'https://i.ytimg.com/vi/dUFNQCJngRk/hqdefault.jpg',
    author: 'Tales of Odyssey',
    date: '2026-02-26',
    views: 5738,
    linkedTourId: 'tour-song-kul',
    tags: ['video', 'song-kul', 'nomads'],
    youtubeId: 'dUFNQCJngRk',
    externalUrl: 'https://www.youtube.com/watch?v=dUFNQCJngRk'
  },
  {
    id: 'content-5',
    type: 'blog',
    title: 'Ош за три дня: неочевидные места beyond Сулайман-Тоо',
    description: 'Куда идти после базовых достопримечательностей и как читать город через рынки, чайханы и кварталы.',
    thumbnail: 'https://picsum.photos/seed/content-osh-blog/800/600',
    author: 'Нурлан Абдраимов',
    date: '2026-01-16',
    readTime: '8 мин',
    views: 5240,
    linkedTourId: 'tour-osh-city',
    tags: ['blog', 'osh', 'culture']
  },
  {
    id: 'content-6',
    type: 'ai-route',
    title: 'AI-маршрут: экспедиционный юг для опытных треккеров',
    description: 'Готовый сценарий акклиматизации, темпа и снаряжения для маршрутов в сторону Памира.',
    thumbnail: 'https://picsum.photos/seed/content-ai-expedition/800/600',
    author: 'AI Planner',
    date: '2026-04-01',
    views: 7310,
    linkedTourId: 'tour-lenin-peak',
    tags: ['ai', 'expedition', 'hard']
  },
  {
    id: 'content-7',
    type: 'video',
    title: 'TASH RABAT / Kyrgyzstan: 11-days trip',
    description: 'Реальное YouTube-видео с поездкой к Таш-Рабату и настроением маршрута в духе Шёлкового пути.',
    thumbnail: 'https://i.ytimg.com/vi/cVKRDXgQsp0/hqdefault.jpg',
    author: 'Journey Beyond the Horizon',
    date: '2026-03-04',
    views: 1122,
    linkedTourId: 'tour-silk-road',
    tags: ['video', 'silk-road', 'history'],
    youtubeId: 'cVKRDXgQsp0',
    externalUrl: 'https://www.youtube.com/watch?v=cVKRDXgQsp0'
  },
  {
    id: 'content-8',
    type: 'blog',
    title: 'Почему каньон Сказка лучше смотреть вечером',
    description: 'Свет, цвет рельефа и тайминг поездки: объясняем, когда каньон раскрывается лучше всего.',
    thumbnail: 'https://picsum.photos/seed/content-skazka-blog/800/600',
    author: 'Элина Джумабек',
    date: '2026-04-13',
    readTime: '5 мин',
    views: 4475,
    linkedTourId: 'tour-skazka-barskoon',
    tags: ['blog', 'canyon', 'photo']
  }
];
