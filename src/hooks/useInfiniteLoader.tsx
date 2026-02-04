"use client";
import { useCallback } from "react";

type LoadMoreFn = (page: number, size: number) => void;

export const useInfiniteLoader = (
  loadMore: LoadMoreFn,
  page: number,
  size: number
) => {
  return useCallback(() => {
    loadMore(page + 1, size);
  }, [loadMore, page, size]);
};
