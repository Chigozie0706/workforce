export type UserRole = "customer" | "worker" | null;

export interface Review {
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface Worker {
  id: number;
  name: string;
  skill: string;
  category: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
  avatar: string;
  coverImg: string;
  verified: boolean;
  jobs: number;
  bio: string;
  portfolio: string[];
  reviewsList: Review[];
  tags: string[];
}
