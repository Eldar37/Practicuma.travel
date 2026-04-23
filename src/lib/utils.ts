import type {
  ContentItem,
  DurationFilter,
  MapPointRecord,
  Tour,
  TourFilterState,
  TourSort
} from '@/lib/types';

export const tourCategoryLabels: Record<Tour['category'], string> = {
  burning: 'Горящие',
  weekend: 'Выходные',
  kyrgyzstan: 'Кыргызстан',
  trekking: 'Треккинг',
  cultural: 'Культурные'
};

export const difficultyLabels: Record<Tour['difficulty'], string> = {
  easy: 'Легкий',
  medium: 'Средний',
  hard: 'Сложный'
};

export const durationLabels: Record<DurationFilter, string> = {
  '1-day': '1 день',
  '2-3-days': '2-3 дня',
  '4-7-days': '4-7 дней',
  '7-plus': '7+ дней'
};

export const sortLabels: Record<TourSort, string> = {
  popular: 'По популярности',
  'price-asc': 'Сначала дешевле',
  'price-desc': 'Сначала дороже',
  rating: 'По рейтингу'
};

export const mapTypeLabels: Record<MapPointRecord['type'], string> = {
  attraction: 'Достопримечательность',
  region: 'Регион',
  tour: 'Тур'
};

export const groupSizeOptions = [
  { value: '', label: 'Любая группа' },
  { value: '1-4', label: '1-4 человека' },
  { value: '5-8', label: '5-8 человек' },
  { value: '9-12', label: '9-12 человек' },
  { value: '13+', label: '13+ человек' }
] as const;

export const mapRegions = [
  'Bishkek',
  'Issyk-Kul',
  'Osh',
  'Naryn',
  'Batken',
  'Talas',
  'Jalal-Abad',
  'Chuy'
] as const;

export const regionLabels: Record<(typeof mapRegions)[number], string> = {
  Bishkek: 'Bishkek',
  'Issyk-Kul': 'Issyk-Kul',
  Osh: 'Osh',
  Naryn: 'Naryn',
  Batken: 'Batken',
  Talas: 'Talas',
  'Jalal-Abad': 'Jalal-Abad',
  Chuy: 'Chuy'
};

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

export const formatCurrency = (amount: number, currency: Tour['currency']) => {
  if (currency === 'USD') {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  }

  return `${new Intl.NumberFormat('ru-RU').format(amount)} сом`;
};

export const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat('ru-RU', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

export const formatReadableDate = (date: string) =>
  new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date));

export const formatDateRange = (startDate: string, endDate: string) =>
  `${formatReadableDate(startDate)} - ${formatReadableDate(endDate)}`;

const extractDurationDays = (duration: string) => {
  const match = duration.match(/(\d+)/);
  return match ? Number(match[1]) : 1;
};

export const getDurationBucket = (duration: string): DurationFilter => {
  const days = extractDurationDays(duration);

  if (days <= 1) {
    return '1-day';
  }

  if (days <= 3) {
    return '2-3-days';
  }

  if (days <= 7) {
    return '4-7-days';
  }

  return '7-plus';
};

export const getDefaultTourFilters = (): TourFilterState => ({
  category: [],
  priceMin: 0,
  priceMax: 100000,
  duration: [],
  difficulty: [],
  groupSize: '',
  rating: '',
  sort: 'popular',
  page: 1,
  query: '',
  date: '',
  people: null
});

