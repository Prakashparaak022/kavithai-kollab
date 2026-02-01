"use client";
import { useRef } from "react";

type InfiniteScrollProps<T = unknown> = {
  className: string;
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => Promise<unknown>;
  rootMargin?: number;
  children: React.ReactNode;
  list: T[];
  loader?: React.ReactNode;
  emptyMessage?: React.ReactNode;
};

const InfiniteScroll = ({
  className,
  loading,
  hasMore,
  onLoadMore,
  rootMargin = 40,
  children,
  list,
  loader,
  emptyMessage,
}: InfiniteScrollProps) => {
  const isFetchingRef = useRef(false);

  const loadMore = () => {
    if (loading || !hasMore || isFetchingRef.current) return;

    isFetchingRef.current = true;

    onLoadMore().finally(() => {
      isFetchingRef.current = false;
    });
  };

  return (
    <div
      className={className}
      onScroll={(e) => {
        const t = e.currentTarget;
        if (t.scrollTop + t.clientHeight >= t.scrollHeight - rootMargin) {
          loadMore();
        }
      }}>
      {children}

      {loading && loader}

      {!loading && list.length === 0 && emptyMessage}
    </div>
  );
};

export default InfiniteScroll;
