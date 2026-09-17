export interface StorySlide {
  id: string;
  image: string;
  date: string;
  title: string;
  description: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
}

export interface WeddingRequestItem {
  id: string;
  title: string;
  detail: string;
  iconName: 'shirt' | 'flower' | 'baby' | 'gift';
}

export interface GuestWish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  likes: number;
}

export interface RSVPRecord {
  id: string;
  name: string;
  attending: boolean;
  guestCount: number;
  phone?: string;
  note?: string;
  createdAt: string;
}