export const parseArrayParam = (value?: string | string[]) => {
  if (!value) {
    return [];
  }

  const joined = Array.isArray(value) ? value.join(',') : value;
  return joined
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const parseTourSearchParams = (params: Record<string, string | string[] | undefined>): TourFilterState => {
  const defaults = getDefaultTourFilters();
  const priceMin = Number(params.priceMin ?? defaults.priceMin);
  const priceMax = Number(params.priceMax ?? defaults.priceMax);
  const page = Number(params.page ?? defaults.page);
  const ratingValue = params.rating;
  const rating = Array.isArray(ratingValue) ? ratingValue[0] : ratingValue;
  const sortValue = params.sort;
  const sort = Array.isArray(sortValue) ? sortValue[0] : sortValue;
  const groupSizeValue = params.groupSize;
  const groupSize = Array.isArray(groupSizeValue) ? groupSizeValue[0] : groupSizeValue;
  const queryValue = params.q;
  const query = Array.isArray(queryValue) ? queryValue[0] : queryValue;
  const dateValue = params.date;
  const date = Array.isArray(dateValue) ? dateValue[0] : dateValue;
  const peopleValue = params.people;
  const people = Number(Array.isArray(peopleValue) ? peopleValue[0] : peopleValue);

  return {
    category: parseArrayParam(params.category).filter((value): value is Tour['category'] =>
      ['burning', 'weekend', 'kyrgyzstan', 'trekking', 'cultural'].includes(value)
    ),
    priceMin: Number.isFinite(priceMin) ? priceMin : defaults.priceMin,
    priceMax: Number.isFinite(priceMax) ? priceMax : defaults.priceMax,
    duration: parseArrayParam(params.duration).filter((value): value is DurationFilter =>
      ['1-day', '2-3-days', '4-7-days', '7-plus'].includes(value)
    ),
    difficulty: parseArrayParam(params.difficulty).filter((value): value is Tour['difficulty'] =>
      ['easy', 'medium', 'hard'].includes(value)
    ),
    groupSize: groupSize ?? defaults.groupSize,
    rating: rating === '4' || rating === '4.5' ? rating : '',
    sort: sort === 'price-asc' || sort === 'price-desc' || sort === 'rating' ? sort : defaults.sort,
    page: Number.isFinite(page) && page > 0 ? page : defaults.page,
    query: query?.trim() ?? defaults.query,
    date: date?.trim() ?? defaults.date,
    people: Number.isFinite(people) && people > 0 ? people : defaults.people
  };
};

export const buildTourQueryString = (filters: TourFilterState) => {
  const params = new URLSearchParams();

  if (filters.category.length) {
    params.set('category', filters.category.join(','));
  }

  if (filters.priceMin > 0) {
    params.set('priceMin', String(filters.priceMin));
  }

  if (filters.priceMax < 100000) {
    params.set('priceMax', String(filters.priceMax));
  }

  if (filters.duration.length) {
    params.set('duration', filters.duration.join(','));
  }

  if (filters.difficulty.length) {
    params.set('difficulty', filters.difficulty.join(','));
  }

  if (filters.groupSize) {
    params.set('groupSize', filters.groupSize);
  }

  if (filters.rating) {
    params.set('rating', filters.rating);
  }

  if (filters.query) {
    params.set('q', filters.query);
  }

  if (filters.date) {
    params.set('date', filters.date);
  }

  if (filters.people) {
    params.set('people', String(filters.people));
  }

  if (filters.sort !== 'popular') {
    params.set('sort', filters.sort);
  }

  if (filters.page > 1) {
    params.set('page', String(filters.page));
  }

  return params.toString();
};

export const filterTours = (items: Tour[], filters: TourFilterState) =>
  items.filter((tour) => {
    if (filters.query) {
      const haystack = `${tour.title} ${tour.location} ${tour.shortDescription} ${tour.tags.join(' ')}`.toLowerCase();
      if (!haystack.includes(filters.query.toLowerCase())) {
        return false;
      }
    }

    if (filters.category.length && !filters.category.includes(tour.category)) {
      return false;
    }

    if (tour.price < filters.priceMin || tour.price > filters.priceMax) {
      return false;
    }

    if (filters.duration.length && !filters.duration.includes(getDurationBucket(tour.duration))) {
      return false;
    }

    if (filters.difficulty.length && !filters.difficulty.includes(tour.difficulty)) {
      return false;
    }

    if (filters.groupSize) {
      if (filters.groupSize === '1-4' && tour.groupSize.max > 4) {
        return false;
      }

      if (filters.groupSize === '5-8' && (tour.groupSize.max < 5 || tour.groupSize.min > 8)) {
        return false;
      }

      if (filters.groupSize === '9-12' && (tour.groupSize.max < 9 || tour.groupSize.min > 12)) {
        return false;
      }

      if (filters.groupSize === '13+' && tour.groupSize.max < 13) {
        return false;
      }
    }

    if (filters.rating && tour.rating < Number(filters.rating)) {
      return false;
    }

    if (filters.people && (tour.groupSize.min > filters.people || tour.groupSize.max < filters.people)) {
      return false;
    }

    if (filters.date) {
      const selectedDate = new Date(filters.date);
      const startDate = new Date(tour.startDate);
      const endDate = new Date(tour.endDate);

      if (selectedDate < startDate || selectedDate > endDate) {
        return false;
      }
    }

    return true;
  });

export const sortTours = (items: Tour[], sort: TourSort) => {
  const cloned = [...items];

  if (sort === 'price-asc') {
    return cloned.sort((a, b) => a.price - b.price);
  }

  if (sort === 'price-desc') {
    return cloned.sort((a, b) => b.price - a.price);
  }

  if (sort === 'rating') {
    return cloned.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }

  return cloned.sort((a, b) => {
    const hotScore = Number(b.isHot) - Number(a.isHot);
    if (hotScore !== 0) {
      return hotScore;
    }

    return b.reviewCount - a.reviewCount;
  });
};

export const paginate = <T,>(items: T[], page: number, perPage: number) => {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
};

export const getCategoryCounts = (items: Tour[]) =>
  items.reduce<Record<Tour['category'], number>>(
    (acc, item) => {
      acc[item.category] += 1;
      return acc;
    },
    {
      burning: 0,
      weekend: 0,
      kyrgyzstan: 0,
      trekking: 0,
      cultural: 0
    }
  );

export const getTourBySlug = (items: Tour[], slug: string) => items.find((tour) => tour.slug === slug);

export const getTourById = (items: Tour[], id: string) => items.find((tour) => tour.id === id);

export const getRelatedContent = (items: ContentItem[], tourId: string) =>
  items.filter((item) => item.linkedTourId === tourId);

export const buildStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  return Array.from({ length: 5 }, (_, index) => index < fullStars);
};

export const getFeaturedToursByCategory = (items: Tour[], category: Tour['category']) =>
  items.filter((tour) => tour.category === category).slice(0, 3);

export const getFeaturedMapPoints = (items: MapPointRecord[]) => items.slice(0, 6);

export const getFeaturedContent = (items: ContentItem[]) => items.slice(0, 6);
