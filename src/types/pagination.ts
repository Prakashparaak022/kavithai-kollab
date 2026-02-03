export type PaginatedState<T> = {
  items: T[];
  loading: boolean;
  error: string | null;
  page: number;
  size: number;
  total: number;
  hasMore: boolean;
  activeKey?: string;
};

export const createPaginatedState = <T>(size = 10): PaginatedState<T> => ({
  items: [],
  loading: true,
  error: null,
  page: 0,
  size,
  total: 0,
  hasMore: true,
});

export type PaginationProps<T> = {
  page?: number;
  size?: number;
} & T;
