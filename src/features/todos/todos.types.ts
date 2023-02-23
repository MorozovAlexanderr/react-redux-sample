import { Category } from '../categories/categories.types';

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  category: Category;
  createdAt: string;
}

export interface TodoCreationForm {
  title: string;
  categoryId: string | null;
}

export interface TodoFilters {
  status: TodoStatusFilter;
  categoryId: string | null;
}

export enum TodosFetchStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export enum TodoStatusFilter {
  All = 'all',
  Completed = 'completed',
  Uncompleted = 'uncompleted',
}
