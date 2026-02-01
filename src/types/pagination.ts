export type PaginatedState<T> = {
  items: T[];
  loading: boolean;
  error: string | null;
  page: number;
  size: number;
  total: number;
  hasMore: boolean;
};

export const createInitialPaginatedState = <T>(
  size = 10
): PaginatedState<T> => ({
  items: [],
  loading: false,
  error: null,
  page: 0,
  size,
  total: 0,
  hasMore: true,
});
