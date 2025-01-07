import { Pagination } from './pagination';

export interface Capsule {
  id: string;
  title: string;
  content: string | null;
  image: string | null;
  releaseDate: string;
  status: 'PENDING' | 'RELEASED';
  remainingTime: number;
  shareAble: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface PaginatedCapsuleResponse {
  data: Capsule[];
  pagination: Pagination;
}
