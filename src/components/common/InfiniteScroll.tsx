import { useEffect, useRef } from "react";

type InfiniteScrollProps<T> = {
  children: React.ReactNode;
  list: T[];
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => Promise<any>;
  loader?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  rootMargin?: string;
  className?: string;
  useWindowScroll?: boolean;
};

const InfiniteScroll = <T,>({
  children,
  list,
  hasMore,
  loading,
  onLoadMore,
  loader,
  emptyMessage,
  rootMargin = "100px 0px",
  className,
  useWindowScroll = true,
}: InfiniteScrollProps<T>) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!sentinelRef.current) return;
    if (!hasMore || loading || isFetchingRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        observer.disconnect();
        onLoadMore().finally(() => {
          isFetchingRef.current = false;
        });
      },
      {
        root: useWindowScroll ? null : containerRef.current,
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore, rootMargin, useWindowScroll]);

  return (
    <div ref={containerRef} className={className}>
      {children}

      {loading && loader}

      {!loading && list.length === 0 && emptyMessage}

      {hasMore && <div ref={sentinelRef} className="h-1 w-full" />}
    </div>
  );
};

export default InfiniteScroll;
