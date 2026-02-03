export type PaginatedState<T, ExtraProps = {}> = {
  items: T[];
  loading: boolean;
  error: string | null;
  page: number;
  size: number;
  total: number;
  hasMore: boolean;
} & ExtraProps;

export const createPaginatedState = <T, ExtraProps = {}>(
  size = 10,
  extraProps: ExtraProps = {} as ExtraProps
): PaginatedState<T, ExtraProps> => ({
  items: [],
  loading: true,
  error: null,
  page: 0,
  size,
  total: 0,
  hasMore: true,
  ...extraProps,
});

export type PaginationProps<T = {}> = {
  page?: number;
  size?: number;
} & T;
