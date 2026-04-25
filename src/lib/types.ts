export interface Tour {
  id: string;
  title: string;
  slug: string;
  category: 'burning' | 'weekend' | 'kyrgyzstan' | 'trekking' | 'cultural';
  description: string;
  shortDescription: string;
  price: number;
  currency: 'KGS' | 'USD';
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  groupSize: { min: number; max: number };
  startDate: string;
  endDate: string;
  location: string;
  coordinates: { lat: number; lng: number };
  images: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: ItineraryDay[];
  guide: Guide;
  rating: number;
  reviewCount: number;
  isHot: boolean;
  tags: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Guide {
  id: string;
  name: string;
  photo: string;
  rating: number;
  certified: boolean;
  languages: string[];
  bio: string;
  toursCount: number;
}

export interface ContentItem {
  id: string;
  type: 'video' | 'blog' | 'ai-route';
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  date: string;
  readTime?: string;
  views: number;
  linkedTourId?: string;
  tags: string[];
  youtubeId?: string;
  externalUrl?: string;
}

export interface MapPoint {
  id: string;
  name: string;
  type: 'tour' | 'attraction' | 'region';
  coordinates: { lat: number; lng: number };
  description: string;
  tourId?: string;
  image: string;
  rating?: number;
}

export type MapRegion =
  | 'Bishkek'
  | 'Issyk-Kul'
  | 'Osh'
  | 'Naryn'
  | 'Batken'
  | 'Talas'
  | 'Jalal-Abad'
  | 'Chuy';

export interface MapPointRecord extends MapPoint {
  region: MapRegion;
}

export type TourSort = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export type DurationFilter = '1-day' | '2-3-days' | '4-7-days' | '7-plus';

export interface TourFilterState {
  category: Tour['category'][];
  priceMin: number;
  priceMax: number;
  duration: DurationFilter[];
  difficulty: Tour['difficulty'][];
  groupSize: string;
  rating: '' | '4' | '4.5';
  sort: TourSort;
  page: number;
  query: string;
  date: string;
  people: number | null;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'traveler' | 'partner';
  createdAt: string;
}

export interface AuthStoredUser extends AuthUser {
  password: string;
}

export interface BookingRecord {
  id: string;
  tourId: string;
  tourTitle: string;
  travelDate: string;
  people: number;
  total: number;
  currency: Tour['currency'];
  bookedAt: string;
  userEmail: string;
  status: 'confirmed';
}

export interface AIRecommendationRequest {
  prompt: string;
  budget?: number | null;
  days?: number | null;
  people?: number | null;
  difficulty?: Tour['difficulty'] | '';
  category?: Tour['category'] | '';
}

export interface ResolvedAIPreferences {
  prompt: string;
  budget: number | null;
  days: number | null;
  people: number | null;
  difficulty: Tour['difficulty'] | null;
  category: Tour['category'] | null;
  keywords: string[];
}

export interface AIRecommendation {
  tourId: string;
  slug: string;
  title: string;
  price: number;
  currency: Tour['currency'];
  duration: string;
  location: string;
  image: string;
  shortDescription: string;
  reason: string;
  score: number;
}

export interface AIRecommendationResponse {
  summary: string;
  recommendations: AIRecommendation[];
  preferences: ResolvedAIPreferences;
  source: 'ollama' | 'fallback';
}
